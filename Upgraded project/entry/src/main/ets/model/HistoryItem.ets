/**
 * Calculation history record model.
 */
export class HistoryItem {
  /** Display expression (e.g., "sin(30)") */
  expression: string;
  /** Calculation result */
  result: string;
  /** Timestamp when the record was created */
  timestamp: number;

  constructor(expression: string, result: string) {
    this.expression = expression;
    this.result = result;
    this.timestamp = Date.now();
  }

  /** Full display string: "expression = result" */
  get displayText(): string {
    return `${this.expression} = ${this.result}`;
  }
}
