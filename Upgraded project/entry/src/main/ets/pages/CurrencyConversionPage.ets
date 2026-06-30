/*
 * Currency Conversion Page - 汇率换算页面
 * 支持多币种之间的实时换算
 */

import router from '@ohos.router';

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

@Entry
@Component
struct CurrencyConversionPage {
  @State currencies: CurrencyDef[] = [
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
  ];

  @State fromCurrencyIndex: number = 0; // 默认人民币
  @State toCurrencyIndex: number = 1;   // 默认美元
  @State inputValue: string = '100';
  @State outputValue: string = '';
  @State showFromPicker: boolean = false;
  @State showToPicker: boolean = false;
  @State inputFocused: boolean = false;

  aboutToAppear(): void {
    this.doConversion();
  }

  build() {
    Stack() {
      Column() {
        this.buildHeader();

        Scroll() {
          Column() {
            // 源币种
            this.buildCurrencyPanel(
              '持有',
              this.fromCurrencyIndex,
              this.inputValue,
              true,
              () => { this.showFromPicker = true; },
              (val: string) => {
                this.inputValue = val;
                this.doConversion();
              }
            );

            // 交换按钮
            Row() {
              Button() {
                Text('⇅ 交换币种')
                  .fontSize($r('app.float.font_size_caption'))
                  .fontColor('#007DFF')
              }
              .backgroundColor('#F0F7FF')
              .borderRadius(20)
              .height(36)
              .padding({ left: 16, right: 16 })
              .border({ width: 1, color: '#007DFF' })
              .onClick(() => {
                let temp = this.fromCurrencyIndex;
                this.fromCurrencyIndex = this.toCurrencyIndex;
                this.toCurrencyIndex = temp;
                this.doConversion();
              })
            }
            .width('100%')
            .justifyContent(FlexAlign.Center)
            .margin({ top: 8, bottom: 8 })

            // 目标币种
            this.buildCurrencyPanel(
              '兑换',
              this.toCurrencyIndex,
              this.outputValue,
              false,
              () => { this.showToPicker = true; },
              () => {}
            );

            // 汇率为参考值提示
            Text('* 汇率为参考值，实际以银行公布为准')
              .fontSize($r('app.float.font_size_tiny'))
              .fontColor('#BBBBBB')
              .margin({ top: 8 })
              .textAlign(TextAlign.Center)

            // 汇率信息
            Text(this.getRateInfo())
              .fontSize($r('app.float.font_size_small'))
              .fontColor('#666666')
              .margin({ top: 4 })
              .textAlign(TextAlign.Center)
          }
          .padding({ left: 16, right: 16, top: 16, bottom: 16 })
          .width('100%')
        }
        .layoutWeight(1)
        .width('100%')

        // 数字键盘
        this.buildNumberPad()
      }
      .width('100%')
      .height('100%')
      .backgroundColor('#F1F3F5')

      // 币种选择弹窗 - 覆盖层
      if (this.showFromPicker || this.showToPicker) {
        this.buildCurrencyPicker()
      }
    }
    .width('100%')
    .height('100%')
  }

  @Builder
  buildHeader() {
    Row() {
      Button({ type: ButtonType.Circle }) {
        Text('←')
          .fontSize($r('app.float.font_size_title_large'))
          .fontColor('#333333')
      }
      .width($r('app.float.icon_size_back'))
      .height($r('app.float.icon_size_back'))
      .backgroundColor(Color.Transparent)
      .onClick(() => { router.back(); })

      Text('汇率换算')
        .fontSize($r('app.float.font_size_title_large'))
        .fontWeight(FontWeight.Bold)
        .fontColor('#1A1A1A')
        .margin({ left: 8 })
    }
    .width('100%')
    .height($r('app.float.page_header_height'))
    .padding({ left: 16, right: 16 })
    .backgroundColor('#FFFFFF')
    .shadow({ radius: 4, color: '#10000000', offsetY: 2 })
  }

