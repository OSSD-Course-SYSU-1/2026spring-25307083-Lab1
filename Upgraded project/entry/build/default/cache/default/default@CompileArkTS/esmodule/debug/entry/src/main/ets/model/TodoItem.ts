/**
 * 待办事项数据模型。
 * 每个 TodoItem 代表一条待办任务，包含唯一标识、标题、完成状态和时间戳。
 */
export class TodoItem {
    /** 唯一标识，使用时间戳+随机数生成 */
    id: string;
    /** 任务标题 */
    title: string;
    /** 是否已完成 */
    completed: boolean;
    /** 创建时间戳（毫秒） */
    createTime: number;
    /** 最后更新时间戳（毫秒），用于冲突解决 */
    updateTime: number;
    constructor(title: string) {
        this.id = `${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
        this.title = title;
        this.completed = false;
        this.createTime = Date.now();
        this.updateTime = this.createTime;
    }
}
/**
 * 分布式数据对象的源数据结构。
 * 注意：分布式数据对象仅支持根属性级别的同步，
 * 因此 items 数组需要整体替换而非修改单个元素。
 */
export class TodoDataSource {
    /** 待办事项列表（JSON 序列化后的字符串形式，绕开复杂类型嵌套同步限制） */
    itemsJson: string;
    /** 数据版本号，每次本地修改后递增 */
    version: number;
    /** 分布式会话 ID */
    sessionId: string;
    /** 设备在线状态列表（JSON 字符串） */
    onlineDevicesJson: string;
    constructor() {
        this.itemsJson = '[]';
        this.version = 0;
        this.sessionId = '';
        this.onlineDevicesJson = '[]';
    }
}
