if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface MortgagePage_Params {
    loanAmount?: string;
    annualRate?: string;
    loanYears?: number;
    downPayment?: string;
    totalPrice?: string;
    useTotalPrice?: boolean;
    monthlyPayment?: string;
    totalPayment?: string;
    totalInterest?: string;
    firstMonthInterest?: string;
    firstMonthPrincipal?: string;
    interestRatio?: number;
    showResult?: boolean;
    yearOptions?: number[];
}
import router from "@ohos:router";
class MortgagePage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__loanAmount = new ObservedPropertySimplePU('1000000', this, "loanAmount");
        this.__annualRate = new ObservedPropertySimplePU('4.2', this, "annualRate");
        this.__loanYears = new ObservedPropertySimplePU(30, this, "loanYears");
        this.__downPayment = new ObservedPropertySimplePU('30', this, "downPayment");
        this.__totalPrice = new ObservedPropertySimplePU('', this, "totalPrice");
        this.__useTotalPrice = new ObservedPropertySimplePU(false, this, "useTotalPrice");
        this.__monthlyPayment = new ObservedPropertySimplePU('0', this, "monthlyPayment");
        this.__totalPayment = new ObservedPropertySimplePU('0', this, "totalPayment");
        this.__totalInterest = new ObservedPropertySimplePU('0', this, "totalInterest");
        this.__firstMonthInterest = new ObservedPropertySimplePU('0', this, "firstMonthInterest");
        this.__firstMonthPrincipal = new ObservedPropertySimplePU('0', this, "firstMonthPrincipal");
        this.__interestRatio = new ObservedPropertySimplePU(0, this, "interestRatio");
        this.__showResult = new ObservedPropertySimplePU(false, this, "showResult");
        this.yearOptions = [1, 3, 5, 10, 15, 20, 25, 30];
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: MortgagePage_Params) {
        if (params.loanAmount !== undefined) {
            this.loanAmount = params.loanAmount;
        }
        if (params.annualRate !== undefined) {
            this.annualRate = params.annualRate;
        }
        if (params.loanYears !== undefined) {
            this.loanYears = params.loanYears;
        }
        if (params.downPayment !== undefined) {
            this.downPayment = params.downPayment;
        }
        if (params.totalPrice !== undefined) {
            this.totalPrice = params.totalPrice;
        }
        if (params.useTotalPrice !== undefined) {
            this.useTotalPrice = params.useTotalPrice;
        }
        if (params.monthlyPayment !== undefined) {
            this.monthlyPayment = params.monthlyPayment;
        }
        if (params.totalPayment !== undefined) {
            this.totalPayment = params.totalPayment;
        }
        if (params.totalInterest !== undefined) {
            this.totalInterest = params.totalInterest;
        }
        if (params.firstMonthInterest !== undefined) {
            this.firstMonthInterest = params.firstMonthInterest;
        }
        if (params.firstMonthPrincipal !== undefined) {
            this.firstMonthPrincipal = params.firstMonthPrincipal;
        }
        if (params.interestRatio !== undefined) {
            this.interestRatio = params.interestRatio;
        }
        if (params.showResult !== undefined) {
            this.showResult = params.showResult;
        }
        if (params.yearOptions !== undefined) {
            this.yearOptions = params.yearOptions;
        }
    }
    updateStateVars(params: MortgagePage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__loanAmount.purgeDependencyOnElmtId(rmElmtId);
        this.__annualRate.purgeDependencyOnElmtId(rmElmtId);
        this.__loanYears.purgeDependencyOnElmtId(rmElmtId);
        this.__downPayment.purgeDependencyOnElmtId(rmElmtId);
        this.__totalPrice.purgeDependencyOnElmtId(rmElmtId);
        this.__useTotalPrice.purgeDependencyOnElmtId(rmElmtId);
        this.__monthlyPayment.purgeDependencyOnElmtId(rmElmtId);
        this.__totalPayment.purgeDependencyOnElmtId(rmElmtId);
        this.__totalInterest.purgeDependencyOnElmtId(rmElmtId);
        this.__firstMonthInterest.purgeDependencyOnElmtId(rmElmtId);
        this.__firstMonthPrincipal.purgeDependencyOnElmtId(rmElmtId);
        this.__interestRatio.purgeDependencyOnElmtId(rmElmtId);
        this.__showResult.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__loanAmount.aboutToBeDeleted();
        this.__annualRate.aboutToBeDeleted();
        this.__loanYears.aboutToBeDeleted();
        this.__downPayment.aboutToBeDeleted();
        this.__totalPrice.aboutToBeDeleted();
        this.__useTotalPrice.aboutToBeDeleted();
        this.__monthlyPayment.aboutToBeDeleted();
        this.__totalPayment.aboutToBeDeleted();
        this.__totalInterest.aboutToBeDeleted();
        this.__firstMonthInterest.aboutToBeDeleted();
        this.__firstMonthPrincipal.aboutToBeDeleted();
        this.__interestRatio.aboutToBeDeleted();
        this.__showResult.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __loanAmount: ObservedPropertySimplePU<string>;
    get loanAmount() {
        return this.__loanAmount.get();
    }
    set loanAmount(newValue: string) {
        this.__loanAmount.set(newValue);
    }
    private __annualRate: ObservedPropertySimplePU<string>;
    get annualRate() {
        return this.__annualRate.get();
    }
    set annualRate(newValue: string) {
        this.__annualRate.set(newValue);
    }
    private __loanYears: ObservedPropertySimplePU<number>;
    get loanYears() {
        return this.__loanYears.get();
    }
    set loanYears(newValue: number) {
        this.__loanYears.set(newValue);
    }
    private __downPayment: ObservedPropertySimplePU<string>;
    get downPayment() {
        return this.__downPayment.get();
    }
    set downPayment(newValue: string) {
        this.__downPayment.set(newValue);
    }
    private __totalPrice: ObservedPropertySimplePU<string>;
    get totalPrice() {
        return this.__totalPrice.get();
    }
    set totalPrice(newValue: string) {
        this.__totalPrice.set(newValue);
    }
    private __useTotalPrice: ObservedPropertySimplePU<boolean>;
    get useTotalPrice() {
        return this.__useTotalPrice.get();
    }
    set useTotalPrice(newValue: boolean) {
        this.__useTotalPrice.set(newValue);
    }
    // 结果
    private __monthlyPayment: ObservedPropertySimplePU<string>;
    get monthlyPayment() {
        return this.__monthlyPayment.get();
    }
    set monthlyPayment(newValue: string) {
        this.__monthlyPayment.set(newValue);
    }
    private __totalPayment: ObservedPropertySimplePU<string>;
    get totalPayment() {
        return this.__totalPayment.get();
    }
    set totalPayment(newValue: string) {
        this.__totalPayment.set(newValue);
    }
    private __totalInterest: ObservedPropertySimplePU<string>;
    get totalInterest() {
        return this.__totalInterest.get();
    }
    set totalInterest(newValue: string) {
        this.__totalInterest.set(newValue);
    }
    private __firstMonthInterest: ObservedPropertySimplePU<string>;
    get firstMonthInterest() {
        return this.__firstMonthInterest.get();
    }
    set firstMonthInterest(newValue: string) {
        this.__firstMonthInterest.set(newValue);
    }
    private __firstMonthPrincipal: ObservedPropertySimplePU<string>;
    get firstMonthPrincipal() {
        return this.__firstMonthPrincipal.get();
    }
    set firstMonthPrincipal(newValue: string) {
        this.__firstMonthPrincipal.set(newValue);
    }
    private __interestRatio: ObservedPropertySimplePU<number>;
    get interestRatio() {
        return this.__interestRatio.get();
    }
    set interestRatio(newValue: number) {
        this.__interestRatio.set(newValue);
    }
    private __showResult: ObservedPropertySimplePU<boolean>;
    get showResult() {
        return this.__showResult.get();
    }
    set showResult(newValue: boolean) {
        this.__showResult.set(newValue);
    }
    private yearOptions: number[];
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
        // 计算方式切换
        this.buildModeToggle.bind(this)();
        // 输入区域
        this.buildInputs.bind(this)();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 计算按钮
            Button.createWithLabel('开始计算');
            // 计算按钮
            Button.fontSize({ "id": 16777262, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
            // 计算按钮
            Button.fontColor(Color.White);
            // 计算按钮
            Button.backgroundColor('#007DFF');
            // 计算按钮
            Button.width('100%');
            // 计算按钮
            Button.height(48);
            // 计算按钮
            Button.borderRadius(12);
            // 计算按钮
            Button.margin({ top: 12, left: 16, right: 16 });
            // 计算按钮
            Button.onClick(() => { this.calculate(); });
        }, Button);
        // 计算按钮
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            // 结果展示
            if (this.showResult) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.buildResultPanel.bind(this)();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
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
            Text.create('房贷计算');
            Text.fontSize({ "id": 16777267, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#1A1A1A');
            Text.margin({ left: 8 });
        }, Text);
        Text.pop();
        Row.pop();
    }
    buildModeToggle(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.justifyContent(FlexAlign.Center);
            Row.padding({ top: 12, bottom: 8 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('按贷款金额');
            Button.fontSize({ "id": 16777263, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
            Button.fontColor(!this.useTotalPrice ? Color.White : '#666666');
            Button.backgroundColor(!this.useTotalPrice ? '#007DFF' : '#F5F5F5');
            Button.borderRadius(20);
            Button.height(36);
            Button.padding({ left: 16, right: 16 });
            Button.border({ width: 1, color: !this.useTotalPrice ? '#007DFF' : '#E0E0E0' });
            Button.onClick(() => { this.useTotalPrice = false; });
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('按房屋总价');
            Button.fontSize({ "id": 16777263, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
            Button.fontColor(this.useTotalPrice ? Color.White : '#666666');
            Button.backgroundColor(this.useTotalPrice ? '#007DFF' : '#F5F5F5');
            Button.borderRadius(20);
            Button.height(36);
            Button.padding({ left: 16, right: 16 });
            Button.margin({ left: 8 });
            Button.border({ width: 1, color: this.useTotalPrice ? '#007DFF' : '#E0E0E0' });
            Button.onClick(() => { this.useTotalPrice = true; });
        }, Button);
        Button.pop();
        Row.pop();
    }
    buildInputs(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.padding({ left: 16, right: 16 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.useTotalPrice) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.buildInputRow.bind(this)('房屋总价', this.totalPrice, '万元', (v) => { this.totalPrice = v; });
                    this.buildInputRow.bind(this)('首付比例', this.downPayment, '%', (v) => { this.downPayment = v; });
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.buildInputRow.bind(this)('贷款金额', this.loanAmount, '万元', (v) => { this.loanAmount = v; });
                });
            }
        }, If);
        If.pop();
        this.buildInputRow.bind(this)('年利率', this.annualRate, '%', (v) => { this.annualRate = v; });
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 贷款年限
            Column.create();
            // 贷款年限
            Column.width('100%');
            // 贷款年限
            Column.padding(16);
            // 贷款年限
            Column.backgroundColor('#FFFFFF');
            // 贷款年限
            Column.borderRadius(16);
            // 贷款年限
            Column.border({ width: 1, color: '#EEEEEE' });
            // 贷款年限
            Column.margin({ bottom: 12 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('贷款年限');
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
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const yr = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Button.createWithLabel(`${yr}年`);
                    Button.fontSize({ "id": 16777266, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
                    Button.fontColor(this.loanYears === yr ? Color.White : '#666666');
                    Button.backgroundColor(this.loanYears === yr ? '#007DFF' : '#F5F5F5');
                    Button.borderRadius(16);
                    Button.height(32);
                    Button.padding({ left: 10, right: 10 });
                    Button.margin({ right: 6 });
                    Button.border({ width: 1, color: this.loanYears === yr ? '#007DFF' : '#E0E0E0' });
                    Button.onClick(() => { this.loanYears = yr; });
                }, Button);
                Button.pop();
            };
            this.forEachUpdateFunction(elmtId, this.yearOptions, forEachItemGenFunction, (yr: number) => yr.toString(), false, false);
        }, ForEach);
        ForEach.pop();
        Row.pop();
        // 贷款年限
        Column.pop();
        Column.pop();
    }
    buildInputRow(label: string, value: string, unit: string, onChange: (v: string) => void, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.padding(16);
            Column.backgroundColor('#FFFFFF');
            Column.borderRadius(16);
            Column.border({ width: 1, color: '#EEEEEE' });
            Column.margin({ bottom: 12 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(label);
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
            TextInput.create({ text: value, placeholder: '0' });
            TextInput.fontSize({ "id": 16777233, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
            TextInput.fontWeight(FontWeight.Bold);
            TextInput.textAlign(TextAlign.Center);
            TextInput.type(InputType.Number);
            TextInput.backgroundColor('#FAFAFA');
            TextInput.layoutWeight(1);
            TextInput.height(52);
            TextInput.borderRadius(8);
            TextInput.border({ width: 1, color: '#E0E0E0' });
            TextInput.onChange(onChange);
        }, TextInput);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(unit);
            Text.fontSize({ "id": 16777262, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
            Text.fontColor('#666666');
            Text.margin({ left: 12 });
            Text.width(52);
        }, Text);
        Text.pop();
        Row.pop();
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
            Column.margin({ left: 16, right: 16, top: 16, bottom: 16 });
            Column.shadow({ radius: 4, color: '#0A000000', offsetY: 2 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 月供大字
            Text.create('月供（每月）');
            // 月供大字
            Text.fontSize({ "id": 16777263, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
            // 月供大字
            Text.fontColor('#999999');
        }, Text);
        // 月供大字
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.margin({ top: 4 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('¥');
            Text.fontSize(24);
            Text.fontColor('#007DFF');
            Text.fontWeight(FontWeight.Bold);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.monthlyPayment);
            Text.fontSize(40);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#007DFF');
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 明细
            Row.create();
            // 明细
            Row.width('100%');
            // 明细
            Row.margin({ top: 16 });
        }, Row);
        this.buildDetailItem.bind(this)('贷款总额', `¥${this.getLoanPrincipal()}万`, '#1A1A1A');
        this.buildDetailItem.bind(this)('还款总额', `¥${this.totalPayment}万`, '#1A1A1A');
        // 明细
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.margin({ top: 8 });
        }, Row);
        this.buildDetailItem.bind(this)('支付利息', `¥${this.totalInterest}万`, '#FF5722');
        this.buildDetailItem.bind(this)('贷款年限', `${this.loanYears} 年`, '#666666');
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Divider.create();
            Divider.margin({ top: 16, bottom: 16 });
            Divider.color('#F0F0F0');
        }, Divider);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 首月还款构成
            Text.create('首月还款构成');
            // 首月还款构成
            Text.fontSize({ "id": 16777263, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
            // 首月还款构成
            Text.fontColor('#999999');
            // 首月还款构成
            Text.width('100%');
        }, Text);
        // 首月还款构成
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.margin({ top: 8 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(`本金 ¥${this.firstMonthPrincipal}`);
            Text.fontSize({ "id": 16777263, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
            Text.fontColor('#4CAF50');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(`利息 ¥${this.firstMonthInterest}`);
            Text.fontSize({ "id": 16777263, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
            Text.fontColor('#FF9800');
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 比例条
            Row.create();
            // 比例条
            Row.width('100%');
            // 比例条
            Row.margin({ top: 4 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('本金');
            Text.fontSize(10);
            Text.fontColor(Color.White);
            Text.width(`${((1 - this.interestRatio) * 100).toFixed(1)}%`);
            Text.height(20);
            Text.backgroundColor('#4CAF50');
            Text.borderRadius({ topLeft: 10, bottomLeft: 10 });
            Text.textAlign(TextAlign.Center);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('利息');
            Text.fontSize(10);
            Text.fontColor(Color.White);
            Text.width(`${(this.interestRatio * 100).toFixed(1)}%`);
            Text.height(20);
            Text.backgroundColor('#FF9800');
            Text.borderRadius({ topRight: 10, bottomRight: 10 });
            Text.textAlign(TextAlign.Center);
        }, Text);
        Text.pop();
        // 比例条
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 利息占比
            Text.create(`贷款总利息占比 ${(this.interestRatio * 100).toFixed(1)}%`);
            // 利息占比
            Text.fontSize({ "id": 16777266, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
            // 利息占比
            Text.fontColor('#999999');
            // 利息占比
            Text.margin({ top: 8 });
        }, Text);
        // 利息占比
        Text.pop();
        Column.pop();
    }
    buildDetailItem(label: string, value: string, color: string, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('50%');
            Column.alignItems(HorizontalAlign.Center);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(label);
            Text.fontSize({ "id": 16777266, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
            Text.fontColor('#999999');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(value);
            Text.fontSize({ "id": 16777262, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor(color);
            Text.margin({ top: 4 });
        }, Text);
        Text.pop();
        Column.pop();
    }
    // ==================== 计算方法 ====================
    private calculate(): void {
        let principal: number;
        if (this.useTotalPrice) {
            let total = parseFloat(this.totalPrice);
            let downPct = parseFloat(this.downPayment);
            if (isNaN(total) || isNaN(downPct) || total <= 0) {
                this.showResult = false;
                return;
            }
            principal = total * (1 - downPct / 100);
        }
        else {
            principal = parseFloat(this.loanAmount);
        }
        let rate = parseFloat(this.annualRate);
        if (isNaN(principal) || isNaN(rate) || principal <= 0 || rate <= 0) {
            this.showResult = false;
            return;
        }
        let monthlyRate = rate / 100 / 12;
        let months = this.loanYears * 12;
        // 等额本息公式: M = P * r * (1+r)^n / ((1+r)^n - 1)
        let pow = Math.pow(1 + monthlyRate, months);
        let monthly = principal * monthlyRate * pow / (pow - 1);
        let monthlyYuan = monthly * 10000; // 万 → 元
        let totalPayments = monthly * months;
        let totalInterestWan = totalPayments - principal;
        let firstMonthInterest = principal * monthlyRate * 10000;
        let firstMonthPrincipal = monthlyYuan - firstMonthInterest;
        let interestRatio = totalInterestWan / totalPayments;
        this.monthlyPayment = monthlyYuan.toFixed(2);
        this.totalPayment = totalPayments.toFixed(2);
        this.totalInterest = totalInterestWan.toFixed(2);
        this.firstMonthInterest = firstMonthInterest.toFixed(2);
        this.firstMonthPrincipal = firstMonthPrincipal.toFixed(2);
        this.interestRatio = interestRatio;
        this.showResult = true;
    }
    private getLoanPrincipal(): string {
        if (this.useTotalPrice) {
            let total = parseFloat(this.totalPrice) || 0;
            let downPct = parseFloat(this.downPayment) || 0;
            return (total * (1 - downPct / 100)).toFixed(2);
        }
        return parseFloat(this.loanAmount).toFixed(2);
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "MortgagePage";
    }
}
registerNamedRoute(() => new MortgagePage(undefined, {}), "", { bundleName: "com.example.simplecalculator", moduleName: "entry", pagePath: "pages/MortgagePage", pageFullPath: "entry/src/main/ets/pages/MortgagePage", integratedHsp: "false", moduleType: "followWithHap" });
