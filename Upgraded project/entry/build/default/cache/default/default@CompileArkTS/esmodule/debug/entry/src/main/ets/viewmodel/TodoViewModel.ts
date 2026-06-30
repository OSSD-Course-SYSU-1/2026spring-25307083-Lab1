import type common from "@ohos:app.ability.common";
import Logger from "@bundle:com.example.simplecalculator/entry/ets/common/util/Logger";
import { DistributedTodoModel } from "@bundle:com.example.simplecalculator/entry/ets/model/DistributedTodoModel";
import type { TodoItem } from '../model/TodoItem';
const TAG = 'TodoViewModel';
/**
 * 待办事项 ViewModel。
 * 作为 UI 层与分布式数据模型之间的桥梁，管理所有业务逻辑和状态。
 */
@Observed
export class TodoViewModel {
    /** 待办事项列表（被 @Observed 包装后，变更会自动触发 UI 刷新） */
    todoItems: Array<TodoItem> = [];
    /** 输入框文本 */
    inputText: string = '';
    /** 是否正在编辑 */
    isEditing: boolean = false;
    /** 正在编辑的项 ID */
    editingId: string = '';
    /** 编辑中的文本 */
    editingText: string = '';
    /** 在线设备数量 */
    onlineDeviceCount: number = 0;
    /** 是否已加入分布式组网 */
    isConnected: boolean = false;
    /** 当前设备是否为主设备（首个创建 session 的设备） */
    isHost: boolean = false;
    /** 分布式数据同步模型 */
    private distributedModel: DistributedTodoModel = new DistributedTodoModel();
    /** 会话 ID */
    private sessionId: string = '';
    /** 设备状态描述文本 */
    syncStatusText: string = '等待组网...';
    /**
     * 初始化：创建/加入分布式组网。
     */
    async initialize(context: common.Context): Promise<void> {
        try {
            // 尝试从持久化存储恢复已有的 sessionId
            const savedSessionId = this.loadSessionId();
            this.isHost = !savedSessionId;
            this.sessionId = await this.distributedModel.init(context, savedSessionId);
            // 保存 sessionId 以便下次恢复
            if (!savedSessionId) {
                this.saveSessionId(this.sessionId);
            }
            // 注册数据变更监听
            this.distributedModel.onDataChange((items: Array<TodoItem>) => {
                this.todoItems = items;
            });
            // 注册设备状态监听
            this.distributedModel.onStatusChange((networkId: string, status: string) => {
                this.onlineDeviceCount = this.distributedModel.getOnlineDevices().length;
                this.updateSyncStatus();
            });
            // 加载初始数据
            this.todoItems = this.distributedModel.getItems();
            this.isConnected = true;
            this.updateSyncStatus();
            Logger.info(TAG, `Initialized successfully, sessionId: ${this.sessionId}`);
        }
        catch (err) {
            Logger.error(TAG, `Failed to initialize: ${err}`);
            this.syncStatusText = '组网失败';
        }
    }
    /**
     * 持久化当前数据。
     */
    async save(): Promise<void> {
        await this.distributedModel.saveLocal();
    }
    /**
     * 销毁并释放资源。
     */
    destroy(): void {
        this.distributedModel.destroy();
        this.isConnected = false;
        this.updateSyncStatus();
    }
    // ==================== 待办事项操作 ====================
    /** 添加待办事项 */
    addTodo(): void {
        if (!this.inputText.trim()) {
            return;
        }
        this.distributedModel.addItem(this.inputText);
        this.inputText = '';
    }
    /** 切换完成状态 */
    toggleTodo(id: string): void {
        this.distributedModel.toggleItem(id);
    }
    /** 开始编辑 */
    startEdit(id: string, currentTitle: string): void {
        this.isEditing = true;
        this.editingId = id;
        this.editingText = currentTitle;
    }
    /** 确认编辑 */
    confirmEdit(): void {
        if (this.editingText.trim()) {
            this.distributedModel.updateItemTitle(this.editingId, this.editingText);
        }
        this.cancelEdit();
    }
    /** 取消编辑 */
    cancelEdit(): void {
        this.isEditing = false;
        this.editingId = '';
        this.editingText = '';
    }
    /** 删除待办事项 */
    deleteTodo(id: string): void {
        this.distributedModel.deleteItem(id);
    }
    /** 清空已完成 */
    clearCompleted(): void {
        this.distributedModel.clearCompleted();
    }
    // ==================== 状态 ====================
    /** 获取未完成数量 */
    getPendingCount(): number {
        return this.todoItems.filter(item => !item.completed).length;
    }
    /** 更新同步状态文本 */
    private updateSyncStatus(): void {
        const deviceCount = this.distributedModel.getOnlineDevices().length;
        if (!this.isConnected) {
            this.syncStatusText = '未连接';
        }
        else if (deviceCount === 0) {
            this.syncStatusText = '本机（等待其他设备加入）';
        }
        else {
            this.syncStatusText = `已同步 ${deviceCount} 台设备`;
        }
        this.onlineDeviceCount = deviceCount;
    }
    // ==================== SessionId 持久化 ====================
    /**
     * 使用 Preferences 存储 sessionId，便于应用重启后重新加入已有组网。
     */
    private saveSessionId(sessionId: string): void {
        try {
            AppStorage.setOrCreate('todo_session_id', sessionId);
        }
        catch (e) {
            Logger.error(TAG, `Failed to save sessionId: ${e}`);
        }
    }
    private loadSessionId(): string {
        try {
            const saved = AppStorage.get('todo_session_id') as string;
            return saved || '';
        }
        catch (e) {
            return '';
        }
    }
}
