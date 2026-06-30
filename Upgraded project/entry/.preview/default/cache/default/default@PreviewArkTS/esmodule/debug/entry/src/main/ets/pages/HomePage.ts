if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface HomePage_Params {
    inputValue?: string;
    calValue?: string;
    scientificMode?: boolean;
    trigMode?: boolean;
    isScientificNotation?: boolean;
    pressKeys?: Array<Array<PressKeysBean>>;
    expressions?: Array<string>;
}
import router from "@ohos:router";
import Logger from "@bundle:com.example.simplecalculator/entry/ets/common/util/Logger";
import CalculateUtil from "@bundle:com.example.simplecalculator/entry/ets/common/util/CalculateUtil";
import CheckEmptyUtil from "@bundle:com.example.simplecalculator/entry/ets/common/util/CheckEmptyUtil";
import keysModel from "@bundle:com.example.simplecalculator/entry/ets/viewmodel/PresskeysViewModel";
import type { PressKeysBean } from '../viewmodel/PressKeysItem';
import { CommonConstants, Symbol, FunctionType } from "@bundle:com.example.simplecalculator/entry/ets/common/constants/CommonConstants";
import historyViewModel from "@bundle:com.example.simplecalculator/entry/ets/viewmodel/HistoryViewModel";
class HomePage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__inputValue = new ObservedPropertySimplePU('', this, "inputValue");
        this.__calValue = new ObservedPropertySimplePU('', this, "calValue");
        this.__scientificMode = new ObservedPropertySimplePU(false, this, "scientificMode");
        this.__trigMode = new ObservedPropertySimplePU(false, this, "trigMode");
        this.__isScientificNotation = new ObservedPropertySimplePU(false, this, "isScientificNotation");
        this.__pressKeys = new ObservedPropertyObjectPU(keysModel.getPressKeys(), this, "pressKeys");
        this.expressions = [];
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: HomePage_Params) {
        if (params.inputValue !== undefined) {
            this.inputValue = params.inputValue;
        }
        if (params.calValue !== undefined) {
            this.calValue = params.calValue;
        }
        if (params.scientificMode !== undefined) {
            this.scientificMode = params.scientificMode;
        }
        if (params.trigMode !== undefined) {
            this.trigMode = params.trigMode;
        }
        if (params.isScientificNotation !== undefined) {
            this.isScientificNotation = params.isScientificNotation;
        }
        if (params.pressKeys !== undefined) {
            this.pressKeys = params.pressKeys;
        }
        if (params.expressions !== undefined) {
            this.expressions = params.expressions;
        }
    }
    updateStateVars(params: HomePage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__inputValue.purgeDependencyOnElmtId(rmElmtId);
        this.__calValue.purgeDependencyOnElmtId(rmElmtId);
        this.__scientificMode.purgeDependencyOnElmtId(rmElmtId);
        this.__trigMode.purgeDependencyOnElmtId(rmElmtId);
        this.__isScientificNotation.purgeDependencyOnElmtId(rmElmtId);
        this.__pressKeys.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__inputValue.aboutToBeDeleted();
        this.__calValue.aboutToBeDeleted();
        this.__scientificMode.aboutToBeDeleted();
        this.__trigMode.aboutToBeDeleted();
        this.__isScientificNotation.aboutToBeDeleted();
        this.__pressKeys.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __inputValue: ObservedPropertySimplePU<string>;
    get inputValue() {
        return this.__inputValue.get();
    }
    set inputValue(newValue: string) {
        this.__inputValue.set(newValue);
    }
    private __calValue: ObservedPropertySimplePU<string>;
    get calValue() {
        return this.__calValue.get();
    }
    set calValue(newValue: string) {
        this.__calValue.set(newValue);
    }
    private __scientificMode: ObservedPropertySimplePU<boolean>;
    get scientificMode() {
        return this.__scientificMode.get();
    }
    set scientificMode(newValue: boolean) {
        this.__scientificMode.set(newValue);
    }
    private __trigMode: ObservedPropertySimplePU<boolean>;
    get trigMode() {
        return this.__trigMode.get();
    }
    set trigMode(newValue: boolean) {
        this.__trigMode.set(newValue);
    }
    private __isScientificNotation: ObservedPropertySimplePU<boolean>;
    get isScientificNotation() {
        return this.__isScientificNotation.get();
    }
    set isScientificNotation(newValue: boolean) {
        this.__isScientificNotation.set(newValue);
    }
    private __pressKeys: ObservedPropertyObjectPU<Array<Array<PressKeysBean>>>;
    get pressKeys() {
        return this.__pressKeys.get();
    }
    set pressKeys(newValue: Array<Array<PressKeysBean>>) {
        this.__pressKeys.set(newValue);
    }
    private expressions: Array<string>;
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/HomePage.ets(37:5)", "entry");
            Column.height(CommonConstants.FULL_PERCENT);
            Column.backgroundColor({ "id": 16777229, "type": 10001, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
            Gesture.create(GesturePriority.Low);
            PanGesture.create({ direction: PanDirection.Horizontal, distance: 80 });
            PanGesture.onActionEnd(() => {
                router.pushUrl({ url: 'pages/FeatureMenuPage' });
            });
            PanGesture.pop();
            Gesture.pop();
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/HomePage.ets(38:7)", "entry");
            Row.width(CommonConstants.FULL_PERCENT);
            Row.justifyContent(FlexAlign.Start);
            Row.padding({ left: 2, top: 1 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.trigMode ? 'TRIG' : (this.scientificMode ? 'SCI' : 'BASIC'));
            Text.debugLine("entry/src/main/ets/pages/HomePage.ets(39:9)", "entry");
            Text.fontSize({ "id": 16777241, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
            Text.fontColor(Color.White);
            Text.padding({ left: 5, right: 5, top: 1, bottom: 1 });
            Text.borderRadius(14);
            Text.backgroundColor(this.trigMode ? Color.Red : (this.scientificMode ? Color.Blue : Color.Green));
            Text.border({ width: 1, color: this.trigMode ? Color.Red : (this.scientificMode ? Color.Blue : Color.Green) });
            Text.onClick(() => {
                this.trigMode = false;
                this.scientificMode = !this.scientificMode;
                keysModel.setMode(this.scientificMode, this.trigMode);
                this.pressKeys = keysModel.getPressKeys();
            });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('S');
            Text.debugLine("entry/src/main/ets/pages/HomePage.ets(53:9)", "entry");
            Text.fontSize({ "id": 16777241, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
            Text.fontColor(Color.White);
            Text.padding({ left: 5, right: 5, top: 1, bottom: 1 });
            Text.margin({ left: 3 });
            Text.borderRadius(14);
            Text.backgroundColor(this.trigMode ? Color.Red : Color.Gray);
            Text.border({ width: 1, color: this.trigMode ? Color.Red : Color.Gray });
            Text.onClick(() => {
                this.trigMode = !this.trigMode;
                if (this.trigMode) {
                    this.scientificMode = false;
                }
                keysModel.setMode(this.scientificMode, this.trigMode);
                this.pressKeys = keysModel.getPressKeys();
            });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('F-E');
            Text.debugLine("entry/src/main/ets/pages/HomePage.ets(70:9)", "entry");
            Text.fontSize({ "id": 16777241, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
            Text.fontColor(this.isScientificNotation ? Color.White : Color.Black);
            Text.padding({ left: 5, right: 5, top: 1, bottom: 1 });
            Text.margin({ left: 3 });
            Text.borderRadius(14);
            Text.backgroundColor(this.isScientificNotation ? Color.Orange : Color.Gray);
            Text.border({ width: 1, color: this.isScientificNotation ? Color.Orange : Color.Gray });
            Text.onClick(() => {
                this.isScientificNotation = !this.isScientificNotation;
                this.getResult();
            });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
            Blank.debugLine("entry/src/main/ets/pages/HomePage.ets(83:9)", "entry");
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('待办');
            Text.debugLine("entry/src/main/ets/pages/HomePage.ets(85:9)", "entry");
            Text.fontSize({ "id": 16777262, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
            Text.fontColor('#FF6B35');
            Text.padding({ left: 8, right: 8, top: 1, bottom: 1 });
            Text.borderRadius(14);
            Text.border({ width: 1, color: '#FF6B35' });
            Text.margin({ right: 4 });
            Text.onClick(() => {
                router.pushUrl({ url: 'pages/TodoPage' });
            });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('+');
            Text.debugLine("entry/src/main/ets/pages/HomePage.ets(96:9)", "entry");
            Text.fontSize({ "id": 16777265, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
            Text.fontColor('#007DFF');
            Text.padding({ left: 8, right: 8, top: 1, bottom: 1 });
            Text.borderRadius(14);
            Text.border({ width: 1, color: '#007DFF' });
            Text.onClick(() => {
                // Save current calculation before navigating
                if (this.calValue && this.calValue !== this.resourceToString({ "id": 16777224, "type": 10003, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" })) {
                    historyViewModel.addRecord(this.inputValue, this.calValue);
                }
                router.pushUrl({ url: 'pages/HistoryPage' });
            });
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/HomePage.ets(114:7)", "entry");
            Column.width(CommonConstants.FULL_PERCENT);
            Column.height({ "id": 16777242, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
            Column.alignItems(HorizontalAlign.End);
            Column.margin({
                right: { "id": 16777243, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" },
                top: { "id": 16777244, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" }
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TextInput.create({ text: this.resultFormat(this.inputValue) });
            TextInput.debugLine("entry/src/main/ets/pages/HomePage.ets(115:9)", "entry");
            TextInput.height(CommonConstants.FULL_PERCENT);
            TextInput.fontSize((this.inputValue.length > CommonConstants.INPUT_LENGTH_MAX) ? { "id": 16777241, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" } : { "id": 16777240, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
            TextInput.enabled(false);
            TextInput.fontColor(Color.Black);
            TextInput.textAlign(TextAlign.End);
            TextInput.padding(0);
            TextInput.backgroundColor({ "id": 16777231, "type": 10001, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
        }, TextInput);
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/HomePage.ets(135:7)", "entry");
            Column.width(CommonConstants.FULL_PERCENT);
            Column.height({ "id": 16777251, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
            Column.alignItems(HorizontalAlign.End);
            Column.margin({
                right: { "id": 16777253, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" },
                bottom: { "id": 16777252, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" }
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.resultFormat(this.calValue));
            Text.debugLine("entry/src/main/ets/pages/HomePage.ets(136:9)", "entry");
            Text.fontSize({ "id": 16777241, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
            Text.fontColor({ "id": 16777234, "type": 10001, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/HomePage.ets(148:7)", "entry");
            Column.layoutWeight(1);
            Column.width(CommonConstants.FULL_PERCENT);
            Column.backgroundColor({ "id": 16777232, "type": 10001, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/HomePage.ets(149:9)", "entry");
            Row.layoutWeight(1);
            Row.alignItems(VerticalAlign.Top);
            Row.justifyContent(FlexAlign.SpaceEvenly);
            Row.margin({
                left: { "id": 16777248, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" },
                right: { "id": 16777249, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" }
            });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = (_item, columnItemIndex?: number) => {
                const columnItem = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                    Column.debugLine("entry/src/main/ets/pages/HomePage.ets(151:13)", "entry");
                    Column.height(CommonConstants.FULL_PERCENT);
                    Column.justifyContent(FlexAlign.SpaceEvenly);
                    Column.margin({
                        top: { "id": 16777250, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" },
                        bottom: { "id": 16777247, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" }
                    });
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    ForEach.create();
                    const forEachItemGenFunction = (_item, keyItemIndex?: number) => {
                        const keyItem = _item;
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Column.create();
                            Column.debugLine("entry/src/main/ets/pages/HomePage.ets(153:17)", "entry");
                            Column.padding({ top: { "id": 16777250, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" }, bottom: { "id": 16777247, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" } });
                            Column.justifyContent(FlexAlign.Center);
                        }, Column);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Column.create();
                            Column.debugLine("entry/src/main/ets/pages/HomePage.ets(154:19)", "entry");
                            Column.width({ "id": 16777246, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
                            Column.height((keyItemIndex === (columnItem.length - 1)) ? { "id": 16777237, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" } : { "id": 16777245, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
                            Column.borderWidth(1);
                            Column.borderColor({ "id": 16777228, "type": 10001, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
                            Column.borderRadius({ "id": 16777236, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
                            Column.backgroundColor(((columnItemIndex === (this.pressKeys.length - 1)) &&
                                (keyItemIndex === (columnItem.length - 1))) ? { "id": 16777230, "type": 10001, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" } : Color.White);
                            Column.alignItems(HorizontalAlign.Center);
                            Column.justifyContent(FlexAlign.Center);
                            Column.onClick(() => {
                                if (keyItem.flag === 0 || CalculateUtil.isFunction(keyItem.value) ||
                                    CalculateUtil.isSymbol(keyItem.value)) {
                                    this.inputSymbol(keyItem.value);
                                }
                                else {
                                    this.inputNumber(keyItem.value);
                                }
                            });
                        }, Column);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            If.create();
                            if (keyItem.flag === 0) {
                                this.ifElseBranchUpdateFunction(0, () => {
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        Image.create(keyItem.source !== undefined ? keyItem.source : '');
                                        Image.debugLine("entry/src/main/ets/pages/HomePage.ets(156:23)", "entry");
                                        Image.width('65%');
                                        Image.height('65%');
                                    }, Image);
                                });
                            }
                            else {
                                this.ifElseBranchUpdateFunction(1, () => {
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        Text.create(this.getDisplayText(keyItem.value));
                                        Text.debugLine("entry/src/main/ets/pages/HomePage.ets(160:23)", "entry");
                                        Text.fontSize((keyItem.value === CommonConstants.DOTS) ? { "id": 16777239, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" } : { "id": 16777241, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
                                        Text.textAlign(TextAlign.Center);
                                        Text.width('100%');
                                    }, Text);
                                    Text.pop();
                                });
                            }
                        }, If);
                        If.pop();
                        Column.pop();
                        Column.pop();
                    };
                    this.forEachUpdateFunction(elmtId, columnItem, forEachItemGenFunction, (keyItem: PressKeysBean) => JSON.stringify(keyItem), true, false);
                }, ForEach);
                ForEach.pop();
                Column.pop();
            };
            this.forEachUpdateFunction(elmtId, this.pressKeys, forEachItemGenFunction, (item: Array<Array<PressKeysBean>>) => JSON.stringify(item), true, false);
        }, ForEach);
        ForEach.pop();
        Row.pop();
        Column.pop();
        Column.pop();
    }
    /**
     * Input Symbols.
     *
     * @param value Input Operators.
     */
    inputSymbol(value: string) {
        if (CheckEmptyUtil.isEmpty(value)) {
            return;
        }
        let len = this.expressions.length;
        switch (value) {
            case Symbol.CLEAN:
                this.expressions = [];
                this.calValue = '';
                break;
            case Symbol.DEL:
                this.inputDelete(len);
                break;
            case Symbol.EQU:
                if (len === 0) {
                    return;
                }
                this.getResult().then((result: boolean) => {
                    if (!result) {
                        return;
                    }
                    // Save to calculation history before overwriting state
                    historyViewModel.addRecord(this.inputValue, this.calValue);
                    this.inputValue = this.calValue;
                    this.calValue = '';
                    this.expressions = [];
                    this.expressions.push(this.inputValue);
                });
                break;
            case Symbol.POWER:
                this.inputOperators(len, CommonConstants.POWER);
                break;
            case Symbol.LEFT_PAREN:
            case CommonConstants.LEFT_PAREN:
                this.inputLeftParen(len);
                break;
            case Symbol.RIGHT_PAREN:
            case CommonConstants.RIGHT_PAREN:
                this.inputRightParen(len);
                break;
            case Symbol.SIN:
            case Symbol.COS:
            case Symbol.TAN:
            case Symbol.ASIN:
            case Symbol.ACOS:
            case Symbol.ATAN:
            case Symbol.SQRT:
            case Symbol.LOG:
            case Symbol.LN:
            case Symbol.FACT:
            case Symbol.EXP:
            case Symbol.RECIPROCAL:
                this.inputFunction(len, value);
                break;
            default:
                this.inputOperators(len, value);
                break;
        }
        this.formatInputValue();
    }
    /**
     * Enter numbers.
     *
     * @param value Enter numbers.
     */
    inputNumber(value: string) {
        if (CheckEmptyUtil.isEmpty(value)) {
            return;
        }
        let len = this.expressions.length;
        let last = len > 0 ? this.expressions[len - 1] : '';
        let secondLast = len > 1 ? this.expressions[len - CommonConstants.TWO] : undefined;
        if (!this.validateEnter(last, value)) {
            return;
        }
        if (!last) {
            this.expressions.push(value);
        }
        else if (CalculateUtil.isFunction(last) || CalculateUtil.isSymbol(last)) {
            this.expressions.push(value);
        }
        else if (!secondLast) {
            this.expressions[len - 1] += value;
        }
        else if (CalculateUtil.isSymbol(secondLast) || CalculateUtil.isFunction(secondLast)) {
            this.expressions[len - 1] += value;
        }
        else {
            this.expressions.push(value);
        }
        this.formatInputValue();
        if (value !== CommonConstants.DOTS) {
            this.getResult();
        }
    }
    /**
     * Verify that you can enter.
     *
     * @param last Value of the last element.
     * @param value Current input value.
     * return Indicates whether to allow input.
     */
    validateEnter(last: string, value: string) {
        if (!last && value === CommonConstants.PERCENT_SIGN) {
            return false;
        }
        if ((last === CommonConstants.MIN) && (value === CommonConstants.PERCENT_SIGN)) {
            return false;
        }
        if (last.endsWith(CommonConstants.PERCENT_SIGN)) {
            return false;
        }
        if ((last.indexOf(CommonConstants.DOTS) !== -1) && (value === CommonConstants.DOTS)) {
            return false;
        }
        if ((last === '0') && (value !== CommonConstants.DOTS) &&
            (value !== CommonConstants.PERCENT_SIGN)) {
            return false;
        }
        return true;
    }
    /**
     * Delete Key Trigger.
     *
     * @param len Expression Length.
     */
    inputDelete(len: number) {
        if (len === 0) {
            return;
        }
        let last = this.expressions[len - 1];
        // Function tokens (sqrt, sin, ln, etc.) are deleted as a whole, not character by character
        if (CalculateUtil.isFunction(last)) {
            this.expressions.pop();
            len = this.expressions.length;
        }
        else if (last.length === 1) {
            this.expressions.pop();
            len = this.expressions.length;
        }
        else {
            this.expressions[len - 1] = last.slice(0, last.length - 1);
        }
        if (len === 0) {
            this.inputValue = '';
            this.calValue = '';
            return;
        }
        if (!CalculateUtil.isSymbol(this.expressions[len - 1])) {
            this.getResult();
        }
    }
    /**
     * Triggered when input is added, subtracted, multiplied, and divided.
     *
     * @param len Expression Length.
     * @param value Current Input Value.
     */
    inputOperators(len: number, value: string) {
        let last = len > 0 ? this.expressions[len - 1] : undefined;
        let secondLast = len > 1 ? this.expressions[len - CommonConstants.TWO] : undefined;
        if (!last && (value === Symbol.MIN)) {
            this.expressions.push(this.getSymbol(value));
            return;
        }
        if (!last) {
            return;
        }
        if (!CalculateUtil.isSymbol(last)) {
            this.expressions.push(this.getSymbol(value));
            return;
        }
        if ((value === Symbol.MIN) &&
            (last === CommonConstants.MIN || last === CommonConstants.ADD)) {
            this.expressions.pop();
            this.expressions.push(this.getSymbol(value));
            return;
        }
        if (!secondLast) {
            return;
        }
        if (value !== Symbol.MIN) {
            this.expressions.pop();
        }
        if (CalculateUtil.isSymbol(secondLast)) {
            this.expressions.pop();
        }
        this.expressions.push(this.getSymbol(value));
    }
    /**
     * Input left parenthesis.
     *
     * @param len Expression Length.
     */
    inputLeftParen(len: number) {
        let last = len > 0 ? this.expressions[len - 1] : undefined;
        // Can input left parenthesis after operators or at the beginning
        if (!last || CalculateUtil.isSymbol(last) || CalculateUtil.isFunction(last) || last === CommonConstants.LEFT_PAREN) {
            this.expressions.push(CommonConstants.LEFT_PAREN);
        }
    }
    /**
     * Input right parenthesis.
     *
     * @param len Expression Length.
     */
    inputRightParen(len: number) {
        let last = len > 0 ? this.expressions[len - 1] : undefined;
        // Can input right parenthesis after numbers or right parenthesis
        if (last && !CalculateUtil.isSymbol(last) && last !== CommonConstants.LEFT_PAREN) {
            // Check if there's a matching left parenthesis
            let leftParenCount = 0;
            let rightParenCount = 0;
            for (let i = 0; i < this.expressions.length; i++) {
                if (this.expressions[i] === CommonConstants.LEFT_PAREN) {
                    leftParenCount++;
                }
                else if (this.expressions[i] === CommonConstants.RIGHT_PAREN) {
                    rightParenCount++;
                }
            }
            if (leftParenCount > rightParenCount) {
                this.expressions.push(CommonConstants.RIGHT_PAREN);
                this.getResult();
            }
        }
        this.formatInputValue();
    }
    /**
     * Input function (trigonometric and inverse trigonometric).
     *
     * @param len Expression Length.
     * @param value Function type.
     */
    inputFunction(len: number, value: string) {
        let last = len > 0 ? this.expressions[len - 1] : undefined;
        // Can input function after operators, left parenthesis, another function, or at the beginning
        if (!last || CalculateUtil.isSymbol(last) || CalculateUtil.isFunction(last) || last === CommonConstants.LEFT_PAREN) {
            let funcSymbol = '';
            switch (value) {
                case Symbol.SIN:
                    funcSymbol = FunctionType.SIN;
                    break;
                case Symbol.COS:
                    funcSymbol = FunctionType.COS;
                    break;
                case Symbol.TAN:
                    funcSymbol = FunctionType.TAN;
                    break;
                case Symbol.ASIN:
                    funcSymbol = FunctionType.ASIN;
                    break;
                case Symbol.ACOS:
                    funcSymbol = FunctionType.ACOS;
                    break;
                case Symbol.ATAN:
                    funcSymbol = FunctionType.ATAN;
                    break;
                case Symbol.SQRT:
                    funcSymbol = FunctionType.SQRT;
                    break;
                case Symbol.LOG:
                    funcSymbol = FunctionType.LOG;
                    break;
                case Symbol.LN:
                    funcSymbol = FunctionType.LN;
                    break;
                case Symbol.FACT:
                    funcSymbol = FunctionType.FACT;
                    break;
                case Symbol.EXP:
                    funcSymbol = FunctionType.EXP;
                    break;
                case Symbol.RECIPROCAL:
                    funcSymbol = FunctionType.RECIPROCAL;
                    break;
                default:
                    break;
            }
            if (funcSymbol) {
                this.expressions.push(funcSymbol);
                // Don't automatically add left parenthesis
                // Let the parser handle implicit parentheses
                // Call getResult to update calculation display
                this.getResult();
            }
        }
    }
    /**
     * Get Operator.
     *
     * @param value.
     * @return Operators.
     */
    getSymbol(value: string) {
        if (CheckEmptyUtil.isEmpty(value)) {
            return '';
        }
        let symbol = '';
        switch (value) {
            case Symbol.ADD:
                symbol = CommonConstants.ADD;
                break;
            case Symbol.MIN:
                symbol = CommonConstants.MIN;
                break;
            case Symbol.MUL:
                symbol = CommonConstants.MUL;
                break;
            case Symbol.DIV:
                symbol = CommonConstants.DIV;
                break;
            case CommonConstants.POWER:
                symbol = CommonConstants.POWER;
                break;
            default:
                break;
        }
        return symbol;
    }
    /**
     * Make a deep copy of an expression.
     *
     * @return deep copy expression.
     */
    deepCopy(): Array<string> {
        let copyExpressions: Array<string> = Array.from(this.expressions);
        return copyExpressions;
    }
    /**
     * Obtaining Results.
     *
     * @return Whether the result is incorrect.
     */
    async getResult() {
        let expressions = this.deepCopy();
        // If expression ends with a function (no operand yet), skip calculation — don't show error
        if (expressions.length > 0 && CalculateUtil.isFunction(expressions[expressions.length - 1])) {
            return false;
        }
        // Auto-complete missing right parentheses for functions
        let leftParenCount = 0;
        let rightParenCount = 0;
        for (let i = 0; i < expressions.length; i++) {
            if (expressions[i] === CommonConstants.LEFT_PAREN) {
                leftParenCount++;
            }
            else if (expressions[i] === CommonConstants.RIGHT_PAREN) {
                rightParenCount++;
            }
        }
        // Add missing right parentheses
        while (leftParenCount > rightParenCount) {
            expressions.push(CommonConstants.RIGHT_PAREN);
            rightParenCount++;
        }
        let calResult = CalculateUtil.parseExpression(expressions);
        if (calResult === 'NaN') {
            this.calValue = this.resourceToString({ "id": 16777224, "type": 10003, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
            return false;
        }
        this.calValue = this.isScientificNotation ? this.convertToScientific(calResult) : calResult;
        // Update the actual expression to include the auto-completed right parentheses
        // so that subsequent input goes AFTER the closed parentheses, not inside them.
        let actualLeft = 0;
        let actualRight = 0;
        for (let i = 0; i < this.expressions.length; i++) {
            if (this.expressions[i] === CommonConstants.LEFT_PAREN) {
                actualLeft++;
            }
            else if (this.expressions[i] === CommonConstants.RIGHT_PAREN) {
                actualRight++;
            }
        }
        while (actualLeft > actualRight) {
            this.expressions.push(CommonConstants.RIGHT_PAREN);
            actualRight++;
        }
        return true;
    }
    /**
     * Convert result to scientific notation display format.
     *
     * @param value Numeric string.
     * @return Scientific notation string.
     */
    convertToScientific(value: string): string {
        let num = Number(value);
        if (isNaN(num))
            return value;
        if (num === 0)
            return '0';
        let expStr = num.toExponential(10);
        let parts = expStr.split('e');
        let mantissa = parts[0].replace(/0+$/, '').replace(/\.$/, '');
        let exponent = parts[1];
        if (exponent.startsWith('+')) {
            exponent = exponent.substring(1);
        }
        // Remove leading zeros from exponent
        if (exponent.startsWith('-')) {
            exponent = '-' + parseInt(exponent.substring(1)).toString();
        }
        else {
            exponent = parseInt(exponent).toString();
        }
        return mantissa + 'e' + exponent;
    }
    /**
     * Number Formatting.
     *
     * @param value Formatting parameters.
     * @return Thousand percentile data.
     */
    resultFormat(value: string) {
        // Only format numeric values, not function symbols
        if (isNaN(Number(value)) && value !== '.' && !value.includes('E')) {
            return value;
        }
        let reg = (value.indexOf('.') > -1) ? /(\d)(?=(\d{3})+\.)/g : /(\d)(?=(?:\d{3})+$)/g;
        return value.replace(reg, '$1,');
    }
    /**
     * Convert a resource file to a string.
     *
     * @param resource Resource file.
     * @return Character string converted from the resource file.
     */
    resourceToString(resource: Resource): string {
        if (CheckEmptyUtil.isEmpty(resource)) {
            return '';
        }
        let result = '';
        try {
            const uiContext: UIContext | undefined = AppStorage.get('uiContext');
            let context = uiContext!.getHostContext()!;
            result = context.resourceManager.getStringSync(resource.id);
        }
        catch (error) {
            Logger.error('[Calculate] resourceToString error: ' + JSON.stringify(error));
            result = '';
        }
        return result;
    }
    /**
     * Format the expression array into a display string.
     */
    formatInputValue(): void {
        let displayStr = '';
        for (let i = 0; i < this.expressions.length; i++) {
            let item = this.expressions[i];
            displayStr += this.getDisplayText(item);
        }
        this.inputValue = displayStr;
    }
    /**
     * Map internal function/operator tokens to display text.
     *
     * @param value Internal token.
     * @return Display text.
     */
    getDisplayText(value: string): string {
        switch (value) {
            case CommonConstants.ADD:
                return '+';
            case CommonConstants.MIN:
                return '-';
            case CommonConstants.MUL:
                return '\u00D7';
            case CommonConstants.DIV:
                return '\u00F7';
            case CommonConstants.POWER:
                return '^';
            case CommonConstants.LEFT_PAREN:
                return '(';
            case CommonConstants.RIGHT_PAREN:
                return ')';
            case CommonConstants.PERCENT_SIGN:
                return '%';
            case CommonConstants.DOTS:
                return '.';
            case FunctionType.SIN:
                return 'sin';
            case FunctionType.COS:
                return 'cos';
            case FunctionType.TAN:
                return 'tan';
            case FunctionType.ASIN:
                return 'asin';
            case FunctionType.ACOS:
                return 'acos';
            case FunctionType.ATAN:
                return 'atan';
            case FunctionType.SQRT:
                return '\u221A';
            case FunctionType.LOG:
                return 'log';
            case FunctionType.LN:
                return 'ln';
            case FunctionType.FACT:
                return '!';
            case FunctionType.EXP:
                return 'exp';
            case FunctionType.RECIPROCAL:
                return '1/x';
            default:
                return value;
        }
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "HomePage";
    }
}
registerNamedRoute(() => new HomePage(undefined, {}), "", { bundleName: "com.example.simplecalculator", moduleName: "entry", pagePath: "pages/HomePage", pageFullPath: "entry/src/main/ets/pages/HomePage", integratedHsp: "false", moduleType: "followWithHap" });
