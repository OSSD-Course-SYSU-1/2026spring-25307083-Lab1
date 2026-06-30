import { distributedDataObject } from '@kit.ArkData';
import { common } from '@kit.AbilityKit';
import { BusinessError } from '@kit.BasicServicesKit';
import Logger from '../common/util/Logger';
import { TodoItem, TodoDataSource } from './TodoItem';

const TAG = 'DistributedTodoModel';

interface DeviceInfo {
  networkId: string;
  status: string;
}

/**
 * 分布式待办事项数据模型封装。
 * 负责分布式数据对象的创建、组网、同步监听、设备上下线处理和数据冲突解决。
 */
export class DistributedTodoModel {
  private dataObject: distributedDataObject.DataObject | null = null;
  private todoItems: Array<TodoItem> = [];
  private changeListeners: Array<(items: Array<TodoItem>) => void> = [];
  private statusListeners: Array<(networkId: string, status: string) => void> = [];
  private onlineDevices: Array<DeviceInfo> = [];

  /**
   * 初始化分布式数据对象并加入组网。
   */
  async init(context: common.Context, sessionId?: string): Promise<string> {
    if (this.dataObject) {
      Logger.info(TAG, 'DistributedTodoModel already initialized');
      return this.dataObject['sessionId'] as string;
    }

    const source = new TodoDataSource();
    if (sessionId) {
      source.sessionId = sessionId;
    }

    this.dataObject = distributedDataObject.create(context, source);

    // 注册数据变更监听
    this.dataObject.on('change', (changedSessionId: string, fields: Array<string>) => {
      Logger.info(TAG, `Data changed, sessionId: ${changedSessionId}, fields: ${JSON.stringify(fields)}`);
      this.handleDataChange();
    });

    // 注册设备状态监听
    this.dataObject.on('status', (statusSessionId: string, networkId: string, status: string) => {
      Logger.info(TAG, `Status changed: sessionId=${statusSessionId}, networkId=${networkId}, status=${status}`);
      this.handleStatusChange(networkId, status);
    });

    const finalSessionId = sessionId || distributedDataObject.genSessionId();
    await this.dataObject.setSessionId(finalSessionId);
    Logger.info(TAG, `Joined session: ${finalSessionId}`);

    if (!sessionId) {
      this.todoItems = [];
      this.writeItemsToDataObject();
    } else {
      this.loadFromDataObject();
    }

    return finalSessionId;
  }

  /**
   * 持久化当前数据到本地设备。
   */
  async saveLocal(): Promise<void> {
    if (!this.dataObject) {
      Logger.warn(TAG, 'DataObject not initialized, cannot save');
      return;
    }
    try {
      const result: distributedDataObject.SaveSuccessResponse = await this.dataObject.save('local');
      Logger.info(TAG, `Saved locally: sessionId=${result.sessionId}, version=${result.version}`);
    } catch (err) {
      const error = err as BusinessError;
      Logger.error(TAG, `Failed to save local: ${error.code} ${error.message}`);
    }
  }

  /**
   * 退出分布式组网。
   */
  async leaveSession(): Promise<void> {
    if (!this.dataObject) {
      return;
    }
    try {
      await this.dataObject.setSessionId('');
      Logger.info(TAG, 'Left all sessions');
    } catch (err) {
      const error = err as BusinessError;
      Logger.error(TAG, `Failed to leave session: ${error.code} ${error.message}`);
    }
  }

  /**
   * 销毁分布式数据对象。
   */
  destroy(): void {
    if (this.dataObject) {
      this.dataObject.off('change');
      this.dataObject.off('status');
      this.dataObject = null;
    }
    this.changeListeners = [];
    this.statusListeners = [];
    this.todoItems = [];
    Logger.info(TAG, 'DistributedTodoModel destroyed');
  }

  // ==================== CRUD ====================

  getItems(): Array<TodoItem> {
    const result: Array<TodoItem> = [];
    for (let i = 0; i < this.todoItems.length; i++) {
      result.push(this.todoItems[i]);
    }
    return result;
  }

  getPendingCount(): number {
    let count = 0;
    for (let i = 0; i < this.todoItems.length; i++) {
      if (!this.todoItems[i].completed) {
        count++;
      }
    }
    return count;
  }

  addItem(title: string): void {
    const trimmed = title.trim();
    if (trimmed.length === 0) {
      return;
    }
    const newItem = new TodoItem(trimmed);
    const newList: Array<TodoItem> = [newItem];
    for (let i = 0; i < this.todoItems.length; i++) {
      newList.push(this.todoItems[i]);
    }
    this.todoItems = newList;
    this.writeItemsToDataObject();
    Logger.info(TAG, `Added item: ${newItem.id}`);
  }

  toggleItem(id: string): void {
    const index = this.findIndex(id);
    if (index === -1) {
      return;
    }
    this.todoItems[index].completed = !this.todoItems[index].completed;
    this.todoItems[index].updateTime = Date.now();

    const toggled = this.todoItems[index];
    const remaining: Array<TodoItem> = [];
    for (let i = 0; i < this.todoItems.length; i++) {
      if (i !== index) {
        remaining.push(this.todoItems[i]);
      }
    }

    if (toggled.completed) {
      remaining.push(toggled);
    } else {
      const firstCompletedIdx = this.findFirstCompleted(remaining);
      if (firstCompletedIdx === -1) {
        remaining.push(toggled);
      } else {
        const newList: Array<TodoItem> = [];
        for (let i = 0; i < firstCompletedIdx; i++) {
          newList.push(remaining[i]);
        }
        newList.push(toggled);
        for (let i = firstCompletedIdx; i < remaining.length; i++) {
          newList.push(remaining[i]);
        }
        this.todoItems = newList;
        this.writeItemsToDataObject();
        return;
      }
    }
    this.todoItems = remaining;
    this.writeItemsToDataObject();
  }

