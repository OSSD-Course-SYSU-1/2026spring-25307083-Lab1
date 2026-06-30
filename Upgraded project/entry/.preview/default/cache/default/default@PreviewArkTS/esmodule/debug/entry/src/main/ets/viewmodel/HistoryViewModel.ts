import { HistoryItem } from "@bundle:com.example.simplecalculator/entry/ets/model/HistoryItem";
/**
 * ViewModel for managing calculation history records.
 * Singleton pattern — shared across the app.
 */
class HistoryViewModel {
    private records: Array<HistoryItem> = [];
    /**
     * Add a new calculation record.
     * @param expression The expression as displayed.
     * @param result The calculation result.
     */
    addRecord(expression: string, result: string): void {
        if (!expression || !result) {
            return;
        }
        // Don't add duplicate of the last record
        if (this.records.length > 0) {
            let last = this.records[this.records.length - 1];
            if (last.expression === expression && last.result === result) {
                return;
            }
        }
        this.records.push(new HistoryItem(expression, result));
    }
    /**
     * Get all history records (newest first).
     */
    getRecords(): Array<HistoryItem> {
        return this.records.slice().reverse();
    }
    /**
     * Get the number of records.
     */
    getCount(): number {
        return this.records.length;
    }
    /**
     * Clear all history records.
     */
    clearAll(): void {
        this.records = [];
    }
}
export default new HistoryViewModel();
