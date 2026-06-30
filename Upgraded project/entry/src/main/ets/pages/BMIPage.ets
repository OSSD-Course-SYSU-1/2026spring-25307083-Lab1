/*
 * BMI Calculator Page - BMI计算页面
 * 支持公制(kg/cm)和英制(lb/ft+in)
 */

import router from '@ohos.router';

enum UnitSystem {
  METRIC = '公制',
  IMPERIAL = '英制'
}

class BMILevel {
  label: string;
  min: number;
  max: number;
  color: string;

  constructor(label: string, min: number, max: number, color: string) {
    this.label = label;
    this.min = min;
    this.max = max;
    this.color = color;
  }
}

@Entry
@Component
struct BMIPage {
  @State unitSystem: UnitSystem = UnitSystem.METRIC;

  // 公制
  @State heightCm: string = '170';
  @State weightKg: string = '65';

  // 英制
  @State heightFt: string = '5';
  @State heightIn: string = '7';
  @State weightLb: string = '143';

  // 结果
  @State bmiValue: number = 0;
  @State bmiCategory: string = '';
  @State bmiColor: string = '#4CAF50';
  @State idealWeight: string = '';
  @State showResult: boolean = false;

  private levels: BMILevel[] = [
    new BMILevel('偏瘦', 0, 18.5, '#2196F3'),
    new BMILevel('正常', 18.5, 24.9, '#4CAF50'),
    new BMILevel('偏重', 25, 29.9, '#FF9800'),
    new BMILevel('肥胖', 30, 34.9, '#FF5722'),
    new BMILevel('重度肥胖', 35, 100, '#F44336'),
  ];

  aboutToAppear(): void {
    this.calculate();
  }

