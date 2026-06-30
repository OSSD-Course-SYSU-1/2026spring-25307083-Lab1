/*
 * Tip Calculator Page - 小费计算页面
 * 支持预设小费比例、自定义比例、多人分摊
 */

import router from '@ohos.router';

@Entry
@Component
struct TipPage {
  @State billAmount: string = '';
  @State tipPercent: number = 15;
  @State customPercent: string = '';
  @State isCustom: boolean = false;
  @State peopleCount: number = 1;

  // 结果
  @State tipAmount: string = '0.00';
  @State totalAmount: string = '0.00';
  @State perPerson: string = '0.00';

  private presets: number[] = [10, 12, 15, 18, 20, 25];

  build() {
    Column() {
      this.buildHeader();

      Scroll() {
        Column() {
          // 账单金额
          this.buildBillInput();

          // 小费比例
          this.buildTipSelector();

          // 自定义比例
          if (this.isCustom) {
            this.buildCustomPercent();
          }

          // 人数选择
          this.buildPeopleSelector();

          // 结果面板
          this.buildResultPanel();
        }
        .width('100%')
      }
      .layoutWeight(1)
      .width('100%')
    }
    .width('100%')
    .height('100%')
    .backgroundColor('#F1F3F5')
  }

  @Builder
  buildHeader() {
    Row() {
      Button({ type: ButtonType.Circle }) {
        Text('←').fontSize($r('app.float.font_size_title_large')).fontColor('#333333')
      }
      .width($r('app.float.icon_size_back')).height($r('app.float.icon_size_back'))
      .backgroundColor(Color.Transparent)
      .onClick(() => { router.back(); })

      Text('小费计算')
        .fontSize($r('app.float.font_size_title_large')).fontWeight(FontWeight.Bold)
        .fontColor('#1A1A1A').margin({ left: 8 })
    }
    .width('100%').height($r('app.float.page_header_height'))
    .padding({ left: 16, right: 16 }).backgroundColor('#FFFFFF')
    .shadow({ radius: 4, color: '#10000000', offsetY: 2 })
  }

  @Builder
  buildBillInput() {
    Column() {
      Text('账单金额')
        .fontSize($r('app.float.font_size_tiny')).fontColor('#999999')
        .width('100%')

      Row() {
        Text('¥')
          .fontSize($r('app.float.font_size_input')).fontWeight(FontWeight.Bold)
          .fontColor('#1A1A1A').margin({ right: 4 })

        TextInput({ text: this.billAmount, placeholder: '0.00' })
          .fontSize($r('app.float.font_size_input')).fontWeight(FontWeight.Bold)
          .fontColor('#1A1A1A').layoutWeight(1).height(52)
          .backgroundColor(Color.Transparent).type(InputType.Number)
          .borderRadius(0).padding(0)
          .onChange((v) => { this.billAmount = v; this.calculate(); })
      }
      .width('100%').margin({ top: 8 })
    }
    .width('100%').padding(16).backgroundColor('#FFFFFF')
    .borderRadius(16).border({ width: 1, color: '#EEEEEE' })
    .margin({ left: 16, right: 16, top: 12 })
  }

  @Builder
  buildTipSelector() {
    Column() {
      Text('小费比例')
        .fontSize($r('app.float.font_size_tiny')).fontColor('#999999')
        .width('100%')

      // 预设比例按钮
      Row() {
        ForEach(this.presets, (pct: number) => {
          Button(`${pct}%`)
            .fontSize($r('app.float.font_size_caption'))
            .fontColor((!this.isCustom && this.tipPercent === pct) ? Color.White : '#666666')
            .backgroundColor((!this.isCustom && this.tipPercent === pct) ? '#007DFF' : '#F5F5F5')
            .borderRadius(16).height(32)
            .padding({ left: 12, right: 12 })
            .margin({ right: 6 })
            .border({ width: 1, color: (!this.isCustom && this.tipPercent === pct) ? '#007DFF' : '#E0E0E0' })
            .onClick(() => {
              this.isCustom = false;
              this.tipPercent = pct;
              this.calculate();
            })
        }, (pct: number) => pct.toString())

        Button('自定义')
          .fontSize($r('app.float.font_size_tiny'))
          .fontColor(this.isCustom ? Color.White : '#007DFF')
          .backgroundColor(this.isCustom ? '#007DFF' : '#F0F7FF')
          .borderRadius(16).height(32)
          .padding({ left: 12, right: 12 })
          .border({ width: 1, color: '#007DFF' })
          .onClick(() => { this.isCustom = !this.isCustom; })
      }
      .width('100%').margin({ top: 8 })
    }
    .width('100%').padding(16).backgroundColor('#FFFFFF')
    .borderRadius(16).border({ width: 1, color: '#EEEEEE' })
    .margin({ left: 16, right: 16, top: 12 })
  }

