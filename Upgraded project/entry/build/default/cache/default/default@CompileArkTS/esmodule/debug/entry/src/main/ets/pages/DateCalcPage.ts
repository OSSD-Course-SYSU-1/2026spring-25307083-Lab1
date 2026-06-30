if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface DateCalcPage_Params {
    currentMode?: CalcMode;
    startYear?: number;
    startMonth?: number;
    startDay?: number;
    endYear?: number;
    endMonth?: number;
    endDay?: number;
    intervalResult?: string;
    baseYear?: number;
    baseMonth?: number;
    baseDay?: number;
    daysToAdd?: string;
    addSubResult?: string;
}
import router from "@ohos:router";
enum CalcMode {
    INTERVAL = "\u65E5\u671F\u95F4\u9694",
    ADD_SUB = "\u65E5\u671F\u52A0\u51CF"
}
class DateCalcPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__currentMode = new ObservedPropertySimplePU(CalcMode.INTERVAL, this, "currentMode");
        this.__startYear = new ObservedPropertySimplePU(new Date().getFullYear(), this, "startYear");
        this.__startMonth = new ObservedPropertySimplePU(new Date().getMonth() + 1, this, "startMonth");
        this.__startDay = new ObservedPropertySimplePU(new Date().getDate(), this, "startDay");
        this.__endYear = new ObservedPropertySimplePU(new Date().getFullYear(), this, "endYear");
        this.__endMonth = new ObservedPropertySimplePU(new Date().getMonth() + 1, this, "endMonth");
        this.__endDay = new ObservedPropertySimplePU(new Date().getDate(), this, "endDay");
        this.__intervalResult = new ObservedPropertySimplePU('', this, "intervalResult");
        this.__baseYear = new ObservedPropertySimplePU(new Date().getFullYear(), this, "baseYear");
        this.__baseMonth = new ObservedPropertySimplePU(new Date().getMonth() + 1, this, "baseMonth");
        this.__baseDay = new ObservedPropertySimplePU(new Date().getDate(), this, "baseDay");
        this.__daysToAdd = new ObservedPropertySimplePU('30', this, "daysToAdd");
        this.__addSubResult = new ObservedPropertySimplePU('', this, "addSubResult");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: DateCalcPage_Params) {
        if (params.currentMode !== undefined) {
            this.currentMode = params.currentMode;
        }
        if (params.startYear !== undefined) {
            this.startYear = params.startYear;
        }
        if (params.startMonth !== undefined) {
            this.startMonth = params.startMonth;
        }
        if (params.startDay !== undefined) {
            this.startDay = params.startDay;
        }
        if (params.endYear !== undefined) {
            this.endYear = params.endYear;
        }
        if (params.endMonth !== undefined) {
            this.endMonth = params.endMonth;
        }
        if (params.endDay !== undefined) {
            this.endDay = params.endDay;
        }
        if (params.intervalResult !== undefined) {
            this.intervalResult = params.intervalResult;
        }
        if (params.baseYear !== undefined) {
            this.baseYear = params.baseYear;
        }
        if (params.baseMonth !== undefined) {
            this.baseMonth = params.baseMonth;
        }
        if (params.baseDay !== undefined) {
            this.baseDay = params.baseDay;
        }
        if (params.daysToAdd !== undefined) {
            this.daysToAdd = params.daysToAdd;
        }
        if (params.addSubResult !== undefined) {
            this.addSubResult = params.addSubResult;
        }
    }
    updateStateVars(params: DateCalcPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__currentMode.purgeDependencyOnElmtId(rmElmtId);
        this.__startYear.purgeDependencyOnElmtId(rmElmtId);
        this.__startMonth.purgeDependencyOnElmtId(rmElmtId);
        this.__startDay.purgeDependencyOnElmtId(rmElmtId);
        this.__endYear.purgeDependencyOnElmtId(rmElmtId);
        this.__endMonth.purgeDependencyOnElmtId(rmElmtId);
        this.__endDay.purgeDependencyOnElmtId(rmElmtId);
        this.__intervalResult.purgeDependencyOnElmtId(rmElmtId);
        this.__baseYear.purgeDependencyOnElmtId(rmElmtId);
        this.__baseMonth.purgeDependencyOnElmtId(rmElmtId);
        this.__baseDay.purgeDependencyOnElmtId(rmElmtId);
        this.__daysToAdd.purgeDependencyOnElmtId(rmElmtId);
        this.__addSubResult.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__currentMode.aboutToBeDeleted();
        this.__startYear.aboutToBeDeleted();
        this.__startMonth.aboutToBeDeleted();
        this.__startDay.aboutToBeDeleted();
        this.__endYear.aboutToBeDeleted();
        this.__endMonth.aboutToBeDeleted();
        this.__endDay.aboutToBeDeleted();
        this.__intervalResult.aboutToBeDeleted();
        this.__baseYear.aboutToBeDeleted();
        this.__baseMonth.aboutToBeDeleted();
        this.__baseDay.aboutToBeDeleted();
        this.__daysToAdd.aboutToBeDeleted();
        this.__addSubResult.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __currentMode: ObservedPropertySimplePU<CalcMode>;
    get currentMode() {
        return this.__currentMode.get();
    }
    set currentMode(newValue: CalcMode) {
        this.__currentMode.set(newValue);
    }
    // 日期间隔模式
    private __startYear: ObservedPropertySimplePU<number>;
    get startYear() {
        return this.__startYear.get();
    }
    set startYear(newValue: number) {
        this.__startYear.set(newValue);
    }
    private __startMonth: ObservedPropertySimplePU<number>;
    get startMonth() {
        return this.__startMonth.get();
    }
    set startMonth(newValue: number) {
        this.__startMonth.set(newValue);
    }
    private __startDay: ObservedPropertySimplePU<number>;
    get startDay() {
        return this.__startDay.get();
    }
    set startDay(newValue: number) {
        this.__startDay.set(newValue);
    }
    private __endYear: ObservedPropertySimplePU<number>;
    get endYear() {
        return this.__endYear.get();
    }
    set endYear(newValue: number) {
        this.__endYear.set(newValue);
    }
    private __endMonth: ObservedPropertySimplePU<number>;
    get endMonth() {
        return this.__endMonth.get();
    }
    set endMonth(newValue: number) {
        this.__endMonth.set(newValue);
    }
    private __endDay: ObservedPropertySimplePU<number>;
    get endDay() {
        return this.__endDay.get();
    }
    set endDay(newValue: number) {
        this.__endDay.set(newValue);
    }
    private __intervalResult: ObservedPropertySimplePU<string>;
    get intervalResult() {
        return this.__intervalResult.get();
    }
    set intervalResult(newValue: string) {
        this.__intervalResult.set(newValue);
    }
    // 日期加减模式
    private __baseYear: ObservedPropertySimplePU<number>;
    get baseYear() {
        return this.__baseYear.get();
    }
    set baseYear(newValue: number) {
        this.__baseYear.set(newValue);
    }
    private __baseMonth: ObservedPropertySimplePU<number>;
    get baseMonth() {
        return this.__baseMonth.get();
    }
    set baseMonth(newValue: number) {
        this.__baseMonth.set(newValue);
    }
    private __baseDay: ObservedPropertySimplePU<number>;
    get baseDay() {
        return this.__baseDay.get();
    }
    set baseDay(newValue: number) {
        this.__baseDay.set(newValue);
    }
    private __daysToAdd: ObservedPropertySimplePU<string>;
    get daysToAdd() {
        return this.__daysToAdd.get();
    }
    set daysToAdd(newValue: string) {
        this.__daysToAdd.set(newValue);
    }
    private __addSubResult: ObservedPropertySimplePU<string>;
    get addSubResult() {
        return this.__addSubResult.get();
    }
    set addSubResult(newValue: string) {
        this.__addSubResult.set(newValue);
    }
    aboutToAppear(): void {
        this.calcInterval();
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor('#F1F3F5');
        }, Column);
        this.buildHeader.bind(this)();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 模式切换
            Row.create();
            // 模式切换
            Row.width('100%');
            // 模式切换
            Row.justifyContent(FlexAlign.Center);
            // 模式切换
            Row.padding({ top: 12, bottom: 8 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel(this.currentMode === CalcMode.INTERVAL ? CalcMode.INTERVAL : `  ${CalcMode.INTERVAL}`);
            Button.fontSize({ "id": 16777263, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
            Button.fontColor(this.currentMode === CalcMode.INTERVAL ? Color.White : '#666666');
            Button.backgroundColor(this.currentMode === CalcMode.INTERVAL ? '#007DFF' : '#F5F5F5');
            Button.borderRadius(20);
            Button.height(36);
            Button.padding({ left: 16, right: 16 });
            Button.border({ width: 1, color: this.currentMode === CalcMode.INTERVAL ? '#007DFF' : '#E0E0E0' });
            Button.onClick(() => { this.currentMode = CalcMode.INTERVAL; this.calcInterval(); });
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel(this.currentMode === CalcMode.ADD_SUB ? CalcMode.ADD_SUB : `  ${CalcMode.ADD_SUB}`);
            Button.fontSize({ "id": 16777263, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
            Button.fontColor(this.currentMode === CalcMode.ADD_SUB ? Color.White : '#666666');
            Button.backgroundColor(this.currentMode === CalcMode.ADD_SUB ? '#007DFF' : '#F5F5F5');
            Button.borderRadius(20);
            Button.height(36);
            Button.padding({ left: 16, right: 16 });
            Button.margin({ left: 8 });
            Button.border({ width: 1, color: this.currentMode === CalcMode.ADD_SUB ? '#007DFF' : '#E0E0E0' });
            Button.onClick(() => { this.currentMode = CalcMode.ADD_SUB; this.calcAddSub(); });
        }, Button);
        Button.pop();
        // 模式切换
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.currentMode === CalcMode.INTERVAL) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.buildIntervalMode.bind(this)();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.buildAddSubMode.bind(this)();
                });
            }
        }, If);
        If.pop();
        // 结果展示
        this.buildResultPanel.bind(this)();
        Column.pop();
    }
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
            Button.onClick(() => { router.back(); });
        }, Button);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('←');
            Text.fontSize({ "id": 16777267, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
            Text.fontColor('#333333');
        }, Text);
        Text.pop();
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('日期计算');
            Text.fontSize({ "id": 16777267, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#1A1A1A');
            Text.margin({ left: 8 });
        }, Text);
        Text.pop();
        Row.pop();
    }
    // ==================== 日期间隔模式 ====================
    buildIntervalMode(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.padding({ left: 16, right: 16, top: 4 });
        }, Column);
        this.buildDateCard.bind(this)('起始日期', this.startYear, this.startMonth, this.startDay, (y, m, d) => { this.startYear = y; this.startMonth = m; this.startDay = d; this.calcInterval(); });
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.justifyContent(FlexAlign.Center);
            Row.margin({ top: 4, bottom: 4 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('↓');
            Text.fontSize(24);
            Text.fontColor('#007DFF');
        }, Text);
        Text.pop();
        Row.pop();
        this.buildDateCard.bind(this)('结束日期', this.endYear, this.endMonth, this.endDay, (y, m, d) => { this.endYear = y; this.endMonth = m; this.endDay = d; this.calcInterval(); });
        Column.pop();
    }
    // ==================== 日期加减模式 ====================
    buildAddSubMode(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.padding({ left: 16, right: 16, top: 4 });
        }, Column);
        this.buildDateCard.bind(this)('基准日期', this.baseYear, this.baseMonth, this.baseDay, (y, m, d) => { this.baseYear = y; this.baseMonth = m; this.baseDay = d; this.calcAddSub(); });
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 天数输入
            Column.create();
            // 天数输入
            Column.width('100%');
            // 天数输入
            Column.padding(16);
            // 天数输入
            Column.backgroundColor('#FFFFFF');
            // 天数输入
            Column.borderRadius(16);
            // 天数输入
            Column.border({ width: 1, color: '#EEEEEE' });
            // 天数输入
            Column.margin({ top: 8 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('加减天数（负数表示往前）');
            Text.fontSize({ "id": 16777266, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
            Text.fontColor('#999999');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.margin({ top: 8 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('-');
            Button.fontSize({ "id": 16777267, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
            Button.fontColor('#FF5252');
            Button.backgroundColor('#FFF0F0');
            Button.width(48);
            Button.height(40);
            Button.borderRadius(8);
            Button.onClick(() => {
                let n = parseInt(this.daysToAdd) || 0;
                this.daysToAdd = (n - 1).toString();
                this.calcAddSub();
            });
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TextInput.create({ text: this.daysToAdd });
            TextInput.fontSize({ "id": 16777233, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
            TextInput.fontWeight(FontWeight.Bold);
            TextInput.textAlign(TextAlign.Center);
            TextInput.type(InputType.Number);
            TextInput.backgroundColor('#FAFAFA');
            TextInput.layoutWeight(1);
            TextInput.height(48);
            TextInput.borderRadius(8);
            TextInput.border({ width: 1, color: '#E0E0E0' });
            TextInput.margin({ left: 8, right: 8 });
            TextInput.onChange((v: string) => { this.daysToAdd = v; this.calcAddSub(); });
        }, TextInput);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('+');
            Button.fontSize({ "id": 16777267, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
            Button.fontColor('#4CAF50');
            Button.backgroundColor('#E8F5E9');
            Button.width(48);
            Button.height(40);
            Button.borderRadius(8);
            Button.onClick(() => {
                let n = parseInt(this.daysToAdd) || 0;
                this.daysToAdd = (n + 1).toString();
                this.calcAddSub();
            });
        }, Button);
        Button.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 快捷天数
            Row.create();
            // 快捷天数
            Row.width('100%');
            // 快捷天数
            Row.margin({ top: 6 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const d = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Button.createWithLabel(d);
                    Button.fontSize({ "id": 16777266, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
                    Button.fontColor('#007DFF');
                    Button.backgroundColor('#F0F7FF');
                    Button.height(30);
                    Button.borderRadius(15);
                    Button.padding({ left: 10, right: 10 });
                    Button.margin({ right: 6 });
                    Button.onClick(() => { this.daysToAdd = d; this.calcAddSub(); });
                }, Button);
                Button.pop();
            };
            this.forEachUpdateFunction(elmtId, ['7', '30', '90', '180', '365', '-7', '-30'], forEachItemGenFunction);
        }, ForEach);
        ForEach.pop();
        // 快捷天数
        Row.pop();
        // 天数输入
        Column.pop();
        Column.pop();
    }
    // ==================== 日期卡片 ====================
    buildDateCard(title: string, year: number, month: number, day: number, onChange: (y: number, m: number, d: number) => void, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.padding(16);
            Column.backgroundColor('#FFFFFF');
            Column.borderRadius(16);
            Column.border({ width: 1, color: '#EEEEEE' });
            Column.shadow({ radius: 4, color: '#0A000000', offsetY: 2 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(title);
            Text.fontSize({ "id": 16777266, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
            Text.fontColor('#999999');
            Text.width('100%');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.margin({ top: 4, bottom: 8 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.formatDate(year, month, day));
            Text.fontSize({ "id": 16777264, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#1A1A1A');
            Text.layoutWeight(1);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.getWeekday(year, month, day));
            Text.fontSize({ "id": 16777263, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
            Text.fontColor('#999999');
            Text.margin({ right: 8 });
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            DatePicker.create({
                start: new Date('1970-1-1'),
                end: new Date('2099-12-31'),
                selected: new Date(year, month - 1, day)
            });
            DatePicker.onChange((value: DatePickerResult) => {
                onChange(value.year as number, (value.month as number) + 1, value.day as number);
            });
        }, DatePicker);
        DatePicker.pop();
        Column.pop();
    }
    // ==================== 结果面板 ====================
    buildResultPanel(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.padding(20);
            Column.backgroundColor('#FFFFFF');
            Column.borderRadius(16);
            Column.border({ width: 1, color: '#E3F2FD' });
            Column.margin({ left: 16, right: 16, top: 16 });
            Column.shadow({ radius: 4, color: '#0A000000', offsetY: 2 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.currentMode === CalcMode.INTERVAL) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(this.intervalResult);
                        Text.fontSize({ "id": 16777233, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
                        Text.fontWeight(FontWeight.Bold);
                        Text.fontColor('#007DFF');
                        Text.textAlign(TextAlign.Center);
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        If.create();
                        if (this.intervalResult) {
                            this.ifElseBranchUpdateFunction(0, () => {
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Text.create(this.getIntervalDetail());
                                    Text.fontSize({ "id": 16777263, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
                                    Text.fontColor('#999999');
                                    Text.margin({ top: 4 });
                                    Text.textAlign(TextAlign.Center);
                                }, Text);
                                Text.pop();
                            });
                        }
                        else {
                            this.ifElseBranchUpdateFunction(1, () => {
                            });
                        }
                    }, If);
                    If.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(this.addSubResult);
                        Text.fontSize({ "id": 16777233, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
                        Text.fontWeight(FontWeight.Bold);
                        Text.fontColor('#007DFF');
                        Text.textAlign(TextAlign.Center);
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        If.create();
                        if (this.addSubResult) {
                            this.ifElseBranchUpdateFunction(0, () => {
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Text.create(this.getAddSubDetail());
                                    Text.fontSize({ "id": 16777263, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
                                    Text.fontColor('#999999');
                                    Text.margin({ top: 4 });
                                    Text.textAlign(TextAlign.Center);
                                }, Text);
                                Text.pop();
                            });
                        }
                        else {
                            this.ifElseBranchUpdateFunction(1, () => {
                            });
                        }
                    }, If);
                    If.pop();
                });
            }
        }, If);
        If.pop();
        Column.pop();
    }
    // ==================== 计算方法 ====================
    private calcInterval(): void {
        let start = new Date(this.startYear, this.startMonth - 1, this.startDay);
        let end = new Date(this.endYear, this.endMonth - 1, this.endDay);
        let diffMs = end.getTime() - start.getTime();
        let diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));
        if (diffDays === 0) {
            this.intervalResult = '同一天';
        }
        else if (diffDays > 0) {
            this.intervalResult = `相差 ${diffDays} 天`;
        }
        else {
            this.intervalResult = `相差 ${Math.abs(diffDays)} 天（往前）`;
        }
    }
    private calcAddSub(): void {
        let base = new Date(this.baseYear, this.baseMonth - 1, this.baseDay);
        let days = parseInt(this.daysToAdd);
        if (isNaN(days)) {
            this.addSubResult = '请输入有效天数';
            return;
        }
        let result = new Date(base.getTime() + days * 24 * 60 * 60 * 1000);
        this.addSubResult = `${result.getFullYear()}年${result.getMonth() + 1}月${result.getDate()}日`;
    }
    private getIntervalDetail(): string {
        let start = new Date(this.startYear, this.startMonth - 1, this.startDay);
        let end = new Date(this.endYear, this.endMonth - 1, this.endDay);
        let diffMs = Math.abs(end.getTime() - start.getTime());
        let days = Math.round(diffMs / (1000 * 60 * 60 * 24));
        let weeks = Math.floor(days / 7);
        let remainDays = days % 7;
        let detail = `约 ${weeks} 周`;
        if (remainDays > 0)
            detail += ` ${remainDays} 天`;
        if (days >= 365) {
            let years = Math.floor(days / 365);
            let r = days % 365;
            let months = Math.floor(r / 30);
            detail = `约 ${years} 年`;
            if (months > 0)
                detail += ` ${months} 个月`;
        }
        return detail;
    }
    private getAddSubDetail(): string {
        let days = parseInt(this.daysToAdd);
        if (isNaN(days))
            return '';
        let base = new Date(this.baseYear, this.baseMonth - 1, this.baseDay);
        let result = new Date(base.getTime() + days * 24 * 60 * 60 * 1000);
        return `${this.getWeekday(result.getFullYear(), result.getMonth() + 1, result.getDate())}`;
    }
    private formatDate(y: number, m: number, d: number): string {
        return `${y}-${m.toString().padStart(2, '0')}-${d.toString().padStart(2, '0')}`;
    }
    private getWeekday(y: number, m: number, d: number): string {
        let weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
        let date = new Date(y, m - 1, d);
        return weekdays[date.getDay()];
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "DateCalcPage";
    }
}
registerNamedRoute(() => new DateCalcPage(undefined, {}), "", { bundleName: "com.example.simplecalculator", moduleName: "entry", pagePath: "pages/DateCalcPage", pageFullPath: "entry/src/main/ets/pages/DateCalcPage", integratedHsp: "false", moduleType: "followWithHap" });
