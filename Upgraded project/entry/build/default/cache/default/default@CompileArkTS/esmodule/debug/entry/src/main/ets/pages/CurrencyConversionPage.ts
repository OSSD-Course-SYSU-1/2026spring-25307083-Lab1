if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface CurrencyConversionPage_Params {
    currencies?: CurrencyDef[];
    fromCurrencyIndex?: number;
    toCurrencyIndex?: number;
    inputValue?: string;
    outputValue?: string;
    showFromPicker?: boolean;
    showToPicker?: boolean;
    inputFocused?: boolean;
}
import router from "@ohos:router";
/**
 * 币种定义
 */
class CurrencyDef {
    code: string;
    name: string;
    symbol: string;
    rate: number; // 相对于人民币(CNY)的汇率
    constructor(code: string, name: string, symbol: string, rate: number) {
        this.code = code;
        this.name = name;
        this.symbol = symbol;
        this.rate = rate;
    }
}
class CurrencyConversionPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__currencies = new ObservedPropertyObjectPU([
            new CurrencyDef('CNY', '人民币', '¥', 1),
            new CurrencyDef('USD', '美元', '$', 0.138),
            new CurrencyDef('EUR', '欧元', '€', 0.127),
            new CurrencyDef('JPY', '日元', '¥', 20.72),
            new CurrencyDef('GBP', '英镑', '£', 0.109),
            new CurrencyDef('HKD', '港币', 'HK$', 1.08),
            new CurrencyDef('KRW', '韩元', '₩', 184.5),
            new CurrencyDef('AUD', '澳元', 'A$', 0.212),
            new CurrencyDef('CAD', '加元', 'C$', 0.188),
            new CurrencyDef('CHF', '瑞士法郎', 'CHF', 0.123),
            new CurrencyDef('SGD', '新加坡元', 'S$', 0.185),
            new CurrencyDef('TWD', '新台币', 'NT$', 4.42),
            new CurrencyDef('THB', '泰铢', '฿', 4.98),
            new CurrencyDef('RUB', '卢布', '₽', 12.57),
            new CurrencyDef('INR', '印度卢比', '₹', 11.53),
        ], this, "currencies");
        this.__fromCurrencyIndex = new ObservedPropertySimplePU(0, this, "fromCurrencyIndex");
        this.__toCurrencyIndex = new ObservedPropertySimplePU(1, this, "toCurrencyIndex");
        this.__inputValue = new ObservedPropertySimplePU('100', this, "inputValue");
        this.__outputValue = new ObservedPropertySimplePU('', this, "outputValue");
        this.__showFromPicker = new ObservedPropertySimplePU(false, this, "showFromPicker");
        this.__showToPicker = new ObservedPropertySimplePU(false, this, "showToPicker");
        this.__inputFocused = new ObservedPropertySimplePU(false, this, "inputFocused");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: CurrencyConversionPage_Params) {
        if (params.currencies !== undefined) {
            this.currencies = params.currencies;
        }
        if (params.fromCurrencyIndex !== undefined) {
            this.fromCurrencyIndex = params.fromCurrencyIndex;
        }
        if (params.toCurrencyIndex !== undefined) {
            this.toCurrencyIndex = params.toCurrencyIndex;
        }
        if (params.inputValue !== undefined) {
            this.inputValue = params.inputValue;
        }
        if (params.outputValue !== undefined) {
            this.outputValue = params.outputValue;
        }
        if (params.showFromPicker !== undefined) {
            this.showFromPicker = params.showFromPicker;
        }
        if (params.showToPicker !== undefined) {
            this.showToPicker = params.showToPicker;
        }
        if (params.inputFocused !== undefined) {
            this.inputFocused = params.inputFocused;
        }
    }
    updateStateVars(params: CurrencyConversionPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__currencies.purgeDependencyOnElmtId(rmElmtId);
        this.__fromCurrencyIndex.purgeDependencyOnElmtId(rmElmtId);
        this.__toCurrencyIndex.purgeDependencyOnElmtId(rmElmtId);
        this.__inputValue.purgeDependencyOnElmtId(rmElmtId);
        this.__outputValue.purgeDependencyOnElmtId(rmElmtId);
        this.__showFromPicker.purgeDependencyOnElmtId(rmElmtId);
        this.__showToPicker.purgeDependencyOnElmtId(rmElmtId);
        this.__inputFocused.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__currencies.aboutToBeDeleted();
        this.__fromCurrencyIndex.aboutToBeDeleted();
        this.__toCurrencyIndex.aboutToBeDeleted();
        this.__inputValue.aboutToBeDeleted();
        this.__outputValue.aboutToBeDeleted();
        this.__showFromPicker.aboutToBeDeleted();
        this.__showToPicker.aboutToBeDeleted();
        this.__inputFocused.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __currencies: ObservedPropertyObjectPU<CurrencyDef[]>;
    get currencies() {
        return this.__currencies.get();
    }
    set currencies(newValue: CurrencyDef[]) {
        this.__currencies.set(newValue);
    }
    private __fromCurrencyIndex: ObservedPropertySimplePU<number>; // 默认人民币
    get fromCurrencyIndex() {
        return this.__fromCurrencyIndex.get();
    }
    set fromCurrencyIndex(newValue: number) {
        this.__fromCurrencyIndex.set(newValue);
    }
    private __toCurrencyIndex: ObservedPropertySimplePU<number>; // 默认美元
    get toCurrencyIndex() {
        return this.__toCurrencyIndex.get();
    }
    set toCurrencyIndex(newValue: number) {
        this.__toCurrencyIndex.set(newValue);
    }
    private __inputValue: ObservedPropertySimplePU<string>;
    get inputValue() {
        return this.__inputValue.get();
    }
    set inputValue(newValue: string) {
        this.__inputValue.set(newValue);
    }
    private __outputValue: ObservedPropertySimplePU<string>;
    get outputValue() {
        return this.__outputValue.get();
    }
    set outputValue(newValue: string) {
        this.__outputValue.set(newValue);
    }
    private __showFromPicker: ObservedPropertySimplePU<boolean>;
    get showFromPicker() {
        return this.__showFromPicker.get();
    }
    set showFromPicker(newValue: boolean) {
        this.__showFromPicker.set(newValue);
    }
    private __showToPicker: ObservedPropertySimplePU<boolean>;
    get showToPicker() {
        return this.__showToPicker.get();
    }
    set showToPicker(newValue: boolean) {
        this.__showToPicker.set(newValue);
    }
    private __inputFocused: ObservedPropertySimplePU<boolean>;
    get inputFocused() {
        return this.__inputFocused.get();
    }
    set inputFocused(newValue: boolean) {
        this.__inputFocused.set(newValue);
    }
    aboutToAppear(): void {
        this.doConversion();
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create();
            Stack.width('100%');
            Stack.height('100%');
        }, Stack);
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
            Column.padding({ left: 16, right: 16, top: 16, bottom: 16 });
            Column.width('100%');
        }, Column);
        // 源币种
        this.buildCurrencyPanel.bind(this)('持有', this.fromCurrencyIndex, this.inputValue, true, () => { this.showFromPicker = true; }, (val: string) => {
            this.inputValue = val;
            this.doConversion();
        });
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 交换按钮
            Row.create();
            // 交换按钮
            Row.width('100%');
            // 交换按钮
            Row.justifyContent(FlexAlign.Center);
            // 交换按钮
            Row.margin({ top: 8, bottom: 8 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithChild();
            Button.backgroundColor('#F0F7FF');
            Button.borderRadius(20);
            Button.height(36);
            Button.padding({ left: 16, right: 16 });
            Button.border({ width: 1, color: '#007DFF' });
            Button.onClick(() => {
                let temp = this.fromCurrencyIndex;
                this.fromCurrencyIndex = this.toCurrencyIndex;
                this.toCurrencyIndex = temp;
                this.doConversion();
            });
        }, Button);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('⇅ 交换币种');
            Text.fontSize({ "id": 16777263, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
            Text.fontColor('#007DFF');
        }, Text);
        Text.pop();
        Button.pop();
        // 交换按钮
        Row.pop();
        // 目标币种
        this.buildCurrencyPanel.bind(this)('兑换', this.toCurrencyIndex, this.outputValue, false, () => { this.showToPicker = true; }, () => { });
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 汇率为参考值提示
            Text.create('* 汇率为参考值，实际以银行公布为准');
            // 汇率为参考值提示
            Text.fontSize({ "id": 16777266, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
            // 汇率为参考值提示
            Text.fontColor('#BBBBBB');
            // 汇率为参考值提示
            Text.margin({ top: 8 });
            // 汇率为参考值提示
            Text.textAlign(TextAlign.Center);
        }, Text);
        // 汇率为参考值提示
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 汇率信息
            Text.create(this.getRateInfo());
            // 汇率信息
            Text.fontSize({ "id": 16777265, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
            // 汇率信息
            Text.fontColor('#666666');
            // 汇率信息
            Text.margin({ top: 4 });
            // 汇率信息
            Text.textAlign(TextAlign.Center);
        }, Text);
        // 汇率信息
        Text.pop();
        Column.pop();
        Scroll.pop();
        // 数字键盘
        this.buildNumberPad.bind(this)();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            // 币种选择弹窗 - 覆盖层
            if (this.showFromPicker || this.showToPicker) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.buildCurrencyPicker.bind(this)();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        Stack.pop();
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
            Text.create('汇率换算');
            Text.fontSize({ "id": 16777267, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#1A1A1A');
            Text.margin({ left: 8 });
        }, Text);
        Text.pop();
        Row.pop();
    }
    buildCurrencyPanel(label: string, currencyIndex: number, displayValue: string, editable: boolean, onCurrencyClick: () => void, onInput: (val: string) => void, parent = null) {
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
            // 币种选择按钮
            Button.createWithChild();
            // 币种选择按钮
            Button.backgroundColor('#F5F5F5');
            // 币种选择按钮
            Button.borderRadius(8);
            // 币种选择按钮
            Button.height(40);
            // 币种选择按钮
            Button.padding({ left: 12, right: 12 });
            // 币种选择按钮
            Button.onClick(onCurrencyClick);
        }, Button);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.currencies[currencyIndex].code);
            Text.fontSize({ "id": 16777262, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#1A1A1A');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('▼');
            Text.fontSize(10);
            Text.fontColor('#999999');
            Text.margin({ left: 4 });
        }, Text);
        Text.pop();
        Row.pop();
        // 币种选择按钮
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 金额显示/输入
            TextInput.create({ text: displayValue, placeholder: '0' });
            // 金额显示/输入
            TextInput.fontSize({ "id": 16777233, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
            // 金额显示/输入
            TextInput.fontWeight(FontWeight.Bold);
            // 金额显示/输入
            TextInput.fontColor(editable ? '#1A1A1A' : '#007DFF');
            // 金额显示/输入
            TextInput.enabled(editable);
            // 金额显示/输入
            TextInput.backgroundColor(Color.Transparent);
            // 金额显示/输入
            TextInput.textAlign(TextAlign.End);
            // 金额显示/输入
            TextInput.borderRadius(0);
            // 金额显示/输入
            TextInput.width('60%');
            // 金额显示/输入
            TextInput.padding(0);
            // 金额显示/输入
            TextInput.onChange((val: string) => {
                onInput(val);
            });
            // 金额显示/输入
            TextInput.type(InputType.Number);
        }, TextInput);
        Row.pop();
        Column.pop();
    }
    buildNumberPad(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.backgroundColor('#FFFFFF');
            Column.padding({ top: 8, bottom: 8 });
            Column.border({ width: { top: 1 }, color: '#EEEEEE' });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.padding({ left: 12, right: 12, bottom: 4 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('C');
            Button.fontSize({ "id": 16777234, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
            Button.fontColor('#FF5252');
            Button.backgroundColor('#FFF0F0');
            Button.layoutWeight(1);
            Button.height({ "id": 16777238, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
            Button.borderRadius(8);
            Button.margin({ right: 4 });
            Button.onClick(() => {
                this.inputValue = '';
                this.outputValue = '';
            });
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('⌫');
            Button.fontSize({ "id": 16777234, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
            Button.fontColor('#FF9800');
            Button.backgroundColor('#FFF8E1');
            Button.layoutWeight(1);
            Button.height({ "id": 16777238, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
            Button.borderRadius(8);
            Button.margin({ left: 4 });
            Button.onClick(() => {
                if (this.inputValue.length > 0) {
                    this.inputValue = this.inputValue.slice(0, -1);
                    this.doConversion();
                }
            });
        }, Button);
        Button.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.padding({ left: 8, right: 8, bottom: 4 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const n = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Button.createWithLabel(n);
                    Button.fontSize({ "id": 16777234, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
                    Button.fontColor('#1A1A1A');
                    Button.backgroundColor('#F5F5F5');
                    Button.layoutWeight(1);
                    Button.height({ "id": 16777238, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
                    Button.borderRadius(8);
                    Button.margin({ left: 4, right: 4 });
                    Button.onClick(() => { this.appendNumber(n); });
                }, Button);
                Button.pop();
            };
            this.forEachUpdateFunction(elmtId, ['7', '8', '9'], forEachItemGenFunction);
        }, ForEach);
        ForEach.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.padding({ left: 8, right: 8, bottom: 4 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const n = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Button.createWithLabel(n);
                    Button.fontSize({ "id": 16777234, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
                    Button.fontColor('#1A1A1A');
                    Button.backgroundColor('#F5F5F5');
                    Button.layoutWeight(1);
                    Button.height({ "id": 16777238, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
                    Button.borderRadius(8);
                    Button.margin({ left: 4, right: 4 });
                    Button.onClick(() => { this.appendNumber(n); });
                }, Button);
                Button.pop();
            };
            this.forEachUpdateFunction(elmtId, ['4', '5', '6'], forEachItemGenFunction);
        }, ForEach);
        ForEach.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.padding({ left: 8, right: 8, bottom: 4 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const n = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Button.createWithLabel(n);
                    Button.fontSize({ "id": 16777234, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
                    Button.fontColor('#1A1A1A');
                    Button.backgroundColor('#F5F5F5');
                    Button.layoutWeight(1);
                    Button.height({ "id": 16777238, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
                    Button.borderRadius(8);
                    Button.margin({ left: 4, right: 4 });
                    Button.onClick(() => { this.appendNumber(n); });
                }, Button);
                Button.pop();
            };
            this.forEachUpdateFunction(elmtId, ['1', '2', '3'], forEachItemGenFunction);
        }, ForEach);
        ForEach.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.padding({ left: 8, right: 8, bottom: 8 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('.');
            Button.fontSize({ "id": 16777234, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
            Button.fontColor('#1A1A1A');
            Button.backgroundColor('#F5F5F5');
            Button.layoutWeight(1);
            Button.height({ "id": 16777238, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
            Button.borderRadius(8);
            Button.margin({ left: 4, right: 4 });
            Button.onClick(() => { this.appendNumber('.'); });
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('0');
            Button.fontSize({ "id": 16777234, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
            Button.fontColor('#1A1A1A');
            Button.backgroundColor('#F5F5F5');
            Button.layoutWeight(1);
            Button.height({ "id": 16777238, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
            Button.borderRadius(8);
            Button.margin({ left: 4, right: 4 });
            Button.onClick(() => { this.appendNumber('0'); });
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('00');
            Button.fontSize({ "id": 16777234, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
            Button.fontColor('#1A1A1A');
            Button.backgroundColor('#F5F5F5');
            Button.layoutWeight(1);
            Button.height({ "id": 16777238, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
            Button.borderRadius(8);
            Button.margin({ left: 4, right: 4 });
            Button.onClick(() => { this.appendNumber('00'); });
        }, Button);
        Button.pop();
        Row.pop();
        Column.pop();
    }
    buildCurrencyPicker(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.height('100%');
            Column.justifyContent(FlexAlign.Center);
            Column.backgroundColor('#50000000');
            Column.position({ x: 0, y: 0 });
            Column.onClick(() => { this.showFromPicker = false; this.showToPicker = false; });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('85%');
            Column.padding(20);
            Column.backgroundColor(Color.White);
            Column.borderRadius(16);
            Column.shadow({ radius: 20, color: '#30000000' });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('选择币种');
            Text.fontSize({ "id": 16777268, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
            Text.fontWeight(FontWeight.Bold);
            Text.margin({ bottom: 12 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            List.create();
            List.constraintSize({ maxHeight: 350 });
        }, List);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = (_item, index: number) => {
                const currency = _item;
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
                        ListItem.border({ width: { bottom: 1 }, color: '#F0F0F0' });
                    };
                    const deepRenderFunction = (elmtId, isInitialRender) => {
                        itemCreation(elmtId, isInitialRender);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Row.create();
                            Row.width('100%');
                            Row.padding({ top: 14, bottom: 14, left: 16, right: 16 });
                            Row.onClick(() => {
                                if (this.showFromPicker) {
                                    this.fromCurrencyIndex = index;
                                }
                                else {
                                    this.toCurrencyIndex = index;
                                }
                                this.doConversion();
                                this.showFromPicker = false;
                                this.showToPicker = false;
                            });
                        }, Row);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Column.create();
                            Column.alignItems(HorizontalAlign.Start);
                            Column.layoutWeight(1);
                        }, Column);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create(currency.code);
                            Text.fontSize({ "id": 16777262, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
                            Text.fontWeight(FontWeight.Bold);
                            Text.fontColor('#1A1A1A');
                        }, Text);
                        Text.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create(currency.name);
                            Text.fontSize({ "id": 16777266, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
                            Text.fontColor('#999999');
                        }, Text);
                        Text.pop();
                        Column.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            If.create();
                            if ((this.showFromPicker && index === this.fromCurrencyIndex) ||
                                (this.showToPicker && index === this.toCurrencyIndex)) {
                                this.ifElseBranchUpdateFunction(0, () => {
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        Text.create('✓');
                                        Text.fontSize({ "id": 16777234, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
                                        Text.fontColor('#007DFF');
                                        Text.fontWeight(FontWeight.Bold);
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
                        ListItem.pop();
                    };
                    this.observeComponentCreation2(itemCreation2, ListItem);
                    ListItem.pop();
                }
            };
            this.forEachUpdateFunction(elmtId, this.currencies, forEachItemGenFunction, undefined, true, false);
        }, ForEach);
        ForEach.pop();
        List.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('取消');
            Button.fontSize({ "id": 16777263, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
            Button.fontColor('#999999');
            Button.backgroundColor('#F5F5F5');
            Button.width('100%');
            Button.height(40);
            Button.borderRadius(8);
            Button.margin({ top: 8 });
            Button.onClick(() => { this.showFromPicker = false; this.showToPicker = false; });
        }, Button);
        Button.pop();
        Column.pop();
        Column.pop();
    }
    private appendNumber(num: string): void {
        if (num === '.' && this.inputValue.indexOf('.') !== -1)
            return;
        if (this.inputValue === '0' && num !== '.') {
            this.inputValue = num;
        }
        else {
            this.inputValue += num;
        }
        this.doConversion();
    }
    private doConversion(): void {
        let val = parseFloat(this.inputValue);
        if (isNaN(val) || this.inputValue === '') {
            this.outputValue = '';
            return;
        }
        let fromRate = this.currencies[this.fromCurrencyIndex].rate;
        let toRate = this.currencies[this.toCurrencyIndex].rate;
        let cnyValue = val / fromRate;
        let result = cnyValue * toRate;
        this.outputValue = this.formatNum(result);
    }
    private getRateInfo(): string {
        let from = this.currencies[this.fromCurrencyIndex];
        let to = this.currencies[this.toCurrencyIndex];
        let rate = to.rate / from.rate;
        return `1 ${from.code} ≈ ${this.formatNum(rate)} ${to.code}`;
    }
    private formatNum(n: number): string {
        if (Math.abs(n) < 0.01 && n !== 0)
            return n.toFixed(6);
        return parseFloat(n.toFixed(4)).toString();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "CurrencyConversionPage";
    }
}
registerNamedRoute(() => new CurrencyConversionPage(undefined, {}), "", { bundleName: "com.example.simplecalculator", moduleName: "entry", pagePath: "pages/CurrencyConversionPage", pageFullPath: "entry/src/main/ets/pages/CurrencyConversionPage", integratedHsp: "false", moduleType: "followWithHap" });