  @Builder
  buildCustomPercent() {
    Column() {
      Text('自定义比例 (%)')
        .fontSize($r('app.float.font_size_tiny')).fontColor('#999999')
        .width('100%')

      TextInput({ text: this.customPercent, placeholder: '输入百分比，如 15' })
        .fontSize($r('app.float.font_size_body')).type(InputType.Number)
        .backgroundColor('#FAFAFA').width('100%').height(44)
        .borderRadius(8).border({ width: 1, color: '#E0E0E0' })
        .padding({ left: 12, right: 12 })
        .onChange((v) => { this.customPercent = v; this.calculate(); })
    }
    .width('100%').padding(16).backgroundColor('#FFFFFF')
    .borderRadius(16).border({ width: 1, color: '#EEEEEE' })
    .margin({ left: 16, right: 16, top: 8 })
  }

  @Builder
  buildPeopleSelector() {
    Column() {
      Text('分摊人数')
        .fontSize($r('app.float.font_size_tiny')).fontColor('#999999')
        .width('100%')

      Row() {
        Button({ type: ButtonType.Circle }) {
          Text('-').fontSize($r('app.float.font_size_title_large')).fontColor('#007DFF')
        }
        .width(40).height(40).backgroundColor('#F0F7FF')
        .onClick(() => {
          if (this.peopleCount > 1) { this.peopleCount--; this.calculate(); }
        })

        Text(this.peopleCount.toString())
          .fontSize($r('app.float.font_size_input')).fontWeight(FontWeight.Bold)
          .fontColor('#1A1A1A').margin({ left: 24, right: 24 })

        Button({ type: ButtonType.Circle }) {
          Text('+').fontSize($r('app.float.font_size_title_large')).fontColor('#007DFF')
        }
        .width(40).height(40).backgroundColor('#F0F7FF')
        .onClick(() => {
          if (this.peopleCount < 99) { this.peopleCount++; this.calculate(); }
        })

        Blank()

        if (this.peopleCount > 1) {
          Text('👥 多人分摊')
            .fontSize($r('app.float.font_size_caption')).fontColor('#FF9800')
        }
      }
      .width('100%').margin({ top: 8 })
    }
    .width('100%').padding(16).backgroundColor('#FFFFFF')
    .borderRadius(16).border({ width: 1, color: '#EEEEEE' })
    .margin({ left: 16, right: 16, top: 12 })
  }

  @Builder
  buildResultPanel() {
    Column() {
      // 小费金额
      Row() {
        Text('💵 小费金额')
          .fontSize($r('app.float.font_size_body')).fontColor('#666666')
        Blank()
        Text(`¥ ${this.tipAmount}`)
          .fontSize($r('app.float.font_size_result')).fontWeight(FontWeight.Bold)
          .fontColor('#FF9800')
      }
      .width('100%')

      Divider().margin({ top: 12, bottom: 12 }).color('#F0F0F0')

      // 总金额
      Row() {
        Text('💰 应付总额')
          .fontSize($r('app.float.font_size_body')).fontColor('#666666')
        Blank()
        Text(`¥ ${this.totalAmount}`)
          .fontSize($r('app.float.font_size_result')).fontWeight(FontWeight.Bold)
          .fontColor('#1A1A1A')
      }
      .width('100%')

      if (this.peopleCount > 1) {
        Divider().margin({ top: 12, bottom: 12 }).color('#F0F0F0')

        Row() {
          Text('👤 每人应付')
            .fontSize($r('app.float.font_size_body')).fontColor('#666666')
          Blank()
          Text(`¥ ${this.perPerson}`)
            .fontSize($r('app.float.font_size_result')).fontWeight(FontWeight.Bold)
            .fontColor('#007DFF')
        }
        .width('100%')
      }
    }
    .width('100%').padding(20).backgroundColor('#FFFFFF')
    .borderRadius(16).border({ width: 1, color: '#E3F2FD' })
    .margin({ left: 16, right: 16, top: 16, bottom: 16 })
    .shadow({ radius: 4, color: '#0A000000', offsetY: 2 })
  }

  private calculate(): void {
    let bill = parseFloat(this.billAmount);
    if (isNaN(bill) || bill <= 0) {
      this.tipAmount = '0.00';
      this.totalAmount = '0.00';
      this.perPerson = '0.00';
      return;
    }

    let pct: number;
    if (this.isCustom) {
      pct = parseFloat(this.customPercent);
    } else {
      pct = this.tipPercent;
    }

    if (isNaN(pct) || pct < 0) {
      this.tipAmount = '0.00';
      this.totalAmount = bill.toFixed(2);
      this.perPerson = (bill / this.peopleCount).toFixed(2);
      return;
    }

    let tip = bill * pct / 100;
    let total = bill + tip;
    let each = total / this.peopleCount;

    this.tipAmount = tip.toFixed(2);
    this.totalAmount = total.toFixed(2);
    this.perPerson = each.toFixed(2);
  }
}
