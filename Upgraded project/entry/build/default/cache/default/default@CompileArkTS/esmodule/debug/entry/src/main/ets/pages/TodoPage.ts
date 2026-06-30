if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface TodoPage_Params {
    viewModel?: TodoViewModel;
    inputText?: string;
    showEditDialog?: boolean;
}
import type common from "@ohos:app.ability.common";
import router from "@ohos:router";
import Logger from "@bundle:com.example.simplecalculator/entry/ets/common/util/Logger";
import { TodoViewModel } from "@bundle:com.example.simplecalculator/entry/ets/viewmodel/TodoViewModel";
import type { TodoItem } from '../model/TodoItem';
const TAG = 'TodoPage';
class TodoPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__viewModel = new ObservedPropertyObjectPU(new TodoViewModel(), this, "viewModel");
        this.__inputText = new ObservedPropertySimplePU('', this, "inputText");
        this.__showEditDialog = new ObservedPropertySimplePU(false, this, "showEditDialog");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: TodoPage_Params) {
        if (params.viewModel !== undefined) {
            this.viewModel = params.viewModel;
        }
        if (params.inputText !== undefined) {
            this.inputText = params.inputText;
        }
        if (params.showEditDialog !== undefined) {
            this.showEditDialog = params.showEditDialog;
        }
    }
    updateStateVars(params: TodoPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__viewModel.purgeDependencyOnElmtId(rmElmtId);
        this.__inputText.purgeDependencyOnElmtId(rmElmtId);
        this.__showEditDialog.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__viewModel.aboutToBeDeleted();
        this.__inputText.aboutToBeDeleted();
        this.__showEditDialog.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    /** ViewModel 实例 */
    private __viewModel: ObservedPropertyObjectPU<TodoViewModel>;
    get viewModel() {
        return this.__viewModel.get();
    }
    set viewModel(newValue: TodoViewModel) {
        this.__viewModel.set(newValue);
    }
    /** 输入框文本（双向绑定到 ViewModel） */
    private __inputText: ObservedPropertySimplePU<string>;
    get inputText() {
        return this.__inputText.get();
    }
    set inputText(newValue: string) {
        this.__inputText.set(newValue);
    }
    /** 编辑弹窗是否可见 */
    private __showEditDialog: ObservedPropertySimplePU<boolean>;
    get showEditDialog() {
        return this.__showEditDialog.get();
    }
    set showEditDialog(newValue: boolean) {
        this.__showEditDialog.set(newValue);
    }
    aboutToAppear(): void {
        const context = getContext(this) as common.UIAbilityContext;
        this.viewModel.initialize(context);
        Logger.info(TAG, 'TodoPage aboutToAppear');
    }
    aboutToDisappear(): void {
        this.viewModel.save();
        Logger.info(TAG, 'TodoPage aboutToDisappear');
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor('#F1F3F5');
        }, Column);
        // ========== 顶部状态栏 ==========
        this.buildHeader.bind(this)();
        // ========== 输入区域 ==========
        this.buildInputArea.bind(this)();
        // ========== 待办列表 ==========
        this.buildTodoList.bind(this)();
        // ========== 底部工具栏 ==========
        this.buildBottomBar.bind(this)();
        Column.pop();
    }
    /**
     * 顶部状态栏：显示同步状态和返回按钮。
     */
    buildHeader(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.height({ "id": 16777271, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
            Row.padding({ left: 16, right: 16 });
            Row.backgroundColor('#FFFFFF');
            Row.shadow({ radius: 4, color: '#10000000', offsetY: 2 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithChild({ type: ButtonType.Circle });
            Button.width({ "id": 16777269, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
            Button.height({ "id": 16777269, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
            Button.backgroundColor(Color.Transparent);
            Button.onClick(() => {
                router.back();
            });
        }, Button);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('←');
            Text.fontSize({ "id": 16777267, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
            Text.fontColor('#333333');
        }, Text);
        Text.pop();
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('待办事项');
            Text.fontSize({ "id": 16777267, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#1A1A1A');
            Text.margin({ left: 8 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.padding({ left: 10, right: 10, top: 4, bottom: 4 });
            Row.backgroundColor('#FFFFFF');
            Row.borderRadius(12);
            Row.border({ width: 1, color: '#E0E0E0' });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Circle.create({ width: 8, height: 8 });
            Circle.fill(this.viewModel.isConnected ? '#4CAF50' : '#FF9800');
            Circle.margin({ right: 4 });
        }, Circle);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.viewModel.syncStatusText);
            Text.fontSize({ "id": 16777265, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
            Text.fontColor('#666666');
            Text.maxLines(1);
        }, Text);
        Text.pop();
        Row.pop();
        Row.pop();
    }
    /**
     * 输入区域：文本输入框 + 添加按钮。
     */
    buildInputArea(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.padding({ left: 16, right: 16, top: 12, bottom: 8 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TextInput.create({ placeholder: '输入新的待办事项...', text: this.inputText });
            TextInput.layoutWeight(1);
            TextInput.height({ "id": 16777258, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
            TextInput.fontSize({ "id": 16777262, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
            TextInput.backgroundColor('#FFFFFF');
            TextInput.borderRadius(22);
            TextInput.padding({ left: 16, right: 16 });
            TextInput.border({ width: 1, color: '#E0E0E0' });
            TextInput.onChange((value: string) => {
                this.inputText = value;
                this.viewModel.inputText = value;
            });
            TextInput.onSubmit(() => {
                this.viewModel.addTodo();
                this.inputText = '';
            });
        }, TextInput);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('添加');
            Button.fontSize({ "id": 16777263, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
            Button.fontColor(Color.White);
            Button.backgroundColor('#007DFF');
            Button.borderRadius(22);
            Button.height({ "id": 16777258, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
            Button.padding({ left: 20, right: 20 });
            Button.margin({ left: 8 });
            Button.onClick(() => {
                this.viewModel.addTodo();
                this.inputText = '';
            });
        }, Button);
        Button.pop();
        Row.pop();
    }
    /**
     * 待办列表区域。
     */
    buildTodoList(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.viewModel.todoItems.length === 0) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.width('100%');
                        Column.layoutWeight(1);
                        Column.justifyContent(FlexAlign.Center);
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('📝');
                        Text.fontSize({ "id": 16777260, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
                        Text.margin({ bottom: 12 });
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('暂无待办事项');
                        Text.fontSize({ "id": 16777262, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
                        Text.fontColor('#999999');
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('添加一条新任务开始吧');
                        Text.fontSize({ "id": 16777263, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
                        Text.fontColor('#BBBBBB');
                        Text.margin({ top: 4 });
                    }, Text);
                    Text.pop();
                    Column.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        List.create();
                        List.layoutWeight(1);
                        List.width('100%');
                        List.padding({ left: 16, right: 16, top: 4 });
                        List.divider({
                            strokeWidth: 1,
                            color: '#F0F0F0',
                            startMargin: 56,
                            endMargin: 16
                        });
                    }, List);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        ForEach.create();
                        const forEachItemGenFunction = (_item, index: number) => {
                            const item = _item;
                            {
                                const itemCreation = (elmtId, isInitialRender) => {
                                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                    ListItem.create(deepRenderFunction, true);
                                    if (!isInitialRender) {
                                        ListItem.pop();
                                    }
                                    ViewStackProcessor.StopGetAccessRecording();
                                };
                                const itemCreation2 = (elmtId, isInitialRender) => {
                                    ListItem.create(deepRenderFunction, true);
                                };
                                const deepRenderFunction = (elmtId, isInitialRender) => {
                                    itemCreation(elmtId, isInitialRender);
                                    this.buildTodoItem.bind(this)(item);
                                    ListItem.pop();
                                };
                                this.observeComponentCreation2(itemCreation2, ListItem);
                                ListItem.pop();
                            }
                        };
                        this.forEachUpdateFunction(elmtId, this.viewModel.todoItems, forEachItemGenFunction, (item: TodoItem) => item.id, true, false);
                    }, ForEach);
                    ForEach.pop();
                    List.pop();
                });
            }
        }, If);
        If.pop();
    }
    /**
     * 单个待办事项组件。
     */
    buildTodoItem(item: TodoItem, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.padding({ top: 14, bottom: 14 });
            Row.backgroundColor('#FFFFFF');
            Row.borderRadius(8);
            Row.margin({ bottom: 6 });
            Row.padding({ left: 12, right: 8 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 完成状态复选框
            Checkbox.create({ name: item.id, group: 'todoGroup' });
            // 完成状态复选框
            Checkbox.select(item.completed);
            // 完成状态复选框
            Checkbox.selectedColor('#4CAF50');
            // 完成状态复选框
            Checkbox.width({ "id": 16777270, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
            // 完成状态复选框
            Checkbox.height({ "id": 16777270, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
            // 完成状态复选框
            Checkbox.margin({ right: 12 });
            // 完成状态复选框
            Checkbox.onChange((value: boolean) => {
                this.viewModel.toggleTodo(item.id);
            });
        }, Checkbox);
        // 完成状态复选框
        Checkbox.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 标题文本
            Column.create();
            // 标题文本
            Column.alignItems(HorizontalAlign.Start);
            // 标题文本
            Column.layoutWeight(1);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(item.title);
            Text.fontSize({ "id": 16777262, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
            Text.fontColor(item.completed ? '#AAAAAA' : '#1A1A1A');
            Text.decoration({ type: item.completed ? TextDecorationType.LineThrough : TextDecorationType.None });
            Text.maxLines(2);
            Text.textOverflow({ overflow: TextOverflow.Ellipsis });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.formatTime(item.createTime));
            Text.fontSize({ "id": 16777266, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
            Text.fontColor('#BBBBBB');
            Text.margin({ top: 2 });
        }, Text);
        Text.pop();
        // 标题文本
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 编辑按钮
            Button.createWithChild({ type: ButtonType.Circle });
            // 编辑按钮
            Button.width({ "id": 16777259, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
            // 编辑按钮
            Button.height({ "id": 16777259, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
            // 编辑按钮
            Button.backgroundColor('#F0F7FF');
            // 编辑按钮
            Button.margin({ right: 4 });
            // 编辑按钮
            Button.onClick(() => {
                this.viewModel.startEdit(item.id, item.title);
                this.showEditDialog = true;
            });
        }, Button);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('✎');
            Text.fontSize({ "id": 16777263, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
            Text.fontColor('#007DFF');
        }, Text);
        Text.pop();
        // 编辑按钮
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 删除按钮
            Button.createWithChild({ type: ButtonType.Circle });
            // 删除按钮
            Button.width({ "id": 16777259, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
            // 删除按钮
            Button.height({ "id": 16777259, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
            // 删除按钮
            Button.backgroundColor('#FFF0F0');
            // 删除按钮
            Button.onClick(() => {
                this.viewModel.deleteTodo(item.id);
            });
        }, Button);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('✕');
            Text.fontSize({ "id": 16777263, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
            Text.fontColor('#FF5252');
        }, Text);
        Text.pop();
        // 删除按钮
        Button.pop();
        Row.pop();
    }
    /**
     * 底部工具栏：显示统计信息和操作按钮。
     */
    buildBottomBar(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.height({ "id": 16777272, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
            Row.padding({ left: 20, right: 16 });
            Row.backgroundColor('#FFFFFF');
            Row.border({ width: { top: 1 }, color: '#EEEEEE' });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(`${this.viewModel.getPendingCount()} 项待完成`);
            Text.fontSize({ "id": 16777263, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
            Text.fontColor('#888888');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('清除已完成');
            Button.fontSize({ "id": 16777265, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
            Button.fontColor('#FF5252');
            Button.backgroundColor(Color.Transparent);
            Button.height(32);
            Button.padding({ left: 12, right: 12 });
            Button.border({ width: 1, color: '#FFCDD2', radius: 16 });
            Button.onClick(() => {
                this.viewModel.clearCompleted();
            });
        }, Button);
        Button.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            // ========== 编辑弹窗 ==========
            if (this.showEditDialog) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.buildEditDialog.bind(this)();
                });
            }
            else /**
             * 编辑弹窗。
             */ {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
    }
    /**
     * 编辑弹窗。
     */
    buildEditDialog(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.height('100%');
            Column.justifyContent(FlexAlign.Center);
            Column.backgroundColor('#50000000');
            Column.position({ x: 0, y: 0 });
            Column.onClick(() => {
                // 点击遮罩关闭
                this.viewModel.cancelEdit();
                this.showEditDialog = false;
            });
            Column.hitTestBehavior(HitTestMode.Block);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('80%');
            Column.padding(20);
            Column.backgroundColor(Color.White);
            Column.borderRadius(16);
            Column.shadow({ radius: 20, color: '#30000000' });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('编辑待办事项');
            Text.fontSize({ "id": 16777268, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
            Text.fontWeight(FontWeight.Bold);
            Text.margin({ bottom: 16 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TextInput.create({ text: this.viewModel.editingText });
            TextInput.fontSize({ "id": 16777262, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
            TextInput.width('100%');
            TextInput.height({ "id": 16777258, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
            TextInput.backgroundColor('#F5F5F5');
            TextInput.borderRadius(8);
            TextInput.padding({ left: 12, right: 12 });
            TextInput.onChange((value: string) => {
                this.viewModel.editingText = value;
            });
            TextInput.onSubmit(() => {
                this.viewModel.confirmEdit();
                this.showEditDialog = false;
            });
        }, TextInput);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.margin({ top: 16 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('取消');
            Button.fontSize({ "id": 16777263, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
            Button.fontColor('#666666');
            Button.backgroundColor('#F5F5F5');
            Button.layoutWeight(1);
            Button.height({ "id": 16777257, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
            Button.borderRadius(8);
            Button.margin({ right: 8 });
            Button.onClick(() => {
                this.viewModel.cancelEdit();
                this.showEditDialog = false;
            });
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('确认');
            Button.fontSize({ "id": 16777263, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
            Button.fontColor(Color.White);
            Button.backgroundColor('#007DFF');
            Button.layoutWeight(1);
            Button.height({ "id": 16777257, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
            Button.borderRadius(8);
            Button.onClick(() => {
                this.viewModel.confirmEdit();
                this.showEditDialog = false;
            });
        }, Button);
        Button.pop();
        Row.pop();
        Column.pop();
        Column.pop();
    }
    /**
     * 格式化时间戳为可读字符串。
     */
    private formatTime(timestamp: number): string {
        const date = new Date(timestamp);
        const now = new Date();
        const diff = now.getTime() - timestamp;
        const oneDay = 24 * 60 * 60 * 1000;
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        if (diff < oneDay && now.getDate() === date.getDate()) {
            return `今天 ${hours}:${minutes}`;
        }
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${month}-${day} ${hours}:${minutes}`;
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "TodoPage";
    }
}
registerNamedRoute(() => new TodoPage(undefined, {}), "", { bundleName: "com.example.simplecalculator", moduleName: "entry", pagePath: "pages/TodoPage", pageFullPath: "entry/src/main/ets/pages/TodoPage", integratedHsp: "false", moduleType: "followWithHap" });
