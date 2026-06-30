/*
 * Unit Conversion Page - 单位换算页面
 * 支持长度、重量、温度、面积、体积、速度等多种单位换算
 * 左右双栏布局，左侧输入、右侧输出
 */

import router from '@ohos.router';
import { promptAction } from '@kit.ArkUI';

/**
 * 单位换算类别
 */
enum ConversionCategory {
  LENGTH = '长度',
  WEIGHT = '重量',
  TEMPERATURE = '温度',
  AREA = '面积',
  VOLUME = '体积',
  SPEED = '速度'
}

/**
 * 单位定义
 */
class UnitDef {
  name: string;
  factor: number; // 相对于基准单位的转换因子（温度使用特殊处理）

  constructor(name: string, factor: number) {
    this.name = name;
    this.factor = factor;
  }
}

@Entry
@Component
struct UnitConversionPage {
  @State categories: ConversionCategory[] = [
    ConversionCategory.LENGTH,
    ConversionCategory.WEIGHT,
    ConversionCategory.TEMPERATURE,
    ConversionCategory.AREA,
    ConversionCategory.VOLUME,
    ConversionCategory.SPEED
  ];
  @State selectedCategory: ConversionCategory = ConversionCategory.LENGTH;
  @State leftValue: string = '1';
  @State rightValue: string = '';
  @State leftUnitIndex: number = 0;
  @State rightUnitIndex: number = 1;
  @State showLeftPicker: boolean = false;
  @State showRightPicker: boolean = false;

  // 各分类的单位定义
  private unitMap: Map<ConversionCategory, UnitDef[]> = new Map([
    [ConversionCategory.LENGTH, [
      new UnitDef('毫米 (mm)', 0.001),
      new UnitDef('厘米 (cm)', 0.01),
      new UnitDef('米 (m)', 1),
      new UnitDef('千米 (km)', 1000),
      new UnitDef('英寸 (in)', 0.0254),
      new UnitDef('英尺 (ft)', 0.3048),
      new UnitDef('码 (yd)', 0.9144),
      new UnitDef('英里 (mi)', 1609.344)
    ]],
    [ConversionCategory.WEIGHT, [
      new UnitDef('毫克 (mg)', 0.000001),
      new UnitDef('克 (g)', 0.001),
      new UnitDef('千克 (kg)', 1),
      new UnitDef('吨 (t)', 1000),
      new UnitDef('盎司 (oz)', 0.0283495),
      new UnitDef('磅 (lb)', 0.453592)
    ]],
    [ConversionCategory.TEMPERATURE, [
      new UnitDef('摄氏度 (°C)', 0),
      new UnitDef('华氏度 (°F)', 0),
      new UnitDef('开尔文 (K)', 0)
    ]],
    [ConversionCategory.AREA, [
      new UnitDef('平方毫米 (mm²)', 0.000001),
      new UnitDef('平方厘米 (cm²)', 0.0001),
      new UnitDef('平方米 (m²)', 1),
      new UnitDef('公顷 (ha)', 10000),
      new UnitDef('平方千米 (km²)', 1000000),
      new UnitDef('英亩 (acre)', 4046.86)
    ]],
    [ConversionCategory.VOLUME, [
      new UnitDef('毫升 (mL)', 0.001),
      new UnitDef('升 (L)', 1),
      new UnitDef('立方米 (m³)', 1000),
      new UnitDef('加仑 (gal)', 3.78541),
      new UnitDef('品脱 (pt)', 0.473176),
      new UnitDef('夸脱 (qt)', 0.946353)
    ]],
    [ConversionCategory.SPEED, [
      new UnitDef('米/秒 (m/s)', 1),
      new UnitDef('千米/时 (km/h)', 0.277778),
      new UnitDef('英里/时 (mph)', 0.44704),
      new UnitDef('节 (kn)', 0.514444),
      new UnitDef('马赫 (Mach)', 340)
    ]]
  ]);

  aboutToAppear(): void {
    this.doConversion();
  }