  build() {
    Column() {
      this.buildHeader();

      Scroll() {
        Column() {
          // 单位制切换
          this.buildUnitToggle();

          if (this.unitSystem === UnitSystem.METRIC) {
            this.buildMetricInputs();
          } else {
            this.buildImperialInputs();
          }

          // 计算按钮
          Button('计算 BMI')
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

      Text('BMI 计算')
        .fontSize($r('app.float.font_size_title_large')).fontWeight(FontWeight.Bold)
        .fontColor('#1A1A1A').margin({ left: 8 })
    }
    .width('100%').height($r('app.float.page_header_height'))
    .padding({ left: 16, right: 16 }).backgroundColor('#FFFFFF')
    .shadow({ radius: 4, color: '#10000000', offsetY: 2 })
  }

  @Builder
  buildUnitToggle() {
    Row() {
      Button(UnitSystem.METRIC)
        .fontSize($r('app.float.font_size_caption'))
        .fontColor(this.unitSystem === UnitSystem.METRIC ? Color.White : '#666666')
        .backgroundColor(this.unitSystem === UnitSystem.METRIC ? '#007DFF' : '#F5F5F5')
        .borderRadius(20).height(36)
        .padding({ left: 20, right: 20 })
        .border({ width: 1, color: this.unitSystem === UnitSystem.METRIC ? '#007DFF' : '#E0E0E0' })
        .onClick(() => { this.unitSystem = UnitSystem.METRIC; })

      Button(UnitSystem.IMPERIAL)
        .fontSize($r('app.float.font_size_caption'))
        .fontColor(this.unitSystem === UnitSystem.IMPERIAL ? Color.White : '#666666')
        .backgroundColor(this.unitSystem === UnitSystem.IMPERIAL ? '#007DFF' : '#F5F5F5')
        .borderRadius(20).height(36)
        .padding({ left: 20, right: 20 })
        .margin({ left: 8 })
        .border({ width: 1, color: this.unitSystem === UnitSystem.IMPERIAL ? '#007DFF' : '#E0E0E0' })
        .onClick(() => { this.unitSystem = UnitSystem.IMPERIAL; })
    }
    .width('100%')
    .justifyContent(FlexAlign.Center)
    .padding({ top: 12, bottom: 8 })
  }

  @Builder
  buildMetricInputs() {
    Column() {
      this.buildInputCard('身高', this.heightCm, 'cm',
        (v) => { this.heightCm = v; });
      this.buildInputCard('体重', this.weightKg, 'kg',
        (v) => { this.weightKg = v; });
    }
    .padding({ left: 16, right: 16 })
  }

  @Builder
  buildImperialInputs() {
    Column() {
      // 身高 - ft + in
      Column() {
        Text('身高')
          .fontSize($r('app.float.font_size_tiny')).fontColor('#999999')
          .width('100%')

        Row() {
          Column() {
            TextInput({ text: this.heightFt, placeholder: '0' })
              .fontSize($r('app.float.font_size_result')).fontWeight(FontWeight.Bold)
              .textAlign(TextAlign.Center).type(InputType.Number)
              .backgroundColor('#FAFAFA').width('100%').height(52)
              .borderRadius(8).border({ width: 1, color: '#E0E0E0' })
              .onChange((v) => { this.heightFt = v; })
            Text('英尺 (ft)')
              .fontSize($r('app.float.font_size_tiny')).fontColor('#999999').margin({ top: 4 })
          }
          .layoutWeight(1)

          Column() {
            TextInput({ text: this.heightIn, placeholder: '0' })
              .fontSize($r('app.float.font_size_result')).fontWeight(FontWeight.Bold)
              .textAlign(TextAlign.Center).type(InputType.Number)
              .backgroundColor('#FAFAFA').width('100%').height(52)
              .borderRadius(8).border({ width: 1, color: '#E0E0E0' })
              .margin({ left: 12 })
              .onChange((v) => { this.heightIn = v; })
            Text('英寸 (in)')
              .fontSize($r('app.float.font_size_tiny')).fontColor('#999999').margin({ top: 4 })
          }
          .layoutWeight(1)
        }
        .width('100%').margin({ top: 8 })
      }
      .width('100%').padding(16).backgroundColor('#FFFFFF')
      .borderRadius(16).border({ width: 1, color: '#EEEEEE' })
      .margin({ bottom: 12 })

      this.buildInputCard('体重', this.weightLb, '磅 (lb)',
        (v) => { this.weightLb = v; });
    }
    .padding({ left: 16, right: 16 })
  }

  @Builder
  buildInputCard(label: string, value: string, unit: string, onChange: (v: string) => void) {
    Column() {
      Text(label)
        .fontSize($r('app.float.font_size_tiny')).fontColor('#999999')
        .width('100%')

      Row() {
        TextInput({ text: value, placeholder: '0' })
          .fontSize($r('app.float.font_size_input')).fontWeight(FontWeight.Bold)
          .textAlign(TextAlign.Center).type(InputType.Number)
          .backgroundColor('#FAFAFA').layoutWeight(1).height(52)
          .borderRadius(8).border({ width: 1, color: '#E0E0E0' })
          .onChange(onChange)

        Text(unit)
          .fontSize($r('app.float.font_size_body')).fontColor('#666666')
          .margin({ left: 12 }).width(50)
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
      // BMI 大字
      Text(this.bmiValue.toFixed(1))
        .fontSize(56).fontWeight(FontWeight.Bold)
        .fontColor(this.bmiColor)

      Text(this.bmiCategory)
        .fontSize($r('app.float.font_size_title_medium'))
        .fontWeight(FontWeight.Bold)
        .fontColor(this.bmiColor)
        .margin({ bottom: 16 })

      // BMI 等级色条
      this.buildBMIScale()

      // 理想体重范围
      Text(this.idealWeight)
        .fontSize($r('app.float.font_size_caption'))
        .fontColor('#666666')
        .margin({ top: 16 })
        .textAlign(TextAlign.Center)

      // BMI 说明
      Text(this.getBMIAdvice())
        .fontSize($r('app.float.font_size_small'))
        .fontColor('#888888')
        .margin({ top: 12 })
        .textAlign(TextAlign.Center)
        .padding({ left: 8, right: 8 })
    }
    .width('100%').padding(24).backgroundColor('#FFFFFF')
    .borderRadius(16).border({ width: 1, color: '#EEEEEE' })
    .margin({ left: 16, right: 16, top: 16, bottom: 16 })
    .shadow({ radius: 4, color: '#0A000000', offsetY: 2 })
  }

  @Builder
  buildBMIScale() {
    Column() {
      Row() {
        ForEach(this.levels, (level: BMILevel) => {
          Column() {
            Text(level.min.toFixed(1))
              .fontSize(10).fontColor('#999999')
          }
          .width(this.getScaleWidth(level))
          .height(24)
          .backgroundColor(level.color)
        })
      }
      .width('100%').height(24).borderRadius(12)

      // 指针
      Row() {
        Blank()
        Polygon()
          .points([[0, 0], [6, 10], [12, 0]])
          .fill(this.bmiColor)
          .width(12).height(10)
      }
      .width('100%')
      .padding({ left: this.getPointerPosition() })
    }
    .width('100%')
  }

  // ==================== 计算方法 ====================

  private calculate(): void {
    let heightM: number;
    let weightKg: number;

    if (this.unitSystem === UnitSystem.METRIC) {
      heightM = parseFloat(this.heightCm) / 100;
      weightKg = parseFloat(this.weightKg);
    } else {
      let ft = parseFloat(this.heightFt) || 0;
      let inch = parseFloat(this.heightIn) || 0;
      heightM = (ft * 12 + inch) * 0.0254;
      weightKg = (parseFloat(this.weightLb) || 0) * 0.453592;
    }

    if (isNaN(heightM) || isNaN(weightKg) || heightM <= 0 || weightKg <= 0) {
      this.showResult = false;
      return;
    }

    let bmi = weightKg / (heightM * heightM);
    this.bmiValue = bmi;

    for (let i = 0; i < this.levels.length; i++) {
      if (bmi >= this.levels[i].min && bmi < this.levels[i].max) {
        this.bmiCategory = this.levels[i].label;
        this.bmiColor = this.levels[i].color;
        break;
      }
    }

    // 理想体重范围 (BMI 18.5-24.9)
    let idealLow = (18.5 * heightM * heightM);
    let idealHigh = (24.9 * heightM * heightM);

    if (this.unitSystem === UnitSystem.METRIC) {
      this.idealWeight = `理想体重范围：${idealLow.toFixed(1)} - ${idealHigh.toFixed(1)} kg`;
    } else {
      let lowLb = idealLow / 0.453592;
      let highLb = idealHigh / 0.453592;
      this.idealWeight = `理想体重范围：${lowLb.toFixed(1)} - ${highLb.toFixed(1)} lb`;
    }

    this.showResult = true;
  }

  private getBMIAdvice(): string {
    if (this.bmiValue < 18.5) return '您的体重偏轻，建议加强营养摄入，适当增加体重。';
    if (this.bmiValue < 24.9) return '您的体重在正常范围内，请继续保持健康的生活方式。';
    if (this.bmiValue < 29.9) return '您的体重偏重，建议控制饮食并适当增加运动量。';
    if (this.bmiValue < 34.9) return '您的体重属于肥胖范围，建议咨询医生制定科学减重计划。';
    return '您的体重属于重度肥胖，建议尽快就医进行专业减重指导。';
  }

  private getScaleWidth(level: BMILevel): string {
    let total = 40; // 0-40 BMI scale
    let w = ((level.max - level.min) / total * 100).toFixed(1);
    return `${w}%`;
  }

  private getPointerPosition(): string {
    let total = 40;
    let pct = (this.bmiValue / total * 100);
    if (pct > 95) pct = 95;
    if (pct < 2) pct = 2;
    return `${pct.toFixed(1)}%`;
  }
}
