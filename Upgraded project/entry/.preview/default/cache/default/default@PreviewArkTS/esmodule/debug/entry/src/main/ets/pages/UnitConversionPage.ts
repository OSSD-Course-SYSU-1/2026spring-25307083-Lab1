if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface UnitConversionPage_Params {
    categories?: ConversionCategory[];
    selectedCategory?: ConversionCategory;
    leftValue?: string;
    rightValue?: string;
    leftUnitIndex?: number;
    rightUnitIndex?: number;
    showLeftPicker?: boolean;
    showRightPicker?: boolean;
    unitMap?: Map<ConversionCategory, UnitDef[]>;
}
import router from "@ohos:router";
/**
 * 单位换算类别
 */
enum ConversionCategory {
    LENGTH = "\u957F\u5EA6",
    WEIGHT = "\u91CD\u91CF",
    TEMPERATURE = "\u6E29\u5EA6",
    AREA = "\u9762\u79EF",
    VOLUME = "\u4F53\u79EF",
    SPEED = "\u901F\u5EA6"
}
/**
 * 单位定义
 */
class UnitDef {
    name: string;
    factor: number; // 相对于基准单位的转换因子（温度使用特殊处理）
    constructor(name: string, factor: number) {
        this.name = name;
        this.factor = factor;
    }
}
class UnitConversionPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__categories = new ObservedPropertyObjectPU([
            ConversionCategory.LENGTH,
            ConversionCategory.WEIGHT,
            ConversionCategory.TEMPERATURE,
            ConversionCategory.AREA,
            ConversionCategory.VOLUME,
            ConversionCategory.SPEED
        ], this, "categories");
        this.__selectedCategory = new ObservedPropertySimplePU(ConversionCategory.LENGTH, this, "selectedCategory");
        this.__leftValue = new ObservedPropertySimplePU('1', this, "leftValue");
        this.__rightValue = new ObservedPropertySimplePU('', this, "rightValue");
        this.__leftUnitIndex = new ObservedPropertySimplePU(0, this, "leftUnitIndex");
        this.__rightUnitIndex = new ObservedPropertySimplePU(1, this, "rightUnitIndex");
        this.__showLeftPicker = new ObservedPropertySimplePU(false, this, "showLeftPicker");
        this.__showRightPicker = new ObservedPropertySimplePU(false, this, "showRightPicker");
        this.unitMap = new Map([
            [ConversionCategory.LENGTH, [
                    new UnitDef('毫米 (mm)', 0.001),
                    new UnitDef('厘米 (cm)', 0.01),
                    new UnitDef('米 (m)', 1),
                    new UnitDef('千米 (km)', 1000),
                    new UnitDef('英寸 (in)', 0.0254),
                    new UnitDef('英尺 (ft)', 0.3048),
                    new UnitDef('码 (yd)', 0.9144),
                    new UnitDef('英里 (mi)', 1609.344)
                ]],
            [ConversionCategory.WEIGHT, [
                    new UnitDef('毫克 (mg)', 0.000001),
                    new UnitDef('克 (g)', 0.001),
                    new UnitDef('千克 (kg)', 1),
                    new UnitDef('吨 (t)', 1000),
                    new UnitDef('盎司 (oz)', 0.0283495),
                    new UnitDef('磅 (lb)', 0.453592)
                ]],
            [ConversionCategory.TEMPERATURE, [
                    new UnitDef('摄氏度 (°C)', 0),
                    new UnitDef('华氏度 (°F)', 0),
                    new UnitDef('开尔文 (K)', 0)
                ]],
            [ConversionCategory.AREA, [
                    new UnitDef('平方毫米 (mm²)', 0.000001),
                    new UnitDef('平方厘米 (cm²)', 0.0001),
                    new UnitDef('平方米 (m²)', 1),
                    new UnitDef('公顷 (ha)', 10000),
                    new UnitDef('平方千米 (km²)', 1000000),
                    new UnitDef('英亩 (acre)', 4046.86)
                ]],
            [ConversionCategory.VOLUME, [
                    new UnitDef('毫升 (mL)', 0.001),
                    new UnitDef('升 (L)', 1),
                    new UnitDef('立方米 (m³)', 1000),
                    new UnitDef('加仑 (gal)', 3.78541),
                    new UnitDef('品脱 (pt)', 0.473176),
                    new UnitDef('夸脱 (qt)', 0.946353)
                ]],
            [ConversionCategory.SPEED, [
                    new UnitDef('米/秒 (m/s)', 1),
                    new UnitDef('千米/时 (km/h)', 0.277778),
                    new UnitDef('英里/时 (mph)', 0.44704),
                    new UnitDef('节 (kn)', 0.514444),
                    new UnitDef('马赫 (Mach)', 340)
                ]]
        ]);
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: UnitConversionPage_Params) {
        if (params.categories !== undefined) {
            this.categories = params.categories;
        }
        if (params.selectedCategory !== undefined) {
            this.selectedCategory = params.selectedCategory;
        }
        if (params.leftValue !== undefined) {
            this.leftValue = params.leftValue;
        }
        if (params.rightValue !== undefined) {
            this.rightValue = params.rightValue;
        }
        if (params.leftUnitIndex !== undefined) {
            this.leftUnitIndex = params.leftUnitIndex;
        }
        if (params.rightUnitIndex !== undefined) {
            this.rightUnitIndex = params.rightUnitIndex;
        }
        if (params.showLeftPicker !== undefined) {
            this.showLeftPicker = params.showLeftPicker;
        }
        if (params.showRightPicker !== undefined) {
            this.showRightPicker = params.showRightPicker;
        }
        if (params.unitMap !== undefined) {
            this.unitMap = params.unitMap;
        }
    }
    updateStateVars(params: UnitConversionPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__categories.purgeDependencyOnElmtId(rmElmtId);
        this.__selectedCategory.purgeDependencyOnElmtId(rmElmtId);
        this.__leftValue.purgeDependencyOnElmtId(rmElmtId);
        this.__rightValue.purgeDependencyOnElmtId(rmElmtId);
        this.__leftUnitIndex.purgeDependencyOnElmtId(rmElmtId);
        this.__rightUnitIndex.purgeDependencyOnElmtId(rmElmtId);
        this.__showLeftPicker.purgeDependencyOnElmtId(rmElmtId);
        this.__showRightPicker.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__categories.aboutToBeDeleted();
        this.__selectedCategory.aboutToBeDeleted();
        this.__leftValue.aboutToBeDeleted();
        this.__rightValue.aboutToBeDeleted();
        this.__leftUnitIndex.aboutToBeDeleted();
        this.__rightUnitIndex.aboutToBeDeleted();
        this.__showLeftPicker.aboutToBeDeleted();
        this.__showRightPicker.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __categories: ObservedPropertyObjectPU<ConversionCategory[]>;
    get categories() {
        return this.__categories.get();
    }
    set categories(newValue: ConversionCategory[]) {
        this.__categories.set(newValue);
    }
    private __selectedCategory: ObservedPropertySimplePU<ConversionCategory>;
    get selectedCategory() {
        return this.__selectedCategory.get();
    }
    set selectedCategory(newValue: ConversionCategory) {
        this.__selectedCategory.set(newValue);
    }
    private __leftValue: ObservedPropertySimplePU<string>;
    get leftValue() {
        return this.__leftValue.get();
    }
    set leftValue(newValue: string) {
        this.__leftValue.set(newValue);
    }
    private __rightValue: ObservedPropertySimplePU<string>;
    get rightValue() {
        return this.__rightValue.get();
    }
    set rightValue(newValue: string) {
        this.__rightValue.set(newValue);
    }
    private __leftUnitIndex: ObservedPropertySimplePU<number>;
    get leftUnitIndex() {
        return this.__leftUnitIndex.get();
    }
    set leftUnitIndex(newValue: number) {
        this.__leftUnitIndex.set(newValue);
    }
    private __rightUnitIndex: ObservedPropertySimplePU<number>;
    get rightUnitIndex() {
        return this.__rightUnitIndex.get();
    }
    set rightUnitIndex(newValue: number) {
        this.__rightUnitIndex.set(newValue);
    }
    private __showLeftPicker: ObservedPropertySimplePU<boolean>;
    get showLeftPicker() {
        return this.__showLeftPicker.get();
    }
    set showLeftPicker(newValue: boolean) {
        this.__showLeftPicker.set(newValue);
    }
    private __showRightPicker: ObservedPropertySimplePU<boolean>;
    get showRightPicker() {
        return this.__showRightPicker.get();
    }
    set showRightPicker(newValue: boolean) {
        this.__showRightPicker.set(newValue);
    }
    // 各分类的单位定义
    private unitMap: Map<ConversionCategory, UnitDef[]>;
    aboutToAppear(): void {
        this.doConversion();
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create();
            Stack.debugLine("entry/src/main/ets/pages/UnitConversionPage.ets(109:5)", "entry");
            Stack.width('100%');
            Stack.height('100%');
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/UnitConversionPage.ets(110:7)", "entry");
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor('#F1F3F5');
        }, Column);
        // 顶部导航栏
        this.buildHeader.bind(this)();
        // 类别选择器
        this.buildCategorySelector.bind(this)();
        // 换算区域
        this.buildConversionArea.bind(this)();
        // 数字键盘
        this.buildNumberPad.bind(this)();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            // 单位选择弹窗（全屏覆盖层）
            if (this.showLeftPicker) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.buildUnitPicker.bind(this)(true);
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.showRightPicker) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.buildUnitPicker.bind(this)(false);
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
    /**
     * 顶部导航栏
     */
    buildHeader(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/UnitConversionPage.ets(144:5)", "entry");
            Row.width('100%');
            Row.height({ "id": 16777269, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
            Row.padding({ left: 16, right: 16 });
            Row.backgroundColor('#FFFFFF');
            Row.shadow({ radius: 4, color: '#10000000', offsetY: 2 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithChild({ type: ButtonType.Circle });
            Button.debugLine("entry/src/main/ets/pages/UnitConversionPage.ets(145:7)", "entry");
            Button.width({ "id": 16777267, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
            Button.height({ "id": 16777267, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
            Button.backgroundColor(Color.Transparent);
            Button.onClick(() => {
                router.back();
            });
        }, Button);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('←');
            Text.debugLine("entry/src/main/ets/pages/UnitConversionPage.ets(146:9)", "entry");
            Text.fontSize({ "id": 16777265, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
            Text.fontColor('#333333');
        }, Text);
        Text.pop();
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('单位换算');
            Text.debugLine("entry/src/main/ets/pages/UnitConversionPage.ets(157:7)", "entry");
            Text.fontSize({ "id": 16777265, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#1A1A1A');
            Text.margin({ left: 8 });
        }, Text);
        Text.pop();
        Row.pop();
    }
    /**
     * 类别选择器 - 横向滚动的类别标签
     */
    buildCategorySelector(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Scroll.create(new Scroller());
            Scroll.debugLine("entry/src/main/ets/pages/UnitConversionPage.ets(175:5)", "entry");
            Scroll.scrollable(ScrollDirection.Horizontal);
            Scroll.scrollBar(BarState.Off);
            Scroll.width('100%');
            Scroll.backgroundColor('#FFFFFF');
            Scroll.padding({ top: 10, bottom: 10 });
        }, Scroll);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/UnitConversionPage.ets(176:7)", "entry");
            Row.padding({ left: 16, right: 16 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = (_item, index: number) => {
                const category = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(category);
                    Text.debugLine("entry/src/main/ets/pages/UnitConversionPage.ets(178:11)", "entry");
                    Text.fontSize({ "id": 16777262, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
                    Text.fontColor(this.selectedCategory === category ? Color.White : '#666666');
                    Text.padding({ left: 14, right: 14, top: 6, bottom: 6 });
                    Text.borderRadius(16);
                    Text.backgroundColor(this.selectedCategory === category ? '#007DFF' : '#FFFFFF');
                    Text.border({ width: 1, color: this.selectedCategory === category ? '#007DFF' : '#E0E0E0' });
                    Text.margin({ right: 8 });
                    Text.onClick(() => {
                        this.selectedCategory = category;
                        this.leftUnitIndex = 0;
                        this.rightUnitIndex = 1;
                        this.doConversion();
                    });
                }, Text);
                Text.pop();
            };
            this.forEachUpdateFunction(elmtId, this.categories, forEachItemGenFunction, (category: ConversionCategory) => category, true, false);
        }, ForEach);
        ForEach.pop();
        Row.pop();
        Scroll.pop();
    }
    /**
     * 换算区域 - 左右双栏
     */
    buildConversionArea(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/UnitConversionPage.ets(208:5)", "entry");
            Row.width('100%');
            Row.layoutWeight(1);
            Row.padding({ left: 12, right: 12, top: 8, bottom: 8 });
            Row.alignItems(VerticalAlign.Top);
        }, Row);
        // 左侧 - 输入
        this.buildConversionPanel.bind(this)(true, this.leftValue, this.leftUnitIndex, () => { this.showLeftPicker = true; }, (value: string) => {
            this.leftValue = value;
            this.doConversion();
        });
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 中间转换箭头
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/UnitConversionPage.ets(222:7)", "entry");
            // 中间转换箭头
            Column.width(40);
            // 中间转换箭头
            Column.justifyContent(FlexAlign.Center);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('⟷');
            Text.debugLine("entry/src/main/ets/pages/UnitConversionPage.ets(223:9)", "entry");
            Text.fontSize(28);
            Text.fontColor('#007DFF');
            Text.fontWeight(FontWeight.Bold);
        }, Text);
        Text.pop();
        // 中间转换箭头
        Column.pop();
        // 右侧 - 输出
        this.buildConversionPanel.bind(this)(false, this.rightValue, this.rightUnitIndex, () => { this.showRightPicker = true; }, () => { });
        Row.pop();
    }
    /**
     * 换算面板（左侧输入/右侧输出）
     */
    buildConversionPanel(isLeft: boolean, displayValue: string, unitIndex: number, onUnitClick: () => void, onValueChange: (value: string) => void, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/UnitConversionPage.ets(257:5)", "entry");
            Column.layoutWeight(1);
            Column.height('100%');
            Column.padding(12);
            Column.backgroundColor('#FFFFFF');
            Column.borderRadius(16);
            Column.border({ width: 1, color: '#EEEEEE' });
            Column.shadow({ radius: 4, color: '#0A000000', offsetY: 2 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(isLeft ? '输入' : '输出');
            Text.debugLine("entry/src/main/ets/pages/UnitConversionPage.ets(258:7)", "entry");
            Text.fontSize({ "id": 16777264, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
            Text.fontColor('#999999');
            Text.margin({ bottom: 8 });
            Text.width('100%');
            Text.textAlign(TextAlign.Center);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(displayValue || '0');
            Text.debugLine("entry/src/main/ets/pages/UnitConversionPage.ets(265:7)", "entry");
            Text.fontSize({ "id": 16777271, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
            Text.fontColor(isLeft ? '#1A1A1A' : '#007DFF');
            Text.fontWeight(FontWeight.Bold);
            Text.maxLines(1);
            Text.textOverflow({ overflow: TextOverflow.Ellipsis });
            Text.width('100%');
            Text.textAlign(TextAlign.Center);
            Text.padding({ top: 16, bottom: 16 });
            Text.backgroundColor('#FAFAFA');
            Text.borderRadius(12);
            Text.border({ width: 1, color: '#EEEEEE' });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
            Blank.debugLine("entry/src/main/ets/pages/UnitConversionPage.ets(278:7)", "entry");
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 单位选择按钮
            Button.createWithChild();
            Button.debugLine("entry/src/main/ets/pages/UnitConversionPage.ets(281:7)", "entry");
            // 单位选择按钮
            Button.width('100%');
            // 单位选择按钮
            Button.height(36);
            // 单位选择按钮
            Button.backgroundColor('#FFFFFF');
            // 单位选择按钮
            Button.borderRadius(8);
            // 单位选择按钮
            Button.border({ width: 1, color: '#E0E0E0' });
            // 单位选择按钮
            Button.padding({ left: 10, right: 10 });
            // 单位选择按钮
            Button.onClick(onUnitClick);
        }, Button);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/UnitConversionPage.ets(282:9)", "entry");
            Row.width('100%');
            Row.justifyContent(FlexAlign.SpaceBetween);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.getCurrentUnits()[unitIndex].name.split(' ')[0]);
            Text.debugLine("entry/src/main/ets/pages/UnitConversionPage.ets(283:11)", "entry");
            Text.fontSize({ "id": 16777262, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
            Text.fontColor('#333333');
            Text.maxLines(1);
            Text.layoutWeight(1);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('▼');
            Text.debugLine("entry/src/main/ets/pages/UnitConversionPage.ets(289:11)", "entry");
            Text.fontSize(10);
            Text.fontColor('#999999');
        }, Text);
        Text.pop();
        Row.pop();
        // 单位选择按钮
        Button.pop();
        Column.pop();
    }
    /**
     * 数字键盘
     */
    buildNumberPad(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/UnitConversionPage.ets(318:5)", "entry");
            Column.width('100%');
            Column.backgroundColor('#FFFFFF');
            Column.padding({ top: 8, bottom: 8 });
            Column.border({ width: { top: 1 }, color: '#EEEEEE' });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 清除和退格行
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/UnitConversionPage.ets(320:7)", "entry");
            // 清除和退格行
            Row.width('100%');
            // 清除和退格行
            Row.padding({ left: 12, right: 12, bottom: 4 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('C');
            Button.debugLine("entry/src/main/ets/pages/UnitConversionPage.ets(321:9)", "entry");
            Button.fontSize({ "id": 16777241, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
            Button.fontColor('#FF5252');
            Button.backgroundColor('#FFF0F0');
            Button.layoutWeight(1);
            Button.height({ "id": 16777245, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
            Button.borderRadius(8);
            Button.margin({ right: 4 });
            Button.onClick(() => {
                this.leftValue = '';
                this.rightValue = '';
            });
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('⌫');
            Button.debugLine("entry/src/main/ets/pages/UnitConversionPage.ets(334:9)", "entry");
            Button.fontSize({ "id": 16777241, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
            Button.fontColor('#FF9800');
            Button.backgroundColor('#FFF8E1');
            Button.layoutWeight(1);
            Button.height({ "id": 16777245, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
            Button.borderRadius(8);
            Button.margin({ left: 4 });
            Button.onClick(() => {
                if (this.leftValue.length > 0) {
                    this.leftValue = this.leftValue.slice(0, -1);
                    this.doConversion();
                }
            });
        }, Button);
        Button.pop();
        // 清除和退格行
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 数字行
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/UnitConversionPage.ets(353:7)", "entry");
            // 数字行
            Row.width('100%');
            // 数字行
            Row.padding({ left: 8, right: 8, bottom: 4 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const num = _item;
                this.buildNumberKey.bind(this)(num, { left: 4, right: 4 });
            };
            this.forEachUpdateFunction(elmtId, ['7', '8', '9'], forEachItemGenFunction);
        }, ForEach);
        ForEach.pop();
        // 数字行
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/UnitConversionPage.ets(361:7)", "entry");
            Row.width('100%');
            Row.padding({ left: 8, right: 8, bottom: 4 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const num = _item;
                this.buildNumberKey.bind(this)(num, { left: 4, right: 4 });
            };
            this.forEachUpdateFunction(elmtId, ['4', '5', '6'], forEachItemGenFunction);
        }, ForEach);
        ForEach.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/UnitConversionPage.ets(369:7)", "entry");
            Row.width('100%');
            Row.padding({ left: 8, right: 8, bottom: 4 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const num = _item;
                this.buildNumberKey.bind(this)(num, { left: 4, right: 4 });
            };
            this.forEachUpdateFunction(elmtId, ['1', '2', '3'], forEachItemGenFunction);
        }, ForEach);
        ForEach.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/UnitConversionPage.ets(377:7)", "entry");
            Row.width('100%');
            Row.padding({ left: 8, right: 8, bottom: 4 });
        }, Row);
        this.buildNumberKey.bind(this)('.', { left: 4, right: 4 });
        this.buildNumberKey.bind(this)('0', { left: 4, right: 4 });
        this.buildNumberKey.bind(this)('00', { left: 4, right: 4 });
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 交换按钮行
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/UnitConversionPage.ets(386:7)", "entry");
            // 交换按钮行
            Row.width('100%');
            // 交换按钮行
            Row.padding({ left: 8, right: 8, bottom: 8 });
        }, Row);
        this.buildActionKey.bind(this)('⇄ 交换单位', '#007DFF', '#F0F7FF', () => {
            let temp = this.leftUnitIndex;
            this.leftUnitIndex = this.rightUnitIndex;
            this.rightUnitIndex = temp;
            this.doConversion();
        });
        // 交换按钮行
        Row.pop();
        Column.pop();
    }
    /**
     * 数字按键
     */
    buildNumberKey(num: string, margin: Margin, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel(num);
            Button.debugLine("entry/src/main/ets/pages/UnitConversionPage.ets(408:5)", "entry");
            Button.fontSize({ "id": 16777241, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
            Button.fontColor('#1A1A1A');
            Button.backgroundColor('#F5F5F5');
            Button.layoutWeight(1);
            Button.height({ "id": 16777245, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
            Button.borderRadius(8);
            Button.margin(margin);
            Button.onClick(() => {
                if (num === '.' && this.leftValue.indexOf('.') !== -1) {
                    return;
                }
                if (this.leftValue === '0' && num !== '.') {
                    this.leftValue = num;
                }
                else {
                    this.leftValue += num;
                }
                this.doConversion();
            });
        }, Button);
        Button.pop();
    }
    /**
     * 操作按键
     */
    buildActionKey(label: string, color: string, bgColor: string, action: () => void, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel(label);
            Button.debugLine("entry/src/main/ets/pages/UnitConversionPage.ets(434:5)", "entry");
            Button.fontSize({ "id": 16777241, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
            Button.fontColor(color);
            Button.backgroundColor(bgColor);
            Button.width('100%');
            Button.height({ "id": 16777245, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
            Button.borderRadius(8);
            Button.border({ width: 1, color: color });
            Button.onClick(action);
        }, Button);
        Button.pop();
    }
    /**
     * 单位选择弹窗
     */
    buildUnitPicker(isLeft: boolean, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/UnitConversionPage.ets(450:5)", "entry");
            Column.width('100%');
            Column.height('100%');
            Column.justifyContent(FlexAlign.Center);
            Column.backgroundColor('#50000000');
            Column.position({ x: 0, y: 0 });
            Column.onClick(() => {
                this.showLeftPicker = false;
                this.showRightPicker = false;
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/UnitConversionPage.ets(451:7)", "entry");
            Column.width('85%');
            Column.padding(20);
            Column.backgroundColor(Color.White);
            Column.borderRadius(16);
            Column.shadow({ radius: 20, color: '#30000000' });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(isLeft ? '选择输入单位' : '选择输出单位');
            Text.debugLine("entry/src/main/ets/pages/UnitConversionPage.ets(452:9)", "entry");
            Text.fontSize({ "id": 16777266, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#1A1A1A');
            Text.margin({ bottom: 12 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            List.create();
            List.debugLine("entry/src/main/ets/pages/UnitConversionPage.ets(458:9)", "entry");
            List.width('100%');
            List.constraintSize({ maxHeight: 300 });
        }, List);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = (_item, index: number) => {
                const unit = _item;
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
                        ListItem.debugLine("entry/src/main/ets/pages/UnitConversionPage.ets(460:13)", "entry");
                    };
                    const deepRenderFunction = (elmtId, isInitialRender) => {
                        itemCreation(elmtId, isInitialRender);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Row.create();
                            Row.debugLine("entry/src/main/ets/pages/UnitConversionPage.ets(461:15)", "entry");
                            Row.width('100%');
                            Row.padding({ top: 14, bottom: 14, left: 16, right: 16 });
                            Row.onClick(() => {
                                if (isLeft) {
                                    this.leftUnitIndex = index;
                                }
                                else {
                                    this.rightUnitIndex = index;
                                }
                                this.doConversion();
                                this.showLeftPicker = false;
                                this.showRightPicker = false;
                            });
                        }, Row);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create(unit.name);
                            Text.debugLine("entry/src/main/ets/pages/UnitConversionPage.ets(462:17)", "entry");
                            Text.fontSize({ "id": 16777261, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
                            Text.fontColor('#333333');
                            Text.layoutWeight(1);
                        }, Text);
                        Text.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            If.create();
                            if ((isLeft && index === this.leftUnitIndex) ||
                                (!isLeft && index === this.rightUnitIndex)) {
                                this.ifElseBranchUpdateFunction(0, () => {
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        Text.create('✓');
                                        Text.debugLine("entry/src/main/ets/pages/UnitConversionPage.ets(469:19)", "entry");
                                        Text.fontSize({ "id": 16777241, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
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
            this.forEachUpdateFunction(elmtId, this.getCurrentUnits(), forEachItemGenFunction, (unit: UnitDef) => unit.name, true, false);
        }, ForEach);
        ForEach.pop();
        List.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('取消');
            Button.debugLine("entry/src/main/ets/pages/UnitConversionPage.ets(494:9)", "entry");
            Button.fontSize({ "id": 16777262, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
            Button.fontColor('#999999');
            Button.backgroundColor('#F5F5F5');
            Button.width('100%');
            Button.height(40);
            Button.borderRadius(8);
            Button.margin({ top: 8 });
            Button.onClick(() => {
                this.showLeftPicker = false;
                this.showRightPicker = false;
            });
        }, Button);
        Button.pop();
        Column.pop();
        Column.pop();
    }
    /**
     * 获取当前分类的单位列表
     */
    private getCurrentUnits(): UnitDef[] {
        return this.unitMap.get(this.selectedCategory) || [];
    }
    /**
     * 执行单位换算
     */
    private doConversion(): void {
        let inputVal = parseFloat(this.leftValue);
        if (isNaN(inputVal) || this.leftValue === '') {
            this.rightValue = '';
            return;
        }
        let units = this.getCurrentUnits();
        let fromUnit = units[this.leftUnitIndex];
        let toUnit = units[this.rightUnitIndex];
        if (this.selectedCategory === ConversionCategory.TEMPERATURE) {
            this.rightValue = this.convertTemperature(inputVal, this.leftUnitIndex, this.rightUnitIndex);
            return;
        }
        // 通用换算：先转为基准单位，再转为目标单位
        let baseValue = inputVal * fromUnit.factor;
        let result = baseValue / toUnit.factor;
        // 格式化结果
        if (Math.abs(result) < 0.000001 && result !== 0) {
            this.rightValue = result.toExponential(6);
        }
        else if (Math.abs(result) >= 1000000) {
            this.rightValue = result.toExponential(6);
        }
        else {
            this.rightValue = this.formatNumber(result);
        }
    }
    /**
     * 温度特殊换算
     */
    private convertTemperature(value: number, fromIndex: number, toIndex: number): string {
        let celsius = value;
        // 先转为摄氏度
        switch (fromIndex) {
            case 0: // 摄氏度
                celsius = value;
                break;
            case 1: // 华氏度
                celsius = (value - 32) * 5 / 9;
                break;
            case 2: // 开尔文
                celsius = value - 273.15;
                break;
        }
        // 从摄氏度转为目标单位
        let result = celsius;
        switch (toIndex) {
            case 0:
                result = celsius;
                break;
            case 1:
                result = celsius * 9 / 5 + 32;
                break;
            case 2:
                result = celsius + 273.15;
                break;
        }
        return this.formatNumber(result);
    }
    /**
     * 格式化数字显示
     */
    private formatNumber(num: number): string {
        if (Number.isInteger(num)) {
            return num.toString();
        }
        // 最多保留 6 位小数，去除尾部零
        let fixed = num.toFixed(6);
        return fixed.replace(/\.?0+$/, '');
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "UnitConversionPage";
    }
}
registerNamedRoute(() => new UnitConversionPage(undefined, {}), "", { bundleName: "com.example.simplecalculator", moduleName: "entry", pagePath: "pages/UnitConversionPage", pageFullPath: "entry/src/main/ets/pages/UnitConversionPage", integratedHsp: "false", moduleType: "followWithHap" });
