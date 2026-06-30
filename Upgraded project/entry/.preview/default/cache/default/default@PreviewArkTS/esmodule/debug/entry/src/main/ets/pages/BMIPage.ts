if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface BMIPage_Params {
    unitSystem?: UnitSystem;
    heightCm?: string;
    weightKg?: string;
    heightFt?: string;
    heightIn?: string;
    weightLb?: string;
    bmiValue?: number;
    bmiCategory?: string;
    bmiColor?: string;
    idealWeight?: string;
    showResult?: boolean;
    levels?: BMILevel[];
}
import router from "@ohos:router";
enum UnitSystem {
    METRIC = "\u516C\u5236",
    IMPERIAL = "\u82F1\u5236"
}
class BMILevel {
    label: string;
    min: number;
    max: number;
    color: string;
    constructor(label: string, min: number, max: number, color: string) {
        this.label = label;
        this.min = min;
        this.max = max;
        this.color = color;
    }
}
class BMIPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__unitSystem = new ObservedPropertySimplePU(UnitSystem.METRIC, this, "unitSystem");
        this.__heightCm = new ObservedPropertySimplePU('170', this, "heightCm");
        this.__weightKg = new ObservedPropertySimplePU('65', this, "weightKg");
        this.__heightFt = new ObservedPropertySimplePU('5', this, "heightFt");
        this.__heightIn = new ObservedPropertySimplePU('7', this, "heightIn");
        this.__weightLb = new ObservedPropertySimplePU('143', this, "weightLb");
        this.__bmiValue = new ObservedPropertySimplePU(0, this, "bmiValue");
        this.__bmiCategory = new ObservedPropertySimplePU('', this, "bmiCategory");
        this.__bmiColor = new ObservedPropertySimplePU('#4CAF50', this, "bmiColor");
        this.__idealWeight = new ObservedPropertySimplePU('', this, "idealWeight");
        this.__showResult = new ObservedPropertySimplePU(false, this, "showResult");
        this.levels = [
            new BMILevel('偏瘦', 0, 18.5, '#2196F3'),
            new BMILevel('正常', 18.5, 24.9, '#4CAF50'),
            new BMILevel('偏重', 25, 29.9, '#FF9800'),
            new BMILevel('肥胖', 30, 34.9, '#FF5722'),
            new BMILevel('重度肥胖', 35, 100, '#F44336'),
        ];
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: BMIPage_Params) {
        if (params.unitSystem !== undefined) {
            this.unitSystem = params.unitSystem;
        }
        if (params.heightCm !== undefined) {
            this.heightCm = params.heightCm;
        }
        if (params.weightKg !== undefined) {
            this.weightKg = params.weightKg;
        }
        if (params.heightFt !== undefined) {
            this.heightFt = params.heightFt;
        }
        if (params.heightIn !== undefined) {
            this.heightIn = params.heightIn;
        }
        if (params.weightLb !== undefined) {
            this.weightLb = params.weightLb;
        }
        if (params.bmiValue !== undefined) {
            this.bmiValue = params.bmiValue;
        }
        if (params.bmiCategory !== undefined) {
            this.bmiCategory = params.bmiCategory;
        }
        if (params.bmiColor !== undefined) {
            this.bmiColor = params.bmiColor;
        }
        if (params.idealWeight !== undefined) {
            this.idealWeight = params.idealWeight;
        }
        if (params.showResult !== undefined) {
            this.showResult = params.showResult;
        }
        if (params.levels !== undefined) {
            this.levels = params.levels;
        }
    }
    updateStateVars(params: BMIPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__unitSystem.purgeDependencyOnElmtId(rmElmtId);
        this.__heightCm.purgeDependencyOnElmtId(rmElmtId);
        this.__weightKg.purgeDependencyOnElmtId(rmElmtId);
        this.__heightFt.purgeDependencyOnElmtId(rmElmtId);
        this.__heightIn.purgeDependencyOnElmtId(rmElmtId);
        this.__weightLb.purgeDependencyOnElmtId(rmElmtId);
        this.__bmiValue.purgeDependencyOnElmtId(rmElmtId);
        this.__bmiCategory.purgeDependencyOnElmtId(rmElmtId);
        this.__bmiColor.purgeDependencyOnElmtId(rmElmtId);
        this.__idealWeight.purgeDependencyOnElmtId(rmElmtId);
        this.__showResult.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__unitSystem.aboutToBeDeleted();
        this.__heightCm.aboutToBeDeleted();
        this.__weightKg.aboutToBeDeleted();
        this.__heightFt.aboutToBeDeleted();
        this.__heightIn.aboutToBeDeleted();
        this.__weightLb.aboutToBeDeleted();
        this.__bmiValue.aboutToBeDeleted();
        this.__bmiCategory.aboutToBeDeleted();
        this.__bmiColor.aboutToBeDeleted();
        this.__idealWeight.aboutToBeDeleted();
        this.__showResult.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __unitSystem: ObservedPropertySimplePU<UnitSystem>;
    get unitSystem() {
        return this.__unitSystem.get();
    }
    set unitSystem(newValue: UnitSystem) {
        this.__unitSystem.set(newValue);
    }
    // 公制
    private __heightCm: ObservedPropertySimplePU<string>;
    get heightCm() {
        return this.__heightCm.get();
    }
    set heightCm(newValue: string) {
        this.__heightCm.set(newValue);
    }
    private __weightKg: ObservedPropertySimplePU<string>;
    get weightKg() {
        return this.__weightKg.get();
    }
    set weightKg(newValue: string) {
        this.__weightKg.set(newValue);
    }
    // 英制
    private __heightFt: ObservedPropertySimplePU<string>;
    get heightFt() {
        return this.__heightFt.get();
    }
    set heightFt(newValue: string) {
        this.__heightFt.set(newValue);
    }
    private __heightIn: ObservedPropertySimplePU<string>;
    get heightIn() {
        return this.__heightIn.get();
    }
    set heightIn(newValue: string) {
        this.__heightIn.set(newValue);
    }
    private __weightLb: ObservedPropertySimplePU<string>;
    get weightLb() {
        return this.__weightLb.get();
    }
    set weightLb(newValue: string) {
        this.__weightLb.set(newValue);
    }
    // 结果
    private __bmiValue: ObservedPropertySimplePU<number>;
    get bmiValue() {
        return this.__bmiValue.get();
    }
    set bmiValue(newValue: number) {
        this.__bmiValue.set(newValue);
    }
    private __bmiCategory: ObservedPropertySimplePU<string>;
    get bmiCategory() {
        return this.__bmiCategory.get();
    }
    set bmiCategory(newValue: string) {
        this.__bmiCategory.set(newValue);
    }
    private __bmiColor: ObservedPropertySimplePU<string>;
    get bmiColor() {
        return this.__bmiColor.get();
    }
    set bmiColor(newValue: string) {
        this.__bmiColor.set(newValue);
    }
    private __idealWeight: ObservedPropertySimplePU<string>;
    get idealWeight() {
        return this.__idealWeight.get();
    }
    set idealWeight(newValue: string) {
        this.__idealWeight.set(newValue);
    }
    private __showResult: ObservedPropertySimplePU<boolean>;
    get showResult() {
        return this.__showResult.get();
    }
    set showResult(newValue: boolean) {
        this.__showResult.set(newValue);
    }
    private levels: BMILevel[];
    aboutToAppear(): void {
        this.calculate();
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/BMIPage.ets(61:5)", "entry");
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor('#F1F3F5');
        }, Column);
        this.buildHeader.bind(this)();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Scroll.create();
            Scroll.debugLine("entry/src/main/ets/pages/BMIPage.ets(64:7)", "entry");
            Scroll.layoutWeight(1);
            Scroll.width('100%');
        }, Scroll);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/BMIPage.ets(65:9)", "entry");
            Column.width('100%');
        }, Column);
        // 单位制切换
        this.buildUnitToggle.bind(this)();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.unitSystem === UnitSystem.METRIC) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.buildMetricInputs.bind(this)();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.buildImperialInputs.bind(this)();
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 计算按钮
            Button.createWithLabel('计算 BMI');
            Button.debugLine("entry/src/main/ets/pages/BMIPage.ets(76:11)", "entry");
            // 计算按钮
            Button.fontSize({ "id": 16777261, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
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
            Row.debugLine("entry/src/main/ets/pages/BMIPage.ets(103:5)", "entry");
            Row.width('100%');
            Row.height({ "id": 16777269, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
            Row.padding({ left: 16, right: 16 });
            Row.backgroundColor('#FFFFFF');
            Row.shadow({ radius: 4, color: '#10000000', offsetY: 2 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithChild({ type: ButtonType.Circle });
            Button.debugLine("entry/src/main/ets/pages/BMIPage.ets(104:7)", "entry");
            Button.width({ "id": 16777267, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
            Button.height({ "id": 16777267, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
            Button.backgroundColor(Color.Transparent);
            Button.onClick(() => { router.back(); });
        }, Button);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('←');
            Text.debugLine("entry/src/main/ets/pages/BMIPage.ets(105:9)", "entry");
            Text.fontSize({ "id": 16777265, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
            Text.fontColor('#333333');
        }, Text);
        Text.pop();
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('BMI 计算');
            Text.debugLine("entry/src/main/ets/pages/BMIPage.ets(111:7)", "entry");
            Text.fontSize({ "id": 16777265, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#1A1A1A');
            Text.margin({ left: 8 });
        }, Text);
        Text.pop();
        Row.pop();
    }
    buildUnitToggle(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/BMIPage.ets(122:5)", "entry");
            Row.width('100%');
            Row.justifyContent(FlexAlign.Center);
            Row.padding({ top: 12, bottom: 8 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel(UnitSystem.METRIC);
            Button.debugLine("entry/src/main/ets/pages/BMIPage.ets(123:7)", "entry");
            Button.fontSize({ "id": 16777262, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
            Button.fontColor(this.unitSystem === UnitSystem.METRIC ? Color.White : '#666666');
            Button.backgroundColor(this.unitSystem === UnitSystem.METRIC ? '#007DFF' : '#F5F5F5');
            Button.borderRadius(20);
            Button.height(36);
            Button.padding({ left: 20, right: 20 });
            Button.border({ width: 1, color: this.unitSystem === UnitSystem.METRIC ? '#007DFF' : '#E0E0E0' });
            Button.onClick(() => { this.unitSystem = UnitSystem.METRIC; });
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel(UnitSystem.IMPERIAL);
            Button.debugLine("entry/src/main/ets/pages/BMIPage.ets(132:7)", "entry");
            Button.fontSize({ "id": 16777262, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
            Button.fontColor(this.unitSystem === UnitSystem.IMPERIAL ? Color.White : '#666666');
            Button.backgroundColor(this.unitSystem === UnitSystem.IMPERIAL ? '#007DFF' : '#F5F5F5');
            Button.borderRadius(20);
            Button.height(36);
            Button.padding({ left: 20, right: 20 });
            Button.margin({ left: 8 });
            Button.border({ width: 1, color: this.unitSystem === UnitSystem.IMPERIAL ? '#007DFF' : '#E0E0E0' });
            Button.onClick(() => { this.unitSystem = UnitSystem.IMPERIAL; });
        }, Button);
        Button.pop();
        Row.pop();
    }
    buildMetricInputs(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/BMIPage.ets(149:5)", "entry");
            Column.padding({ left: 16, right: 16 });
        }, Column);
        this.buildInputCard.bind(this)('身高', this.heightCm, 'cm', (v) => { this.heightCm = v; });
        this.buildInputCard.bind(this)('体重', this.weightKg, 'kg', (v) => { this.weightKg = v; });
        Column.pop();
    }
    buildImperialInputs(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/BMIPage.ets(160:5)", "entry");
            Column.padding({ left: 16, right: 16 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 身高 - ft + in
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/BMIPage.ets(162:7)", "entry");
            // 身高 - ft + in
            Column.width('100%');
            // 身高 - ft + in
            Column.padding(16);
            // 身高 - ft + in
            Column.backgroundColor('#FFFFFF');
            // 身高 - ft + in
            Column.borderRadius(16);
            // 身高 - ft + in
            Column.border({ width: 1, color: '#EEEEEE' });
            // 身高 - ft + in
            Column.margin({ bottom: 12 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('身高');
            Text.debugLine("entry/src/main/ets/pages/BMIPage.ets(163:9)", "entry");
            Text.fontSize({ "id": 16777264, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
            Text.fontColor('#999999');
            Text.width('100%');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/BMIPage.ets(167:9)", "entry");
            Row.width('100%');
            Row.margin({ top: 8 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/BMIPage.ets(168:11)", "entry");
            Column.layoutWeight(1);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TextInput.create({ text: this.heightFt, placeholder: '0' });
            TextInput.debugLine("entry/src/main/ets/pages/BMIPage.ets(169:13)", "entry");
            TextInput.fontSize({ "id": 16777271, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
            TextInput.fontWeight(FontWeight.Bold);
            TextInput.textAlign(TextAlign.Center);
            TextInput.type(InputType.Number);
            TextInput.backgroundColor('#FAFAFA');
            TextInput.width('100%');
            TextInput.height(52);
            TextInput.borderRadius(8);
            TextInput.border({ width: 1, color: '#E0E0E0' });
            TextInput.onChange((v) => { this.heightFt = v; });
        }, TextInput);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('英尺 (ft)');
            Text.debugLine("entry/src/main/ets/pages/BMIPage.ets(175:13)", "entry");
            Text.fontSize({ "id": 16777264, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
            Text.fontColor('#999999');
            Text.margin({ top: 4 });
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/BMIPage.ets(180:11)", "entry");
            Column.layoutWeight(1);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TextInput.create({ text: this.heightIn, placeholder: '0' });
            TextInput.debugLine("entry/src/main/ets/pages/BMIPage.ets(181:13)", "entry");
            TextInput.fontSize({ "id": 16777271, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
            TextInput.fontWeight(FontWeight.Bold);
            TextInput.textAlign(TextAlign.Center);
            TextInput.type(InputType.Number);
            TextInput.backgroundColor('#FAFAFA');
            TextInput.width('100%');
            TextInput.height(52);
            TextInput.borderRadius(8);
            TextInput.border({ width: 1, color: '#E0E0E0' });
            TextInput.margin({ left: 12 });
            TextInput.onChange((v) => { this.heightIn = v; });
        }, TextInput);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('英寸 (in)');
            Text.debugLine("entry/src/main/ets/pages/BMIPage.ets(188:13)", "entry");
            Text.fontSize({ "id": 16777264, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
            Text.fontColor('#999999');
            Text.margin({ top: 4 });
        }, Text);
        Text.pop();
        Column.pop();
        Row.pop();
        // 身高 - ft + in
        Column.pop();
        this.buildInputCard.bind(this)('体重', this.weightLb, '磅 (lb)', (v) => { this.weightLb = v; });
        Column.pop();
    }
    buildInputCard(label: string, value: string, unit: string, onChange: (v: string) => void, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/BMIPage.ets(207:5)", "entry");
            Column.width('100%');
            Column.padding(16);
            Column.backgroundColor('#FFFFFF');
            Column.borderRadius(16);
            Column.border({ width: 1, color: '#EEEEEE' });
            Column.margin({ bottom: 12 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(label);
            Text.debugLine("entry/src/main/ets/pages/BMIPage.ets(208:7)", "entry");
            Text.fontSize({ "id": 16777264, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
            Text.fontColor('#999999');
            Text.width('100%');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/BMIPage.ets(212:7)", "entry");
            Row.width('100%');
            Row.margin({ top: 8 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TextInput.create({ text: value, placeholder: '0' });
            TextInput.debugLine("entry/src/main/ets/pages/BMIPage.ets(213:9)", "entry");
            TextInput.fontSize({ "id": 16777240, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
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
            Text.debugLine("entry/src/main/ets/pages/BMIPage.ets(220:9)", "entry");
            Text.fontSize({ "id": 16777261, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
            Text.fontColor('#666666');
            Text.margin({ left: 12 });
            Text.width(50);
        }, Text);
        Text.pop();
        Row.pop();
        Column.pop();
    }
    // ==================== 结果面板 ====================
    buildResultPanel(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/BMIPage.ets(235:5)", "entry");
            Column.width('100%');
            Column.padding(24);
            Column.backgroundColor('#FFFFFF');
            Column.borderRadius(16);
            Column.border({ width: 1, color: '#EEEEEE' });
            Column.margin({ left: 16, right: 16, top: 16, bottom: 16 });
            Column.shadow({ radius: 4, color: '#0A000000', offsetY: 2 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // BMI 大字
            Text.create(this.bmiValue.toFixed(1));
            Text.debugLine("entry/src/main/ets/pages/BMIPage.ets(237:7)", "entry");
            // BMI 大字
            Text.fontSize(56);
            // BMI 大字
            Text.fontWeight(FontWeight.Bold);
            // BMI 大字
            Text.fontColor(this.bmiColor);
        }, Text);
        // BMI 大字
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.bmiCategory);
            Text.debugLine("entry/src/main/ets/pages/BMIPage.ets(241:7)", "entry");
            Text.fontSize({ "id": 16777266, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor(this.bmiColor);
            Text.margin({ bottom: 16 });
        }, Text);
        Text.pop();
        // BMI 等级色条
        this.buildBMIScale.bind(this)();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 理想体重范围
            Text.create(this.idealWeight);
            Text.debugLine("entry/src/main/ets/pages/BMIPage.ets(251:7)", "entry");
            // 理想体重范围
            Text.fontSize({ "id": 16777262, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
            // 理想体重范围
            Text.fontColor('#666666');
            // 理想体重范围
            Text.margin({ top: 16 });
            // 理想体重范围
            Text.textAlign(TextAlign.Center);
        }, Text);
        // 理想体重范围
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // BMI 说明
            Text.create(this.getBMIAdvice());
            Text.debugLine("entry/src/main/ets/pages/BMIPage.ets(258:7)", "entry");
            // BMI 说明
            Text.fontSize({ "id": 16777263, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
            // BMI 说明
            Text.fontColor('#888888');
            // BMI 说明
            Text.margin({ top: 12 });
            // BMI 说明
            Text.textAlign(TextAlign.Center);
            // BMI 说明
            Text.padding({ left: 8, right: 8 });
        }, Text);
        // BMI 说明
        Text.pop();
        Column.pop();
    }
    buildBMIScale(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/BMIPage.ets(273:5)", "entry");
            Column.width('100%');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/BMIPage.ets(274:7)", "entry");
            Row.width('100%');
            Row.height(24);
            Row.borderRadius(12);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const level = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                    Column.debugLine("entry/src/main/ets/pages/BMIPage.ets(276:11)", "entry");
                    Column.width(this.getScaleWidth(level));
                    Column.height(24);
                    Column.backgroundColor(level.color);
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(level.min.toFixed(1));
                    Text.debugLine("entry/src/main/ets/pages/BMIPage.ets(277:13)", "entry");
                    Text.fontSize(10);
                    Text.fontColor('#999999');
                }, Text);
                Text.pop();
                Column.pop();
            };
            this.forEachUpdateFunction(elmtId, this.levels, forEachItemGenFunction);
        }, ForEach);
        ForEach.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 指针
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/BMIPage.ets(288:7)", "entry");
            // 指针
            Row.width('100%');
            // 指针
            Row.padding({ left: this.getPointerPosition() });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
            Blank.debugLine("entry/src/main/ets/pages/BMIPage.ets(289:9)", "entry");
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Polygon.create();
            Polygon.debugLine("entry/src/main/ets/pages/BMIPage.ets(290:9)", "entry");
            Polygon.points([[0, 0], [6, 10], [12, 0]]);
            Polygon.fill(this.bmiColor);
            Polygon.width(12);
            Polygon.height(10);
        }, Polygon);
        // 指针
        Row.pop();
        Column.pop();
    }
    // ==================== 计算方法 ====================
    private calculate(): void {
        let heightM: number;
        let weightKg: number;
        if (this.unitSystem === UnitSystem.METRIC) {
            heightM = parseFloat(this.heightCm) / 100;
            weightKg = parseFloat(this.weightKg);
        }
        else {
            let ft = parseFloat(this.heightFt) || 0;
            let inch = parseFloat(this.heightIn) || 0;
            heightM = (ft * 12 + inch) * 0.0254;
            weightKg = (parseFloat(this.weightLb) || 0) * 0.453592;
        }
        if (isNaN(heightM) || isNaN(weightKg) || heightM <= 0 || weightKg <= 0) {
            this.showResult = false;
            return;
        }
        let bmi = weightKg / (heightM * heightM);
        this.bmiValue = bmi;
        for (let i = 0; i < this.levels.length; i++) {
            if (bmi >= this.levels[i].min && bmi < this.levels[i].max) {
                this.bmiCategory = this.levels[i].label;
                this.bmiColor = this.levels[i].color;
                break;
            }
        }
        // 理想体重范围 (BMI 18.5-24.9)
        let idealLow = (18.5 * heightM * heightM);
        let idealHigh = (24.9 * heightM * heightM);
        if (this.unitSystem === UnitSystem.METRIC) {
            this.idealWeight = `理想体重范围：${idealLow.toFixed(1)} - ${idealHigh.toFixed(1)} kg`;
        }
        else {
            let lowLb = idealLow / 0.453592;
            let highLb = idealHigh / 0.453592;
            this.idealWeight = `理想体重范围：${lowLb.toFixed(1)} - ${highLb.toFixed(1)} lb`;
        }
        this.showResult = true;
    }
    private getBMIAdvice(): string {
        if (this.bmiValue < 18.5)
            return '您的体重偏轻，建议加强营养摄入，适当增加体重。';
        if (this.bmiValue < 24.9)
            return '您的体重在正常范围内，请继续保持健康的生活方式。';
        if (this.bmiValue < 29.9)
            return '您的体重偏重，建议控制饮食并适当增加运动量。';
        if (this.bmiValue < 34.9)
            return '您的体重属于肥胖范围，建议咨询医生制定科学减重计划。';
        return '您的体重属于重度肥胖，建议尽快就医进行专业减重指导。';
    }
    private getScaleWidth(level: BMILevel): string {
        let total = 40; // 0-40 BMI scale
        let w = ((level.max - level.min) / total * 100).toFixed(1);
        return `${w}%`;
    }
    private getPointerPosition(): string {
        let total = 40;
        let pct = (this.bmiValue / total * 100);
        if (pct > 95)
            pct = 95;
        if (pct < 2)
            pct = 2;
        return `${pct.toFixed(1)}%`;
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "BMIPage";
    }
}
registerNamedRoute(() => new BMIPage(undefined, {}), "", { bundleName: "com.example.simplecalculator", moduleName: "entry", pagePath: "pages/BMIPage", pageFullPath: "entry/src/main/ets/pages/BMIPage", integratedHsp: "false", moduleType: "followWithHap" });
