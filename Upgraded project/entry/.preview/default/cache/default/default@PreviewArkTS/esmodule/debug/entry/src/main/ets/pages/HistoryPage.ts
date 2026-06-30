if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface HistoryPage_Params {
    records?: Array<HistoryItem>;
    hasRecords?: boolean;
}
import router from "@ohos:router";
import historyViewModel from "@bundle:com.example.simplecalculator/entry/ets/viewmodel/HistoryViewModel";
import type { HistoryItem } from '../model/HistoryItem';
class HistoryPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__records = new ObservedPropertyObjectPU(historyViewModel.getRecords(), this, "records");
        this.__hasRecords = new ObservedPropertySimplePU(historyViewModel.getCount() > 0, this, "hasRecords");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: HistoryPage_Params) {
        if (params.records !== undefined) {
            this.records = params.records;
        }
        if (params.hasRecords !== undefined) {
            this.hasRecords = params.hasRecords;
        }
    }
    updateStateVars(params: HistoryPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__records.purgeDependencyOnElmtId(rmElmtId);
        this.__hasRecords.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__records.aboutToBeDeleted();
        this.__hasRecords.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __records: ObservedPropertyObjectPU<Array<HistoryItem>>;
    get records() {
        return this.__records.get();
    }
    set records(newValue: Array<HistoryItem>) {
        this.__records.set(newValue);
    }
    private __hasRecords: ObservedPropertySimplePU<boolean>;
    get hasRecords() {
        return this.__hasRecords.get();
    }
    set hasRecords(newValue: boolean) {
        this.__hasRecords.set(newValue);
    }
    aboutToAppear(): void {
        this.refreshList();
    }
    refreshList(): void {
        this.records = historyViewModel.getRecords();
        this.hasRecords = this.records.length > 0;
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/HistoryPage.ets(21:5)", "entry");
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor('#F5F5F5');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // Title bar
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/HistoryPage.ets(23:7)", "entry");
            // Title bar
            Row.width('100%');
            // Title bar
            Row.height({ "id": 16777270, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
            // Title bar
            Row.backgroundColor('#F5F5F5');
            // Title bar
            Row.padding({ left: 4, right: 4 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('←');
            Text.debugLine("entry/src/main/ets/pages/HistoryPage.ets(24:9)", "entry");
            Text.fontSize({ "id": 16777260, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
            Text.fontColor(Color.Black);
            Text.padding({ left: 12, right: 12, top: 8, bottom: 8 });
            Text.onClick(() => {
                router.back();
            });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
            Blank.debugLine("entry/src/main/ets/pages/HistoryPage.ets(32:9)", "entry");
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('计算记录');
            Text.debugLine("entry/src/main/ets/pages/HistoryPage.ets(34:9)", "entry");
            Text.fontSize({ "id": 16777266, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
            Text.fontColor('#182431');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
            Blank.debugLine("entry/src/main/ets/pages/HistoryPage.ets(38:9)", "entry");
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('清空');
            Text.debugLine("entry/src/main/ets/pages/HistoryPage.ets(40:9)", "entry");
            Text.fontSize({ "id": 16777262, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
            Text.fontColor(this.hasRecords ? '#007DFF' : '#CCCCCC');
            Text.padding({ left: 12, right: 12, top: 8, bottom: 8 });
            Text.onClick(() => {
                if (this.hasRecords) {
                    historyViewModel.clearAll();
                    this.refreshList();
                }
            });
        }, Text);
        Text.pop();
        // Title bar
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // Divider
            Divider.create();
            Divider.debugLine("entry/src/main/ets/pages/HistoryPage.ets(57:7)", "entry");
            // Divider
            Divider.strokeWidth(1);
            // Divider
            Divider.color('#E0E0E0');
        }, Divider);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            // History list
            if (this.hasRecords) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        List.create();
                        List.debugLine("entry/src/main/ets/pages/HistoryPage.ets(63:9)", "entry");
                        List.width('100%');
                        List.layoutWeight(1);
                        List.backgroundColor('#F5F5F5');
                        List.padding({ top: 4, bottom: 4 });
                        List.divider({
                            strokeWidth: 0
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
                                    ListItem.borderRadius(8);
                                    ListItem.backgroundColor(Color.White);
                                    ListItem.margin({ left: 12, right: 12, top: 4, bottom: 4 });
                                    ListItem.shadow({
                                        radius: 2,
                                        color: '#10000000',
                                        offsetY: 1
                                    });
                                    ListItem.debugLine("entry/src/main/ets/pages/HistoryPage.ets(65:13)", "entry");
                                };
                                const deepRenderFunction = (elmtId, isInitialRender) => {
                                    itemCreation(elmtId, isInitialRender);
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        Column.create();
                                        Column.debugLine("entry/src/main/ets/pages/HistoryPage.ets(66:15)", "entry");
                                        Column.width('100%');
                                        Column.alignItems(HorizontalAlign.End);
                                        Column.padding({ left: 16, right: 16, top: 14, bottom: 14 });
                                    }, Column);
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        Text.create(item.expression);
                                        Text.debugLine("entry/src/main/ets/pages/HistoryPage.ets(67:17)", "entry");
                                        Text.fontSize({ "id": 16777266, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
                                        Text.fontColor('#007DFF');
                                        Text.maxLines(1);
                                        Text.textOverflow({ overflow: TextOverflow.Ellipsis });
                                        Text.width('100%');
                                        Text.textAlign(TextAlign.End);
                                    }, Text);
                                    Text.pop();
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        Text.create(`= ${item.result}`);
                                        Text.debugLine("entry/src/main/ets/pages/HistoryPage.ets(75:17)", "entry");
                                        Text.fontSize({ "id": 16777271, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
                                        Text.fontColor('#182431');
                                        Text.fontWeight(FontWeight.Bold);
                                        Text.maxLines(1);
                                        Text.textOverflow({ overflow: TextOverflow.Ellipsis });
                                        Text.width('100%');
                                        Text.textAlign(TextAlign.End);
                                        Text.margin({ top: 4 });
                                    }, Text);
                                    Text.pop();
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        Text.create(this.formatTime(item.timestamp));
                                        Text.debugLine("entry/src/main/ets/pages/HistoryPage.ets(85:17)", "entry");
                                        Text.fontSize({ "id": 16777264, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
                                        Text.fontColor('#AAAAAA');
                                        Text.margin({ top: 6 });
                                    }, Text);
                                    Text.pop();
                                    Column.pop();
                                    ListItem.pop();
                                };
                                this.observeComponentCreation2(itemCreation2, ListItem);
                                ListItem.pop();
                            }
                        };
                        this.forEachUpdateFunction(elmtId, this.records, forEachItemGenFunction, (item: HistoryItem) => item.timestamp.toString(), true, false);
                    }, ForEach);
                    ForEach.pop();
                    List.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        // Empty state
                        Column.create();
                        Column.debugLine("entry/src/main/ets/pages/HistoryPage.ets(113:9)", "entry");
                        // Empty state
                        Column.width('100%');
                        // Empty state
                        Column.layoutWeight(1);
                        // Empty state
                        Column.justifyContent(FlexAlign.Center);
                        // Empty state
                        Column.backgroundColor('#F5F5F5');
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('暂无计算记录');
                        Text.debugLine("entry/src/main/ets/pages/HistoryPage.ets(114:11)", "entry");
                        Text.fontSize({ "id": 16777261, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
                        Text.fontColor('#AAAAAA');
                        Text.margin({ top: 20 });
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('在计算器页面点击 + 按钮添加记录');
                        Text.debugLine("entry/src/main/ets/pages/HistoryPage.ets(119:11)", "entry");
                        Text.fontSize({ "id": 16777262, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
                        Text.fontColor('#CCCCCC');
                        Text.margin({ top: 6 });
                    }, Text);
                    Text.pop();
                    // Empty state
                    Column.pop();
                });
            }
        }, If);
        If.pop();
        Column.pop();
    }
    /**
     * Format timestamp to readable time string.
     */
    formatTime(timestamp: number): string {
        let date = new Date(timestamp);
        let year = date.getFullYear();
        let month = (date.getMonth() + 1).toString().padStart(2, '0');
        let day = date.getDate().toString().padStart(2, '0');
        let hour = date.getHours().toString().padStart(2, '0');
        let min = date.getMinutes().toString().padStart(2, '0');
        let sec = date.getSeconds().toString().padStart(2, '0');
        return `${year}-${month}-${day} ${hour}:${min}:${sec}`;
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "HistoryPage";
    }
}
registerNamedRoute(() => new HistoryPage(undefined, {}), "", { bundleName: "com.example.simplecalculator", moduleName: "entry", pagePath: "pages/HistoryPage", pageFullPath: "entry/src/main/ets/pages/HistoryPage", integratedHsp: "false", moduleType: "followWithHap" });