  @Builder
  buildCurrencyPanel(
    label: string,
    currencyIndex: number,
    displayValue: string,
    editable: boolean,
    onCurrencyClick: () => void,
    onInput: (val: string) => void
  ) {
    Column() {
      Text(label)
        .fontSize($r('app.float.font_size_tiny'))
        .fontColor('#999999')
        .width('100%')

      Row() {
        // 币种选择按钮
        Button() {
          Row() {
            Text(this.currencies[currencyIndex].code)
              .fontSize($r('app.float.font_size_body'))
              .fontWeight(FontWeight.Bold)
              .fontColor('#1A1A1A')

            Text('▼')
              .fontSize(10)
              .fontColor('#999999')
              .margin({ left: 4 })
          }
        }
        .backgroundColor('#F5F5F5')
        .borderRadius(8)
        .height(40)
        .padding({ left: 12, right: 12 })
        .onClick(onCurrencyClick)

        Blank()

        // 金额显示/输入
        TextInput({ text: displayValue, placeholder: '0' })
          .fontSize($r('app.float.font_size_input'))
          .fontWeight(FontWeight.Bold)
          .fontColor(editable ? '#1A1A1A' : '#007DFF')
          .enabled(editable)
          .backgroundColor(Color.Transparent)
          .textAlign(TextAlign.End)
          .borderRadius(0)
          .width('60%')
          .padding(0)
          .onChange((val: string) => {
            onInput(val);
          })
          .type(InputType.Number)
      }
      .width('100%')
      .margin({ top: 8 })
    }
    .width('100%')
    .padding(16)
    .backgroundColor('#FFFFFF')
    .borderRadius(16)
    .border({ width: 1, color: '#EEEEEE' })
    .shadow({ radius: 4, color: '#0A000000', offsetY: 2 })
  }

  @Builder
  buildNumberPad() {
    Column() {
      Row() {
        Button('C')
          .fontSize($r('app.float.font_size_text'))
          .fontColor('#FF5252')
          .backgroundColor('#FFF0F0')
          .layoutWeight(1)
          .height($r('app.float.key_height'))
          .borderRadius(8)
          .margin({ right: 4 })
          .onClick(() => {
            this.inputValue = '';
            this.outputValue = '';
          })

        Button('⌫')
          .fontSize($r('app.float.font_size_text'))
          .fontColor('#FF9800')
          .backgroundColor('#FFF8E1')
          .layoutWeight(1)
          .height($r('app.float.key_height'))
          .borderRadius(8)
          .margin({ left: 4 })
          .onClick(() => {
            if (this.inputValue.length > 0) {
              this.inputValue = this.inputValue.slice(0, -1);
              this.doConversion();
            }
          })
      }
      .width('100%')
      .padding({ left: 12, right: 12, bottom: 4 })

      Row() {
        ForEach(['7', '8', '9'], (n: string) => {
          Button(n).fontSize($r('app.float.font_size_text')).fontColor('#1A1A1A')
            .backgroundColor('#F5F5F5').layoutWeight(1).height($r('app.float.key_height'))
            .borderRadius(8).margin({ left: 4, right: 4 })
            .onClick(() => { this.appendNumber(n); })
        })
      }.width('100%').padding({ left: 8, right: 8, bottom: 4 })

      Row() {
        ForEach(['4', '5', '6'], (n: string) => {
          Button(n).fontSize($r('app.float.font_size_text')).fontColor('#1A1A1A')
            .backgroundColor('#F5F5F5').layoutWeight(1).height($r('app.float.key_height'))
            .borderRadius(8).margin({ left: 4, right: 4 })
            .onClick(() => { this.appendNumber(n); })
        })
      }.width('100%').padding({ left: 8, right: 8, bottom: 4 })

      Row() {
        ForEach(['1', '2', '3'], (n: string) => {
          Button(n).fontSize($r('app.float.font_size_text')).fontColor('#1A1A1A')
            .backgroundColor('#F5F5F5').layoutWeight(1).height($r('app.float.key_height'))
            .borderRadius(8).margin({ left: 4, right: 4 })
            .onClick(() => { this.appendNumber(n); })
        })
      }.width('100%').padding({ left: 8, right: 8, bottom: 4 })

      Row() {
        Button('.').fontSize($r('app.float.font_size_text')).fontColor('#1A1A1A')
          .backgroundColor('#F5F5F5').layoutWeight(1).height($r('app.float.key_height'))
          .borderRadius(8).margin({ left: 4, right: 4 })
          .onClick(() => { this.appendNumber('.'); })

        Button('0').fontSize($r('app.float.font_size_text')).fontColor('#1A1A1A')
          .backgroundColor('#F5F5F5').layoutWeight(1).height($r('app.float.key_height'))
          .borderRadius(8).margin({ left: 4, right: 4 })
          .onClick(() => { this.appendNumber('0'); })

        Button('00').fontSize($r('app.float.font_size_text')).fontColor('#1A1A1A')
          .backgroundColor('#F5F5F5').layoutWeight(1).height($r('app.float.key_height'))
          .borderRadius(8).margin({ left: 4, right: 4 })
          .onClick(() => { this.appendNumber('00'); })
      }
      .width('100%')
      .padding({ left: 8, right: 8, bottom: 8 })
    }
    .width('100%')
    .backgroundColor('#FFFFFF')
    .padding({ top: 8, bottom: 8 })
    .border({ width: { top: 1 }, color: '#EEEEEE' })
  }

