/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import router from '@ohos.router';
import Logger from '../common/util/Logger';
import CalculateUtil from '../common/util/CalculateUtil';
import CheckEmptyUtil from '../common/util/CheckEmptyUtil';
import keysModel from '../viewmodel/PresskeysViewModel';
import { PressKeysBean } from '../viewmodel/PressKeysItem';
import { CommonConstants, Symbol, SymbolicEnumeration, FunctionType } from '../common/constants/CommonConstants';
import historyViewModel from '../viewmodel/HistoryViewModel';

@Entry
@Component
struct HomePage {
  @State inputValue: string = '';
  @State calValue: string = '';
  @State scientificMode: boolean = false;
  @State trigMode: boolean = false;
  @State isScientificNotation: boolean = false;
  @State pressKeys: Array<Array<PressKeysBean>> = keysModel.getPressKeys();
  private expressions: Array<string> = [];

  build() {
    Column() {
      Row() {
        Text(this.trigMode ? 'TRIG' : (this.scientificMode ? 'SCI' : 'BASIC'))
          .fontSize($r('app.float.font_size_text'))
          .fontColor(Color.White)
          .padding({ left: 5, right: 5, top: 1, bottom: 1 })
          .borderRadius(14)
          .backgroundColor(this.trigMode ? Color.Red : (this.scientificMode ? Color.Blue : Color.Green))
          .border({ width: 1, color: this.trigMode ? Color.Red : (this.scientificMode ? Color.Blue : Color.Green) })
          .onClick(() => {
            this.trigMode = false;
            this.scientificMode = !this.scientificMode;
            keysModel.setMode(this.scientificMode, this.trigMode);
            this.pressKeys = keysModel.getPressKeys();
          })

        Text('S')
          .fontSize($r('app.float.font_size_text'))
          .fontColor(Color.White)
          .padding({ left: 5, right: 5, top: 1, bottom: 1 })
          .margin({ left: 3 })
          .borderRadius(14)
          .backgroundColor(this.trigMode ? Color.Red : Color.Gray)
          .border({ width: 1, color: this.trigMode ? Color.Red : Color.Gray })
          .onClick(() => {
            this.trigMode = !this.trigMode;
            if (this.trigMode) {
              this.scientificMode = false;
            }
            keysModel.setMode(this.scientificMode, this.trigMode);
            this.pressKeys = keysModel.getPressKeys();
          })

        Text('F-E')
          .fontSize($r('app.float.font_size_text'))
          .fontColor(this.isScientificNotation ? Color.White : Color.Black)
          .padding({ left: 5, right: 5, top: 1, bottom: 1 })
          .margin({ left: 3 })
          .borderRadius(14)
          .backgroundColor(this.isScientificNotation ? Color.Orange : Color.Gray)
          .border({ width: 1, color: this.isScientificNotation ? Color.Orange : Color.Gray })
          .onClick(() => {
            this.isScientificNotation = !this.isScientificNotation;
            this.getResult();
          })

        Blank()

        Text('待办')
          .fontSize($r('app.float.font_size_caption'))
          .fontColor('#FF6B35')
          .padding({ left: 8, right: 8, top: 1, bottom: 1 })
          .borderRadius(14)
          .border({ width: 1, color: '#FF6B35' })
          .margin({ right: 4 })
          .onClick(() => {
            router.pushUrl({ url: 'pages/TodoPage' });
          })

        Text('+')
          .fontSize($r('app.float.font_size_title_large'))
          .fontColor('#007DFF')
          .padding({ left: 8, right: 8, top: 1, bottom: 1 })
          .borderRadius(14)
          .border({ width: 1, color: '#007DFF' })
          .onClick(() => {
            // Save current calculation before navigating
            if (this.calValue && this.calValue !== this.resourceToString($r('app.string.error'))) {
              historyViewModel.addRecord(this.inputValue, this.calValue);
            }
            router.pushUrl({ url: 'pages/HistoryPage' });
          })
      }
      .width(CommonConstants.FULL_PERCENT)
      .justifyContent(FlexAlign.Start)
      .padding({ left: 2, top: 1 })

      Column() {
        TextInput({ text: this.resultFormat(this.inputValue) })
          .height(CommonConstants.FULL_PERCENT)
          .fontSize(
            (this.inputValue.length > CommonConstants.INPUT_LENGTH_MAX) ?
              $r('app.float.font_size_text') : $r('app.float.font_size_input')
          )
          .enabled(false)
          .fontColor(Color.Black)
          .textAlign(TextAlign.End)
          .padding(0)
          .backgroundColor($r('app.color.input_back_color'))
      }
      .width(CommonConstants.FULL_PERCENT)
      .height($r('app.float.input_height'))
      .alignItems(HorizontalAlign.End)
      .margin({
        right: $r('app.float.input_margin_right'),
        top: $r('app.float.input_margin_top')
      })

      Column() {
        Text(this.resultFormat(this.calValue))
          .fontSize($r('app.float.font_size_text'))
          .fontColor($r('app.color.text_color'))
      }
      .width(CommonConstants.FULL_PERCENT)
      .height($r('app.float.text_height'))
      .alignItems(HorizontalAlign.End)
      .margin({
        right: $r('app.float.text_margin_right'),
        bottom: $r('app.float.text_margin_bottom')
      })

      Column() {
        Row() {
          ForEach(this.pressKeys, (columnItem: Array<PressKeysBean>, columnItemIndex?: number) => {
            Column() {
              ForEach(columnItem, (keyItem: PressKeysBean, keyItemIndex?: number) => {
                Column() {
                  Column() {
                    if (keyItem.flag === 0) {
                      Image(keyItem.source !== undefined ? keyItem.source : '')
                        .width('65%')
                        .height('65%')
                    } else {
                      Text(this.getDisplayText(keyItem.value))
                        .fontSize(
                          (keyItem.value === CommonConstants.DOTS) ?
                            $r('app.float.font_size_dot') : $r('app.float.font_size_text')
                        )
                        .textAlign(TextAlign.Center)
                        .width('100%')
                    }
                  }
                  .width($r('app.float.key_width'))
                  .height(
                    (keyItemIndex === (columnItem.length - 1)) ?
                      $r('app.float.equals_height') : $r('app.float.key_height')
                  )
                  .borderWidth(1)
                  .borderColor($r('app.color.border_color'))
                  .borderRadius($r('app.float.border_radius'))
                  .backgroundColor(
                    ((columnItemIndex === (this.pressKeys.length - 1)) &&
                      (keyItemIndex === (columnItem.length - 1))) ?
                      $r('app.color.equals_back_color') : Color.White
                  )
                  .alignItems(HorizontalAlign.Center)
                  .justifyContent(FlexAlign.Center)
                  .onClick(() => {
                    if (keyItem.flag === 0 || CalculateUtil.isFunction(keyItem.value) ||
                        CalculateUtil.isSymbol(keyItem.value)) {
                      this.inputSymbol(keyItem.value);
                    } else {
                      this.inputNumber(keyItem.value);
                    }
                  })
                }
                .padding({ top: $r('app.float.margin_top'), bottom: $r('app.float.margin_bottom') })
                .justifyContent(FlexAlign.Center)
              }, (keyItem: PressKeysBean) => JSON.stringify(keyItem))
            }
            .height(CommonConstants.FULL_PERCENT)
            .justifyContent(FlexAlign.SpaceEvenly)
            .margin({
              top: $r('app.float.margin_top'),
              bottom: $r('app.float.margin_bottom')
            })
          }, (item: Array<Array<PressKeysBean>>) => JSON.stringify(item))
        }
        .layoutWeight(1)
        .alignItems(VerticalAlign.Top)
        .justifyContent(FlexAlign.SpaceEvenly)
        .margin({
          left: $r('app.float.margin_left'),
          right: $r('app.float.margin_right')
        })
      }
      .layoutWeight(1)
      .width(CommonConstants.FULL_PERCENT)
      .backgroundColor($r('app.color.row_back_color'))
    }
    .height(CommonConstants.FULL_PERCENT)
    .backgroundColor($r('app.color.column_back_color'))
    .gesture(
      PanGesture({ direction: PanDirection.Horizontal, distance: 80 })
        .onActionEnd(() => {
          router.pushUrl({ url: 'pages/FeatureMenuPage' });
        })
    )
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
        })
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
    } else if (CalculateUtil.isFunction(last) || CalculateUtil.isSymbol(last)) {
      this.expressions.push(value);
    } else if (!secondLast) {
      this.expressions[len - 1] += value;
    } else if (CalculateUtil.isSymbol(secondLast) || CalculateUtil.isFunction(secondLast)) {
      this.expressions[len - 1] += value;
    } else {
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
    } else if (last.length === 1) {
      this.expressions.pop();
      len = this.expressions.length;
    } else {
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
        } else if (this.expressions[i] === CommonConstants.RIGHT_PAREN) {
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
      } else if (expressions[i] === CommonConstants.RIGHT_PAREN) {
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
      this.calValue = this.resourceToString($r('app.string.error'));
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
      } else if (this.expressions[i] === CommonConstants.RIGHT_PAREN) {
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
    if (isNaN(num)) return value;
    if (num === 0) return '0';
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
    } else {
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
    } catch (error) {
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
}