  updateItemTitle(id: string, newTitle: string): void {
    const trimmed = newTitle.trim();
    if (trimmed.length === 0) {
      return;
    }
    for (let i = 0; i < this.todoItems.length; i++) {
      if (this.todoItems[i].id === id) {
        this.todoItems[i].title = trimmed;
        this.todoItems[i].updateTime = Date.now();
        this.writeItemsToDataObject();
        return;
      }
    }
  }

  deleteItem(id: string): void {
    const newList: Array<TodoItem> = [];
    for (let i = 0; i < this.todoItems.length; i++) {
      if (this.todoItems[i].id !== id) {
        newList.push(this.todoItems[i]);
      }
    }
    this.todoItems = newList;
    this.writeItemsToDataObject();
  }

  clearCompleted(): void {
    const newList: Array<TodoItem> = [];
    for (let i = 0; i < this.todoItems.length; i++) {
      if (!this.todoItems[i].completed) {
        newList.push(this.todoItems[i]);
      }
    }
    this.todoItems = newList;
    this.writeItemsToDataObject();
  }

  // ==================== 监听器 ====================

  onDataChange(listener: (items: Array<TodoItem>) => void): void {
    this.changeListeners.push(listener);
  }

  offDataChange(listener: (items: Array<TodoItem>) => void): void {
    const filtered: Array<(items: Array<TodoItem>) => void> = [];
    for (let i = 0; i < this.changeListeners.length; i++) {
      if (this.changeListeners[i] !== listener) {
        filtered.push(this.changeListeners[i]);
      }
    }
    this.changeListeners = filtered;
  }

  onStatusChange(listener: (networkId: string, status: string) => void): void {
    this.statusListeners.push(listener);
  }

  offStatusChange(listener: (networkId: string, status: string) => void): void {
    const filtered: Array<(networkId: string, status: string) => void> = [];
    for (let i = 0; i < this.statusListeners.length; i++) {
      if (this.statusListeners[i] !== listener) {
        filtered.push(this.statusListeners[i]);
      }
    }
    this.statusListeners = filtered;
  }

  getOnlineDevices(): Array<DeviceInfo> {
    const result: Array<DeviceInfo> = [];
    for (let i = 0; i < this.onlineDevices.length; i++) {
      result.push({ networkId: this.onlineDevices[i].networkId, status: this.onlineDevices[i].status });
    }
    return result;
  }

  getSessionId(): string {
    if (!this.dataObject) {
      return '';
    }
    const sid: string | undefined = this.dataObject['sessionId'] as (string | undefined);
    return sid !== undefined ? sid : '';
  }

  // ==================== 内部方法 ====================

  private writeItemsToDataObject(): void {
    if (!this.dataObject) {
      return;
    }
    this.dataObject['itemsJson'] = JSON.stringify(this.todoItems);
    const currentVersion: number | undefined = this.dataObject['version'] as (number | undefined);
    this.dataObject['version'] = (currentVersion !== undefined ? currentVersion : 0) + 1;
    this.notifyListeners();
  }

  private loadFromDataObject(): void {
    if (!this.dataObject) {
      return;
    }
    const itemsJson: string | undefined = this.dataObject['itemsJson'] as (string | undefined);
    if (itemsJson !== undefined && itemsJson.length > 0) {
      try {
        const parsed: TodoItem[] = JSON.parse(itemsJson);
        this.todoItems = parsed;
        this.notifyListeners();
      } catch (e) {
        Logger.error(TAG, `Failed to parse itemsJson: ${e}`);
      }
    }
  }

  private handleDataChange(): void {
    this.loadFromDataObject();
  }

  private handleStatusChange(networkId: string, status: string): void {
    if (status === 'online') {
      let found = false;
      for (let i = 0; i < this.onlineDevices.length; i++) {
        if (this.onlineDevices[i].networkId === networkId) {
          this.onlineDevices[i].status = status;
          found = true;
          break;
        }
      }
      if (!found) {
        this.onlineDevices.push({ networkId: networkId, status: status });
      }
    } else if (status === 'offline') {
      const filtered: Array<DeviceInfo> = [];
      for (let i = 0; i < this.onlineDevices.length; i++) {
        if (this.onlineDevices[i].networkId !== networkId) {
          filtered.push(this.onlineDevices[i]);
        }
      }
      this.onlineDevices = filtered;
    } else if (status === 'restored') {
      Logger.info(TAG, 'Data restored from persistence');
      this.loadFromDataObject();
    }

    for (let i = 0; i < this.statusListeners.length; i++) {
      this.statusListeners[i](networkId, status);
    }
  }

  private notifyListeners(): void {
    const items: Array<TodoItem> = [];
    for (let i = 0; i < this.todoItems.length; i++) {
      items.push(this.todoItems[i]);
    }
    for (let i = 0; i < this.changeListeners.length; i++) {
      this.changeListeners[i](items);
    }
  }

  private findIndex(id: string): number {
    for (let i = 0; i < this.todoItems.length; i++) {
      if (this.todoItems[i].id === id) {
        return i;
      }
    }
    return -1;
  }

  private findFirstCompleted(list: Array<TodoItem>): number {
    for (let i = 0; i < list.length; i++) {
      if (list[i].completed) {
        return i;
      }
    }
    return -1;
  }
}
