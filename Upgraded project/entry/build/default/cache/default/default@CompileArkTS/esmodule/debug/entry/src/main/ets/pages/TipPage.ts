if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface TipPage_Params {
    billAmount?: string;
    tipPercent?: number;
    customPercent?: string;
    isCustom?: boolean;
    peopleCount?: number;
    tipAmount?: string;
    totalAmount?: string;
    perPerson?: string;
    presets?: number[];
}
import router from "@ohos:router";
class TipPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__billAmount = new ObservedPropertySimplePU('', this, "billAmount");
        this.__tipPercent = new ObservedPropertySimplePU(15, this, "tipPercent");
        this.__customPercent = new ObservedPropertySimplePU('', this, "customPercent");
        this.__isCustom = new ObservedPropertySimplePU(false, this, "isCustom");
        this.__peopleCount = new ObservedPropertySimplePU(1, this, "peopleCount");
        this.__tipAmount = new ObservedPropertySimplePU('0.00', this, "tipAmount");
        this.__totalAmount = new ObservedPropertySimplePU('0.00', this, "totalAmount");
        this.__perPerson = new ObservedPropertySimplePU('0.00', this, "perPerson");
        this.presets = [10, 12, 15, 18, 20, 25];
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: TipPage_Params) {
        if (params.billAmount !== undefined) {
            this.billAmount = params.billAmount;
        }
        if (params.tipPercent !== undefined) {
            this.tipPercent = params.tipPercent;
        }
        if (params.customPercent !== undefined) {
            this.customPercent = params.customPercent;
        }
        if (params.isCustom !== undefined) {
            this.isCustom = params.isCustom;
        }
        if (params.peopleCount !== undefined) {
            this.peopleCount = params.peopleCount;
        }
        if (params.tipAmount !== undefined) {
            this.tipAmount = params.tipAmount;
        }
        if (params.totalAmount !== undefined) {
            this.totalAmount = params.totalAmount;
        }
        if (params.perPerson !== undefined) {
            this.perPerson = params.perPerson;
        }
        if (params.presets !== undefined) {
            this.presets = params.presets;
        }
    }
    updateStateVars(params: TipPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__billAmount.purgeDependencyOnElmtId(rmElmtId);
        this.__tipPercent.purgeDependencyOnElmtId(rmElmtId);
        this.__customPercent.purgeDependencyOnElmtId(rmElmtId);
        this.__isCustom.purgeDependencyOnElmtId(rmElmtId);
        this.__peopleCount.purgeDependencyOnElmtId(rmElmtId);
        this.__tipAmount.purgeDependencyOnElmtId(rmElmtId);
        this.__totalAmount.purgeDependencyOnElmtId(rmElmtId);
        this.__perPerson.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__billAmount.aboutToBeDeleted();
        this.__tipPercent.aboutToBeDeleted();
        this.__customPercent.aboutToBeDeleted();
        this.__isCustom.aboutToBeDeleted();
        this.__peopleCount.aboutToBeDeleted();
        this.__tipAmount.aboutToBeDeleted();
        this.__totalAmount.aboutToBeDeleted();
        this.__perPerson.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __billAmount: ObservedPropertySimplePU<string>;
    get billAmount() {
        return this.__billAmount.get();
    }
    set billAmount(newValue: string) {
        this.__billAmount.set(newValue);
    }
    private __tipPercent: ObservedPropertySimplePU<number>;
    get tipPercent() {
        return this.__tipPercent.get();
    }
    set tipPercent(newValue: number) {
        this.__tipPercent.set(newValue);
    }
    private __customPercent: ObservedPropertySimplePU<string>;
    get customPercent() {
        return this.__customPercent.get();
    }
    set customPercent(newValue: string) {
        this.__customPercent.set(newValue);
    }
    private __isCustom: ObservedPropertySimplePU<boolean>;
    get isCustom() {
        return this.__isCustom.get();
    }
    set isCustom(newValue: boolean) {
        this.__isCustom.set(newValue);
    }
    private __peopleCount: ObservedPropertySimplePU<number>;
    get peopleCount() {
        return this.__peopleCount.get();
    }
    set peopleCount(newValue: number) {
        this.__peopleCount.set(newValue);
    }
    // 结果
    private __tipAmount: ObservedPropertySimplePU<string>;
    get tipAmount() {
        return this.__tipAmount.get();
    }
    set tipAmount(newValue: string) {
        this.__tipAmount.set(newValue);
    }
    private __totalAmount: ObservedPropertySimplePU<string>;
    get totalAmount() {
        return this.__totalAmount.get();
    }
    set totalAmount(newValue: string) {
        this.__totalAmount.set(newValue);
    }
    private __perPerson: ObservedPropertySimplePU<string>;
    get perPerson() {
        return this.__perPerson.get();
    }
    set perPerson(newValue: string) {
        this.__perPerson.set(newValue);
    }
    private presets: number[];
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor('#F1F3F5');
        }, Column);
        this.buildHeader.bind(this)();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Scroll.create();
            Scroll.layoutWeight(1);
            Scroll.width('100%');
        }, Scroll);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
        }, Column);
        // 账单金额
        this.buildBillInput.bind(this)();
        // 小费比例
        this.buildTipSelector.bind(this)();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            // 自定义比例
            if (this.isCustom) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.buildCustomPercent.bind(this)();
                });
            }
            // 人数选择
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        // 人数选择
        this.buildPeopleSelector.bind(this)();
        // 结果面板
        this.buildResultPanel.bind(this)();
        Column.pop();
        Scroll.pop();
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
            Text.create('小费计算');
            Text.fontSize({ "id": 16777267, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#1A1A1A');
            Text.margin({ left: 8 });
        }, Text);
        Text.pop();
        Row.pop();
    }
    buildBillInput(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.padding(16);
            Column.backgroundColor('#FFFFFF');
            Column.borderRadius(16);
            Column.border({ width: 1, color: '#EEEEEE' });
            Column.margin({ left: 16, right: 16, top: 12 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('账单金额');
            Text.fontSize({ "id": 16777266, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
            Text.fontColor('#999999');
            Text.width('100%');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.margin({ top: 8 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('¥');
            Text.fontSize({ "id": 16777233, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#1A1A1A');
            Text.margin({ right: 4 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TextInput.create({ text: this.billAmount, placeholder: '0.00' });
            TextInput.fontSize({ "id": 16777233, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
            TextInput.fontWeight(FontWeight.Bold);
            TextInput.fontColor('#1A1A1A');
            TextInput.layoutWeight(1);
            TextInput.height(52);
            TextInput.backgroundColor(Color.Transparent);
            TextInput.type(InputType.Number);
            TextInput.borderRadius(0);
            TextInput.padding(0);
            TextInput.onChange((v) => { this.billAmount = v; this.calculate(); });
        }, TextInput);
        Row.pop();
        Column.pop();
    }
    buildTipSelector(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.padding(16);
            Column.backgroundColor('#FFFFFF');
            Column.borderRadius(16);
            Column.border({ width: 1, color: '#EEEEEE' });
            Column.margin({ left: 16, right: 16, top: 12 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('小费比例');
            Text.fontSize({ "id": 16777266, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
            Text.fontColor('#999999');
            Text.width('100%');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 预设比例按钮
            Row.create();
            // 预设比例按钮
            Row.width('100%');
            // 预设比例按钮
            Row.margin({ top: 8 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const pct = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Button.createWithLabel(`${pct}%`);
                    Button.fontSize({ "id": 16777263, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
                    Button.fontColor((!this.isCustom && this.tipPercent === pct) ? Color.White : '#666666');
                    Button.backgroundColor((!this.isCustom && this.tipPercent === pct) ? '#007DFF' : '#F5F5F5');
                    Button.borderRadius(16);
                    Button.height(32);
                    Button.padding({ left: 12, right: 12 });
                    Button.margin({ right: 6 });
                    Button.border({ width: 1, color: (!this.isCustom && this.tipPercent === pct) ? '#007DFF' : '#E0E0E0' });
                    Button.onClick(() => {
                        this.isCustom = false;
                        this.tipPercent = pct;
                        this.calculate();
                    });
                }, Button);
                Button.pop();
            };
            this.forEachUpdateFunction(elmtId, this.presets, forEachItemGenFunction, (pct: number) => pct.toString(), false, false);
        }, ForEach);
        ForEach.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('自定义');
            Button.fontSize({ "id": 16777266, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
            Button.fontColor(this.isCustom ? Color.White : '#007DFF');
            Button.backgroundColor(this.isCustom ? '#007DFF' : '#F0F7FF');
            Button.borderRadius(16);
            Button.height(32);
            Button.padding({ left: 12, right: 12 });
            Button.border({ width: 1, color: '#007DFF' });
            Button.onClick(() => { this.isCustom = !this.isCustom; });
        }, Button);
        Button.pop();
        // 预设比例按钮
        Row.pop();
        Column.pop();
    }
    buildCustomPercent(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.padding(16);
            Column.backgroundColor('#FFFFFF');
            Column.borderRadius(16);
            Column.border({ width: 1, color: '#EEEEEE' });
            Column.margin({ left: 16, right: 16, top: 8 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('自定义比例 (%)');
            Text.fontSize({ "id": 16777266, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
            Text.fontColor('#999999');
            Text.width('100%');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TextInput.create({ text: this.customPercent, placeholder: '输入百分比，如 15' });
            TextInput.fontSize({ "id": 16777262, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
            TextInput.type(InputType.Number);
            TextInput.backgroundColor('#FAFAFA');
            TextInput.width('100%');
            TextInput.height(44);
            TextInput.borderRadius(8);
            TextInput.border({ width: 1, color: '#E0E0E0' });
            TextInput.padding({ left: 12, right: 12 });
            TextInput.onChange((v) => { this.customPercent = v; this.calculate(); });
        }, TextInput);
        Column.pop();
    }
    buildPeopleSelector(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.padding(16);
            Column.backgroundColor('#FFFFFF');
            Column.borderRadius(16);
            Column.border({ width: 1, color: '#EEEEEE' });
            Column.margin({ left: 16, right: 16, top: 12 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('分摊人数');
            Text.fontSize({ "id": 16777266, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
            Text.fontColor('#999999');
            Text.width('100%');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.margin({ top: 8 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithChild({ type: ButtonType.Circle });
            Button.width(40);
            Button.height(40);
            Button.backgroundColor('#F0F7FF');
            Button.onClick(() => {
                if (this.peopleCount > 1) {
                    this.peopleCount--;
                    this.calculate();
                }
            });
        }, Button);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('-');
            Text.fontSize({ "id": 16777267, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
            Text.fontColor('#007DFF');
        }, Text);
        Text.pop();
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.peopleCount.toString());
            Text.fontSize({ "id": 16777233, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#1A1A1A');
            Text.margin({ left: 24, right: 24 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithChild({ type: ButtonType.Circle });
            Button.width(40);
            Button.height(40);
            Button.backgroundColor('#F0F7FF');
            Button.onClick(() => {
                if (this.peopleCount < 99) {
                    this.peopleCount++;
                    this.calculate();
                }
            });
        }, Button);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('+');
            Text.fontSize({ "id": 16777267, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
            Text.fontColor('#007DFF');
        }, Text);
        Text.pop();
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.peopleCount > 1) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('👥 多人分摊');
                        Text.fontSize({ "id": 16777263, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
                        Text.fontColor('#FF9800');
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
        Row.pop();
        Column.pop();
    }
    buildResultPanel(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.padding(20);
            Column.backgroundColor('#FFFFFF');
            Column.borderRadius(16);
            Column.border({ width: 1, color: '#E3F2FD' });
            Column.margin({ left: 16, right: 16, top: 16, bottom: 16 });
            Column.shadow({ radius: 4, color: '#0A000000', offsetY: 2 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 小费金额
            Row.create();
            // 小费金额
            Row.width('100%');
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('💵 小费金额');
            Text.fontSize({ "id": 16777262, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
            Text.fontColor('#666666');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(`¥ ${this.tipAmount}`);
            Text.fontSize({ "id": 16777264, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#FF9800');
        }, Text);
        Text.pop();
        // 小费金额
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Divider.create();
            Divider.margin({ top: 12, bottom: 12 });
            Divider.color('#F0F0F0');
        }, Divider);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 总金额
            Row.create();
            // 总金额
            Row.width('100%');
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('💰 应付总额');
            Text.fontSize({ "id": 16777262, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
            Text.fontColor('#666666');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(`¥ ${this.totalAmount}`);
            Text.fontSize({ "id": 16777264, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#1A1A1A');
        }, Text);
        Text.pop();
        // 总金额
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.peopleCount > 1) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Divider.create();
                        Divider.margin({ top: 12, bottom: 12 });
                        Divider.color('#F0F0F0');
                    }, Divider);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Row.create();
                        Row.width('100%');
                    }, Row);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('👤 每人应付');
                        Text.fontSize({ "id": 16777262, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
                        Text.fontColor('#666666');
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Blank.create();
                    }, Blank);
                    Blank.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(`¥ ${this.perPerson}`);
                        Text.fontSize({ "id": 16777264, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
                        Text.fontWeight(FontWeight.Bold);
                        Text.fontColor('#007DFF');
                    }, Text);
                    Text.pop();
                    Row.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        Column.pop();
    }
    private calculate(): void {
        let bill = parseFloat(this.billAmount);
        if (isNaN(bill) || bill <= 0) {
            this.tipAmount = '0.00';
            this.totalAmount = '0.00';
            this.perPerson = '0.00';
            return;
        }
        let pct: number;
        if (this.isCustom) {
            pct = parseFloat(this.customPercent);
        }
        else {
            pct = this.tipPercent;
        }
        if (isNaN(pct) || pct < 0) {
            this.tipAmount = '0.00';
            this.totalAmount = bill.toFixed(2);
            this.perPerson = (bill / this.peopleCount).toFixed(2);
            return;
        }
        let tip = bill * pct / 100;
        let total = bill + tip;
        let each = total / this.peopleCount;
        this.tipAmount = tip.toFixed(2);
        this.totalAmount = total.toFixed(2);
        this.perPerson = each.toFixed(2);
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "TipPage";
    }
}
registerNamedRoute(() => new TipPage(undefined, {}), "", { bundleName: "com.example.simplecalculator", moduleName: "entry", pagePath: "pages/TipPage", pageFullPath: "entry/src/main/ets/pages/TipPage", integratedHsp: "false", moduleType: "followWithHap" });