  @Builder
  buildCurrencyPicker() {
    Column() {
      Column() {
        Text('选择币种')
          .fontSize($r('app.float.font_size_title_medium'))
          .fontWeight(FontWeight.Bold)
          .margin({ bottom: 12 })

        List() {
          ForEach(this.currencies, (currency: CurrencyDef, index: number) => {
            ListItem() {
              Row() {
                Column() {
                  Text(currency.code)
                    .fontSize($r('app.float.font_size_body'))
                    .fontWeight(FontWeight.Bold)
                    .fontColor('#1A1A1A')
                  Text(currency.name)
                    .fontSize($r('app.float.font_size_tiny'))
                    .fontColor('#999999')
                }
                .alignItems(HorizontalAlign.Start)
                .layoutWeight(1)

                if ((this.showFromPicker && index === this.fromCurrencyIndex) ||
                    (this.showToPicker && index === this.toCurrencyIndex)) {
                  Text('✓')
                    .fontSize($r('app.float.font_size_text'))
                    .fontColor('#007DFF')
                    .fontWeight(FontWeight.Bold)
                }
              }
              .width('100%')
              .padding({ top: 14, bottom: 14, left: 16, right: 16 })
              .onClick(() => {
                if (this.showFromPicker) {
                  this.fromCurrencyIndex = index;
                } else {
                  this.toCurrencyIndex = index;
                }
                this.doConversion();
                this.showFromPicker = false;
                this.showToPicker = false;
              })
            }
            .border({ width: { bottom: 1 }, color: '#F0F0F0' })
          })
        }
        .constraintSize({ maxHeight: 350 })

        Button('取消').fontSize($r('app.float.font_size_caption')).fontColor('#999999')
          .backgroundColor('#F5F5F5').width('100%').height(40).borderRadius(8).margin({ top: 8 })
          .onClick(() => { this.showFromPicker = false; this.showToPicker = false; })
      }
      .width('85%').padding(20).backgroundColor(Color.White).borderRadius(16)
      .shadow({ radius: 20, color: '#30000000' })
    }
    .width('100%').height('100%').justifyContent(FlexAlign.Center)
    .backgroundColor('#50000000').position({ x: 0, y: 0 })
    .onClick(() => { this.showFromPicker = false; this.showToPicker = false; })
  }

  private appendNumber(num: string): void {
    if (num === '.' && this.inputValue.indexOf('.') !== -1) return;
    if (this.inputValue === '0' && num !== '.') { this.inputValue = num; }
    else { this.inputValue += num; }
    this.doConversion();
  }

  private doConversion(): void {
    let val = parseFloat(this.inputValue);
    if (isNaN(val) || this.inputValue === '') { this.outputValue = ''; return; }
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
    if (Math.abs(n) < 0.01 && n !== 0) return n.toFixed(6);
    return parseFloat(n.toFixed(4)).toString();
  }
}