  build() {
    Stack() {
      Column() {
        // 顶部导航栏
        this.buildHeader();

        // 类别选择器
        this.buildCategorySelector();

        // 换算区域
        this.buildConversionArea();

        // 数字键盘
        this.buildNumberPad();
      }
      .width('100%')
      .height('100%')
      .backgroundColor('#F1F3F5')

      // 单位选择弹窗（全屏覆盖层）
      if (this.showLeftPicker) {
        this.buildUnitPicker(true);
      }
      if (this.showRightPicker) {
        this.buildUnitPicker(false);
      }
    }
    .width('100%')
    .height('100%')
  }

  /**
   * 顶部导航栏
   */
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
      .onClick(() => {
        router.back();
      })

      Text('单位换算')
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

  /**
   * 类别选择器 - 横向滚动的类别标签
   */
  @Builder
  buildCategorySelector() {
    Scroll(new Scroller()) {
      Row() {
        ForEach(this.categories, (category: ConversionCategory, index: number) => {
          Text(category)
            .fontSize($r('app.float.font_size_caption'))
            .fontColor(this.selectedCategory === category ? Color.White : '#666666')
            .padding({ left: 14, right: 14, top: 6, bottom: 6 })
            .borderRadius(16)
            .backgroundColor(this.selectedCategory === category ? '#007DFF' : '#FFFFFF')
            .border({ width: 1, color: this.selectedCategory === category ? '#007DFF' : '#E0E0E0' })
            .margin({ right: 8 })
            .onClick(() => {
              this.selectedCategory = category;
              this.leftUnitIndex = 0;
              this.rightUnitIndex = 1;
              this.doConversion();
            })
        }, (category: ConversionCategory) => category)
      }
      .padding({ left: 16, right: 16 })
    }
    .scrollable(ScrollDirection.Horizontal)
    .scrollBar(BarState.Off)
    .width('100%')
    .backgroundColor('#FFFFFF')
    .padding({ top: 10, bottom: 10 })
  }

  /**
   * 换算区域 - 左右双栏
   */
  @Builder
  buildConversionArea() {
    Row() {
      // 左侧 - 输入
      this.buildConversionPanel(
        true,
        this.leftValue,
        this.leftUnitIndex,
        () => { this.showLeftPicker = true; },
        (value: string) => {
          this.leftValue = value;
          this.doConversion();
        }
      )

      // 中间转换箭头
      Column() {
        Text('⟷')
          .fontSize(28)
          .fontColor('#007DFF')
          .fontWeight(FontWeight.Bold)
      }
      .width(40)
      .justifyContent(FlexAlign.Center)

      // 右侧 - 输出
      this.buildConversionPanel(
        false,
        this.rightValue,
        this.rightUnitIndex,
        () => { this.showRightPicker = true; },
        () => {}
      )
    }
    .width('100%')
    .layoutWeight(1)
    .padding({ left: 12, right: 12, top: 8, bottom: 8 })
    .alignItems(VerticalAlign.Top)
  }

  /**
   * 换算面板（左侧输入/右侧输出）
   */
  @Builder
  buildConversionPanel(
    isLeft: boolean,
    displayValue: string,
    unitIndex: number,
    onUnitClick: () => void,
    onValueChange: (value: string) => void
  ) {
    Column() {
      Text(isLeft ? '输入' : '输出')
        .fontSize($r('app.float.font_size_tiny'))
        .fontColor('#999999')
        .margin({ bottom: 8 })
        .width('100%')
        .textAlign(TextAlign.Center)

      Text(displayValue || '0')
        .fontSize($r('app.float.font_size_result'))
        .fontColor(isLeft ? '#1A1A1A' : '#007DFF')
        .fontWeight(FontWeight.Bold)
        .maxLines(1)
        .textOverflow({ overflow: TextOverflow.Ellipsis })
        .width('100%')
        .textAlign(TextAlign.Center)
        .padding({ top: 16, bottom: 16 })
        .backgroundColor('#FAFAFA')
        .borderRadius(12)
        .border({ width: 1, color: '#EEEEEE' })

      Blank()

      // 单位选择按钮
      Button() {
        Row() {
          Text(this.getCurrentUnits()[unitIndex].name.split(' ')[0])
            .fontSize($r('app.float.font_size_caption'))
            .fontColor('#333333')
            .maxLines(1)
            .layoutWeight(1)

          Text('▼')
            .fontSize(10)
            .fontColor('#999999')
        }
        .width('100%')
        .justifyContent(FlexAlign.SpaceBetween)
      }
      .width('100%')
      .height(36)
      .backgroundColor('#FFFFFF')
      .borderRadius(8)
      .border({ width: 1, color: '#E0E0E0' })
      .padding({ left: 10, right: 10 })
      .onClick(onUnitClick)
    }
    .layoutWeight(1)
    .height('100%')
    .padding(12)
    .backgroundColor('#FFFFFF')
    .borderRadius(16)
    .border({ width: 1, color: '#EEEEEE' })
    .shadow({ radius: 4, color: '#0A000000', offsetY: 2 })
  }

