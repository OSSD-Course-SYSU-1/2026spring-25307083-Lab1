/*
 * Mortgage Calculator Page - 房贷计算页面
 * 支持等额本息还款方式，展示月供、利息、还款总额
 */

import router from '@ohos.router';

@Entry
@Component
struct MortgagePage {
  @State loanAmount: string = '1000000';
  @State annualRate: string = '4.2';
  @State loanYears: number = 30;
  @State downPayment: string = '30';
  @State totalPrice: string = '';
  @State useTotalPrice: boolean = false;

  // 结果
  @State monthlyPayment: string = '0';
  @State totalPayment: string = '0';
  @State totalInterest: string = '0';
  @State firstMonthInterest: string = '0';
  @State firstMonthPrincipal: string = '0';
  @State interestRatio: number = 0;
  @State showResult: boolean = false;

  private yearOptions: number[] = [1, 3, 5, 10, 15, 20, 25, 30];

  build() {
    Column() {
      this.buildHeader();

      Scroll() {
        Column() {
          // 计算方式切换
          this.buildModeToggle();

          // 输入区域
          this.buildInputs();

          // 计算按钮
          Button('开始计算')
            .fontSize($r('app.float.font_size_body'))
            .fontColor(Color.White)
            .backgroundColor('#007DFF')
            .width('100%')
            .height(48)
            .borderRadius(12)
            .margin({ top: 12, left: 16, right: 16 })
            .onClick(() => { this.calculate(); })

          // 结果展示
          if (this.showResult) {
            this.buildResultPanel();
          }
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

      Text('房贷计算')
        .fontSize($r('app.float.font_size_title_large')).fontWeight(FontWeight.Bold)
        .fontColor('#1A1A1A').margin({ left: 8 })
    }
    .width('100%').height($r('app.float.page_header_height'))
    .padding({ left: 16, right: 16 }).backgroundColor('#FFFFFF')
    .shadow({ radius: 4, color: '#10000000', offsetY: 2 })
  }

  @Builder
  buildModeToggle() {
    Row() {
      Button('按贷款金额')
        .fontSize($r('app.float.font_size_caption'))
        .fontColor(!this.useTotalPrice ? Color.White : '#666666')
        .backgroundColor(!this.useTotalPrice ? '#007DFF' : '#F5F5F5')
        .borderRadius(20).height(36).padding({ left: 16, right: 16 })
        .border({ width: 1, color: !this.useTotalPrice ? '#007DFF' : '#E0E0E0' })
        .onClick(() => { this.useTotalPrice = false; })

      Button('按房屋总价')
        .fontSize($r('app.float.font_size_caption'))
        .fontColor(this.useTotalPrice ? Color.White : '#666666')
        .backgroundColor(this.useTotalPrice ? '#007DFF' : '#F5F5F5')
        .borderRadius(20).height(36).padding({ left: 16, right: 16 })
        .margin({ left: 8 })
        .border({ width: 1, color: this.useTotalPrice ? '#007DFF' : '#E0E0E0' })
        .onClick(() => { this.useTotalPrice = true; })
    }
    .width('100%').justifyContent(FlexAlign.Center).padding({ top: 12, bottom: 8 })
  }

  @Builder
  buildInputs() {
    Column() {
      if (this.useTotalPrice) {
        this.buildInputRow('房屋总价', this.totalPrice, '万元',
          (v) => { this.totalPrice = v; });
        this.buildInputRow('首付比例', this.downPayment, '%',
          (v) => { this.downPayment = v; });
      } else {
        this.buildInputRow('贷款金额', this.loanAmount, '万元',
          (v) => { this.loanAmount = v; });
      }

      this.buildInputRow('年利率', this.annualRate, '%',
        (v) => { this.annualRate = v; });

      // 贷款年限
      Column() {
        Text('贷款年限').fontSize($r('app.float.font_size_tiny'))
          .fontColor('#999999').width('100%')

        Row() {
          ForEach(this.yearOptions, (yr: number) => {
            Button(`${yr}年`)
              .fontSize($r('app.float.font_size_tiny'))
              .fontColor(this.loanYears === yr ? Color.White : '#666666')
              .backgroundColor(this.loanYears === yr ? '#007DFF' : '#F5F5F5')
              .borderRadius(16).height(32).padding({ left: 10, right: 10 })
              .margin({ right: 6 })
              .border({ width: 1, color: this.loanYears === yr ? '#007DFF' : '#E0E0E0' })
              .onClick(() => { this.loanYears = yr; })
          }, (yr: number) => yr.toString())
        }
        .width('100%').margin({ top: 8 })
      }
      .width('100%').padding(16).backgroundColor('#FFFFFF')
      .borderRadius(16).border({ width: 1, color: '#EEEEEE' })
      .margin({ bottom: 12 })
    }
    .padding({ left: 16, right: 16 })
  }

  @Builder
  buildInputRow(label: string, value: string, unit: string, onChange: (v: string) => void) {
    Column() {
      Text(label).fontSize($r('app.float.font_size_tiny'))
        .fontColor('#999999').width('100%')

      Row() {
        TextInput({ text: value, placeholder: '0' })
          .fontSize($r('app.float.font_size_input')).fontWeight(FontWeight.Bold)
          .textAlign(TextAlign.Center).type(InputType.Number)
          .backgroundColor('#FAFAFA').layoutWeight(1).height(52)
          .borderRadius(8).border({ width: 1, color: '#E0E0E0' })
          .onChange(onChange)

        Text(unit)
          .fontSize($r('app.float.font_size_body')).fontColor('#666666')
          .margin({ left: 12 }).width(52)
      }
      .width('100%').margin({ top: 8 })
    }
    .width('100%').padding(16).backgroundColor('#FFFFFF')
    .borderRadius(16).border({ width: 1, color: '#EEEEEE' })
    .margin({ bottom: 12 })
  }

  // ==================== 结果面板 ====================

  @Builder
  buildResultPanel() {
    Column() {
      // 月供大字
      Text('月供（每月）')
        .fontSize($r('app.float.font_size_caption')).fontColor('#999999')

      Row() {
        Text('¥').fontSize(24).fontColor('#007DFF').fontWeight(FontWeight.Bold)
        Text(this.monthlyPayment)
          .fontSize(40).fontWeight(FontWeight.Bold).fontColor('#007DFF')
      }
      .margin({ top: 4 })

      // 明细
      Row() {
        this.buildDetailItem('贷款总额', `¥${this.getLoanPrincipal()}万`, '#1A1A1A')
        this.buildDetailItem('还款总额', `¥${this.totalPayment}万`, '#1A1A1A')
      }
      .width('100%').margin({ top: 16 })

      Row() {
        this.buildDetailItem('支付利息', `¥${this.totalInterest}万`, '#FF5722')
        this.buildDetailItem('贷款年限', `${this.loanYears} 年`, '#666666')
      }
      .width('100%').margin({ top: 8 })

      Divider().margin({ top: 16, bottom: 16 }).color('#F0F0F0')

      // 首月还款构成
      Text('首月还款构成')
        .fontSize($r('app.float.font_size_caption')).fontColor('#999999')
        .width('100%')

      Row() {
        Text(`本金 ¥${this.firstMonthPrincipal}`)
          .fontSize($r('app.float.font_size_caption')).fontColor('#4CAF50')
        Blank()
        Text(`利息 ¥${this.firstMonthInterest}`)
          .fontSize($r('app.float.font_size_caption')).fontColor('#FF9800')
      }
      .width('100%').margin({ top: 8 })

      // 比例条
      Row() {
        Text('本金')
          .fontSize(10).fontColor(Color.White)
          .width(`${((1 - this.interestRatio) * 100).toFixed(1)}%`)
          .height(20).backgroundColor('#4CAF50')
          .borderRadius({ topLeft: 10, bottomLeft: 10 })
          .textAlign(TextAlign.Center)

        Text('利息')
          .fontSize(10).fontColor(Color.White)
          .width(`${(this.interestRatio * 100).toFixed(1)}%`)
          .height(20).backgroundColor('#FF9800')
          .borderRadius({ topRight: 10, bottomRight: 10 })
          .textAlign(TextAlign.Center)
      }
      .width('100%').margin({ top: 4 })

      // 利息占比
      Text(`贷款总利息占比 ${(this.interestRatio * 100).toFixed(1)}%`)
        .fontSize($r('app.float.font_size_tiny')).fontColor('#999999').margin({ top: 8 })
    }
    .width('100%').padding(20).backgroundColor('#FFFFFF')
    .borderRadius(16).border({ width: 1, color: '#E3F2FD' })
    .margin({ left: 16, right: 16, top: 16, bottom: 16 })
    .shadow({ radius: 4, color: '#0A000000', offsetY: 2 })
  }

  @Builder
  buildDetailItem(label: string, value: string, color: string) {
    Column() {
      Text(label)
        .fontSize($r('app.float.font_size_tiny')).fontColor('#999999')
      Text(value)
        .fontSize($r('app.float.font_size_body')).fontWeight(FontWeight.Bold)
        .fontColor(color).margin({ top: 4 })
    }
    .width('50%').alignItems(HorizontalAlign.Center)
  }

  // ==================== 计算方法 ====================

  private calculate(): void {
    let principal: number;

    if (this.useTotalPrice) {
      let total = parseFloat(this.totalPrice);
      let downPct = parseFloat(this.downPayment);
      if (isNaN(total) || isNaN(downPct) || total <= 0) {
        this.showResult = false;
        return;
      }
      principal = total * (1 - downPct / 100);
    } else {
      principal = parseFloat(this.loanAmount);
    }

    let rate = parseFloat(this.annualRate);

    if (isNaN(principal) || isNaN(rate) || principal <= 0 || rate <= 0) {
      this.showResult = false;
      return;
    }

    let monthlyRate = rate / 100 / 12;
    let months = this.loanYears * 12;

    // 等额本息公式: M = P * r * (1+r)^n / ((1+r)^n - 1)
    let pow = Math.pow(1 + monthlyRate, months);
    let monthly = principal * monthlyRate * pow / (pow - 1);
    let monthlyYuan = monthly * 10000; // 万 → 元

    let totalPayments = monthly * months;
    let totalInterestWan = totalPayments - principal;
    let firstMonthInterest = principal * monthlyRate * 10000;
    let firstMonthPrincipal = monthlyYuan - firstMonthInterest;
    let interestRatio = totalInterestWan / totalPayments;

    this.monthlyPayment = monthlyYuan.toFixed(2);
    this.totalPayment = totalPayments.toFixed(2);
    this.totalInterest = totalInterestWan.toFixed(2);
    this.firstMonthInterest = firstMonthInterest.toFixed(2);
    this.firstMonthPrincipal = firstMonthPrincipal.toFixed(2);
    this.interestRatio = interestRatio;
    this.showResult = true;
  }

  private getLoanPrincipal(): string {
    if (this.useTotalPrice) {
      let total = parseFloat(this.totalPrice) || 0;
      let downPct = parseFloat(this.downPayment) || 0;
      return (total * (1 - downPct / 100)).toFixed(2);
    }
    return parseFloat(this.loanAmount).toFixed(2);
  }
}
