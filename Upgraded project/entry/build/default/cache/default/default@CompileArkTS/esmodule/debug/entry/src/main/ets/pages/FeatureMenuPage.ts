if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface FeatureMenuPage_Params {
    features?: FeatureItem[];
}
import router from "@ohos:router";
/**
 * 功能项数据结构
 */
class FeatureItem {
    id: string;
    name: string;
    icon: string;
    color: string;
    route: string;
    constructor(id: string, name: string, icon: string, color: string, route: string) {
        this.id = id;
        this.name = name;
        this.icon = icon;
        this.color = color;
        this.route = route;
    }
}
class FeatureMenuPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__features = new ObservedPropertyObjectPU([
            new FeatureItem('unit_conversion', '单位换算', '⇄', '#4CAF50', 'pages/UnitConversionPage'),
            new FeatureItem('currency', '汇率换算', '¥', '#FF9800', 'pages/CurrencyConversionPage'),
            new FeatureItem('date_calc', '日期计算', '📅', '#2196F3', 'pages/DateCalcPage'),
            new FeatureItem('bmi', 'BMI计算', '⚖', '#9C27B0', 'pages/BMIPage'),
            new FeatureItem('tip', '小费计算', '💰', '#F44336', 'pages/TipPage'),
            new FeatureItem('mortgage', '房贷计算', '🏠', '#795548', 'pages/MortgagePage'),
        ], this, "features");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: FeatureMenuPage_Params) {
        if (params.features !== undefined) {
            this.features = params.features;
        }
    }
    updateStateVars(params: FeatureMenuPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__features.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__features.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __features: ObservedPropertyObjectPU<FeatureItem[]>;
    get features() {
        return this.__features.get();
    }
    set features(newValue: FeatureItem[]) {
        this.__features.set(newValue);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor('#FFFFFF');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 顶部导航栏
            Row.create();
            // 顶部导航栏
            Row.width('100%');
            // 顶部导航栏
            Row.height({ "id": 16777271, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
            // 顶部导航栏
            Row.padding({ left: 16, right: 16 });
            // 顶部导航栏
            Row.backgroundColor('#FFFFFF');
            // 顶部导航栏
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
            Text.create('功能菜单');
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
        // 顶部导航栏
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 功能列表
            Scroll.create();
            // 功能列表
            Scroll.layoutWeight(1);
            // 功能列表
            Scroll.backgroundColor('#F1F3F5');
            // 功能列表
            Scroll.width('100%');
        }, Scroll);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Grid.create();
            Grid.columnsTemplate('1fr 1fr');
            Grid.columnsGap(12);
            Grid.rowsGap(12);
            Grid.padding({ left: 16, right: 16, top: 20, bottom: 20 });
            Grid.width('100%');
        }, Grid);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = (_item, index: number) => {
                const item = _item;
                {
                    const itemCreation2 = (elmtId, isInitialRender) => {
                        GridItem.create(() => { }, false);
                    };
                    const observedDeepRender = () => {
                        this.observeComponentCreation2(itemCreation2, GridItem);
                        this.buildFeatureCard.bind(this)(item);
                        GridItem.pop();
                    };
                    observedDeepRender();
                }
            };
            this.forEachUpdateFunction(elmtId, this.features, forEachItemGenFunction, (item: FeatureItem) => item.id, true, false);
        }, ForEach);
        ForEach.pop();
        Grid.pop();
        // 功能列表
        Scroll.pop();
        Column.pop();
    }
    /**
     * 构建功能卡片
     */
    buildFeatureCard(item: FeatureItem, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.padding({ top: 24, bottom: 24 });
            Column.backgroundColor('#FFFFFF');
            Column.borderRadius(16);
            Column.border({ width: 1, color: '#EEEEEE' });
            Column.shadow({ radius: 4, color: '#0A000000', offsetY: 2 });
            Column.onClick(() => {
                if (item.route !== '') {
                    router.pushUrl({ url: item.route });
                }
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(item.icon);
            Text.fontSize(36);
            Text.margin({ bottom: 12 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(item.name);
            Text.fontSize({ "id": 16777262, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
            Text.fontWeight(FontWeight.Medium);
            Text.fontColor('#1A1A1A');
            Text.margin({ bottom: 6 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (item.route !== '') {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('点击进入 →');
                        Text.fontSize({ "id": 16777266, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
                        Text.fontColor('#999999');
                    }, Text);
                    Text.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('即将推出');
                        Text.fontSize({ "id": 16777266, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
                        Text.fontColor('#BBBBBB');
                    }, Text);
                    Text.pop();
                });
            }
        }, If);
        If.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "FeatureMenuPage";
    }
}
registerNamedRoute(() => new FeatureMenuPage(undefined, {}), "", { bundleName: "com.example.simplecalculator", moduleName: "entry", pagePath: "pages/FeatureMenuPage", pageFullPath: "entry/src/main/ets/pages/FeatureMenuPage", integratedHsp: "false", moduleType: "followWithHap" });