  /**
   * 数字键盘
   */
  @Builder
  buildNumberPad() {
    Column() {
      // 清除和退格行
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
            this.leftValue = '';
            this.rightValue = '';
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
            if (this.leftValue.length > 0) {
              this.leftValue = this.leftValue.slice(0, -1);
              this.doConversion();
            }
          })
      }
      .width('100%')
      .padding({ left: 12, right: 12, bottom: 4 })

      // 数字行
      Row() {
        ForEach(['7', '8', '9'], (num: string) => {
          this.buildNumberKey(num, { left: 4, right: 4 })
        })
      }
      .width('100%')
      .padding({ left: 8, right: 8, bottom: 4 })

      Row() {
        ForEach(['4', '5', '6'], (num: string) => {
          this.buildNumberKey(num, { left: 4, right: 4 })
        })
      }
      .width('100%')
      .padding({ left: 8, right: 8, bottom: 4 })

      Row() {
        ForEach(['1', '2', '3'], (num: string) => {
          this.buildNumberKey(num, { left: 4, right: 4 })
        })
      }
      .width('100%')
      .padding({ left: 8, right: 8, bottom: 4 })

      Row() {
        this.buildNumberKey('.', { left: 4, right: 4 })
        this.buildNumberKey('0', { left: 4, right: 4 })
        this.buildNumberKey('00', { left: 4, right: 4 })
      }
      .width('100%')
      .padding({ left: 8, right: 8, bottom: 4 })

      // 交换按钮行
      Row() {
        this.buildActionKey('⇄ 交换单位', '#007DFF', '#F0F7FF', () => {
          let temp = this.leftUnitIndex;
          this.leftUnitIndex = this.rightUnitIndex;
          this.rightUnitIndex = temp;
          this.doConversion();
        })
      }
      .width('100%')
      .padding({ left: 8, right: 8, bottom: 8 })
    }
    .width('100%')
    .backgroundColor('#FFFFFF')
    .padding({ top: 8, bottom: 8 })
    .border({ width: { top: 1 }, color: '#EEEEEE' })
  }

  /**
   * 数字按键
   */
  @Builder
  buildNumberKey(num: string, margin: Margin) {
    Button(num)
      .fontSize($r('app.float.font_size_text'))
      .fontColor('#1A1A1A')
      .backgroundColor('#F5F5F5')
      .layoutWeight(1)
      .height($r('app.float.key_height'))
      .borderRadius(8)
      .margin(margin)
      .onClick(() => {
        if (num === '.' && this.leftValue.indexOf('.') !== -1) {
          return;
        }
        if (this.leftValue === '0' && num !== '.') {
          this.leftValue = num;
        } else {
          this.leftValue += num;
        }
        this.doConversion();
      })
  }

  /**
   * 操作按键
   */
  @Builder
  buildActionKey(label: string, color: string, bgColor: string, action: () => void) {
    Button(label)
      .fontSize($r('app.float.font_size_text'))
      .fontColor(color)
      .backgroundColor(bgColor)
      .width('100%')
      .height($r('app.float.key_height'))
      .borderRadius(8)
      .border({ width: 1, color: color })
      .onClick(action)
  }

  /**
   * 单位选择弹窗
   */
  @Builder
  buildUnitPicker(isLeft: boolean) {
    Column() {
      Column() {
        Text(isLeft ? '选择输入单位' : '选择输出单位')
          .fontSize($r('app.float.font_size_title_medium'))
          .fontWeight(FontWeight.Bold)
          .fontColor('#1A1A1A')
          .margin({ bottom: 12 })

        List() {
          ForEach(this.getCurrentUnits(), (unit: UnitDef, index: number) => {
            ListItem() {
              Row() {
                Text(unit.name)
                  .fontSize($r('app.float.font_size_body'))
                  .fontColor('#333333')
                  .layoutWeight(1)

                if ((isLeft && index === this.leftUnitIndex) ||
                    (!isLeft && index === this.rightUnitIndex)) {
                  Text('✓')
                    .fontSize($r('app.float.font_size_text'))
                    .fontColor('#007DFF')
                    .fontWeight(FontWeight.Bold)
                }
              }
              .width('100%')
              .padding({ top: 14, bottom: 14, left: 16, right: 16 })
              .onClick(() => {
                if (isLeft) {
                  this.leftUnitIndex = index;
                } else {
                  this.rightUnitIndex = index;
                }
                this.doConversion();
                this.showLeftPicker = false;
                this.showRightPicker = false;
              })
            }
            .border({ width: { bottom: 1 }, color: '#F0F0F0' })
          }, (unit: UnitDef) => unit.name)
        }
        .width('100%')
        .constraintSize({ maxHeight: 300 })

        Button('取消')
          .fontSize($r('app.float.font_size_caption'))
          .fontColor('#999999')
          .backgroundColor('#F5F5F5')
          .width('100%')
          .height(40)
          .borderRadius(8)
          .margin({ top: 8 })
          .onClick(() => {
            this.showLeftPicker = false;
            this.showRightPicker = false;
          })
      }
      .width('85%')
      .padding(20)
      .backgroundColor(Color.White)
      .borderRadius(16)
      .shadow({ radius: 20, color: '#30000000' })
    }
    .width('100%')
    .height('100%')
    .justifyContent(FlexAlign.Center)
    .backgroundColor('#50000000')
    .position({ x: 0, y: 0 })
    .onClick(() => {
      this.showLeftPicker = false;
      this.showRightPicker = false;
    })
  }

  /**
   * 获取当前分类的单位列表
   */
  private getCurrentUnits(): UnitDef[] {
    return this.unitMap.get(this.selectedCategory) || [];
  }

  /**
   * 执行单位换算
   */
  private doConversion(): void {
    let inputVal = parseFloat(this.leftValue);
    if (isNaN(inputVal) || this.leftValue === '') {
      this.rightValue = '';
      return;
    }

    let units = this.getCurrentUnits();
    let fromUnit = units[this.leftUnitIndex];
    let toUnit = units[this.rightUnitIndex];

    if (this.selectedCategory === ConversionCategory.TEMPERATURE) {
      this.rightValue = this.convertTemperature(inputVal, this.leftUnitIndex, this.rightUnitIndex);
      return;
    }

    // 通用换算：先转为基准单位，再转为目标单位
    let baseValue = inputVal * fromUnit.factor;
    let result = baseValue / toUnit.factor;

    // 格式化结果
    if (Math.abs(result) < 0.000001 && result !== 0) {
      this.rightValue = result.toExponential(6);
    } else if (Math.abs(result) >= 1000000) {
      this.rightValue = result.toExponential(6);
    } else {
      this.rightValue = this.formatNumber(result);
    }
  }

  /**
   * 温度特殊换算
   */
  private convertTemperature(value: number, fromIndex: number, toIndex: number): string {
    let celsius = value;
    // 先转为摄氏度
    switch (fromIndex) {
      case 0: // 摄氏度
        celsius = value;
        break;
      case 1: // 华氏度
        celsius = (value - 32) * 5 / 9;
        break;
      case 2: // 开尔文
        celsius = value - 273.15;
        break;
    }
    // 从摄氏度转为目标单位
    let result = celsius;
    switch (toIndex) {
      case 0:
        result = celsius;
        break;
      case 1:
        result = celsius * 9 / 5 + 32;
        break;
      case 2:
        result = celsius + 273.15;
        break;
    }
    return this.formatNumber(result);
  }

  /**
   * 格式化数字显示
   */
  private formatNumber(num: number): string {
    if (Number.isInteger(num)) {
      return num.toString();
    }
    // 最多保留 6 位小数，去除尾部零
    let fixed = num.toFixed(6);
    return fixed.replace(/\.?0+$/, '');
  }
}
