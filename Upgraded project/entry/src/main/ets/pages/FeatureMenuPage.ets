/*
 * Feature Menu Page - 功能菜单页面
 * 从主页左滑进入，提供各种扩展功能的入口
 */

import router from '@ohos.router';

/**
 * 功能项数据结构
 */
class FeatureItem {
  id: string;
  name: string;
  icon: string;
  color: string;
  route: string;

  constructor(id: string, name: string, icon: string, color: string, route: string) {
    this.id = id;
    this.name = name;
    this.icon = icon;
    this.color = color;
    this.route = route;
  }
}

@Entry
@Component
struct FeatureMenuPage {
  @State features: FeatureItem[] = [
    new FeatureItem('unit_conversion', '单位换算', '⇄', '#4CAF50', 'pages/UnitConversionPage'),
    new FeatureItem('currency', '汇率换算', '¥', '#FF9800', 'pages/CurrencyConversionPage'),
    new FeatureItem('date_calc', '日期计算', '📅', '#2196F3', 'pages/DateCalcPage'),
    new FeatureItem('bmi', 'BMI计算', '⚖', '#9C27B0', 'pages/BMIPage'),
    new FeatureItem('tip', '小费计算', '💰', '#F44336', 'pages/TipPage'),
    new FeatureItem('mortgage', '房贷计算', '🏠', '#795548', 'pages/MortgagePage'),
  ];

  build() {
    Column() {
      // 顶部导航栏
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

        Text('功能菜单')
          .fontSize($r('app.float.font_size_title_large'))
          .fontWeight(FontWeight.Bold)
          .fontColor('#1A1A1A')
          .margin({ left: 8 })

        Blank()
      }
      .width('100%')
      .height($r('app.float.page_header_height'))
      .padding({ left: 16, right: 16 })
      .backgroundColor('#FFFFFF')
      .shadow({ radius: 4, color: '#10000000', offsetY: 2 })

      // 功能列表
      Scroll() {
        Grid() {
          ForEach(this.features, (item: FeatureItem, index: number) => {
            GridItem() {
              this.buildFeatureCard(item)
            }
          }, (item: FeatureItem) => item.id)
        }
        .columnsTemplate('1fr 1fr')
        .columnsGap(12)
        .rowsGap(12)
        .padding({ left: 16, right: 16, top: 20, bottom: 20 })
        .width('100%')
      }
      .layoutWeight(1)
      .backgroundColor('#F1F3F5')
      .width('100%')
    }
    .width('100%')
    .height('100%')
    .backgroundColor('#FFFFFF')
  }

  /**
   * 构建功能卡片
   */
  @Builder
  buildFeatureCard(item: FeatureItem) {
    Column() {
      Text(item.icon)
        .fontSize(36)
        .margin({ bottom: 12 })

      Text(item.name)
        .fontSize($r('app.float.font_size_body'))
        .fontWeight(FontWeight.Medium)
        .fontColor('#1A1A1A')
        .margin({ bottom: 6 })

      if (item.route !== '') {
        Text('点击进入 →')
          .fontSize($r('app.float.font_size_tiny'))
          .fontColor('#999999')
      } else {
        Text('即将推出')
          .fontSize($r('app.float.font_size_tiny'))
          .fontColor('#BBBBBB')
      }
    }
    .width('100%')
    .padding({ top: 24, bottom: 24 })
    .backgroundColor('#FFFFFF')
    .borderRadius(16)
    .border({ width: 1, color: '#EEEEEE' })
    .shadow({ radius: 4, color: '#0A000000', offsetY: 2 })
    .onClick(() => {
      if (item.route !== '') {
        router.pushUrl({ url: item.route });
      }
    })
  }
}
