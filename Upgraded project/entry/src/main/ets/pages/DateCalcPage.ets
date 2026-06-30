/*
 * Date Calculation Page - 日期计算页面
 * 支持两种模式：日期间隔计算 / 日期加减
 */

import router from '@ohos.router';

enum CalcMode {
  INTERVAL = '日期间隔',
  ADD_SUB = '日期加减'
}

@Entry
@Component
struct DateCalcPage {
  @State currentMode: CalcMode = CalcMode.INTERVAL;

  // 日期间隔模式
  @State startYear: number = new Date().getFullYear();
  @State startMonth: number = new Date().getMonth() + 1;
  @State startDay: number = new Date().getDate();
  @State endYear: number = new Date().getFullYear();
  @State endMonth: number = new Date().getMonth() + 1;
  @State endDay: number = new Date().getDate();
  @State intervalResult: string = '';

  // 日期加减模式
  @State baseYear: number = new Date().getFullYear();
  @State baseMonth: number = new Date().getMonth() + 1;
  @State baseDay: number = new Date().getDate();
  @State daysToAdd: string = '30';
  @State addSubResult: string = '';

  aboutToAppear(): void {
    this.calcInterval();
  }

  build() {
    Column() {
      this.buildHeader();

      // 模式切换
      Row() {
        Button(this.currentMode === CalcMode.INTERVAL ? CalcMode.INTERVAL : `  ${CalcMode.INTERVAL}`)
          .fontSize($r('app.float.font_size_caption'))
          .fontColor(this.currentMode === CalcMode.INTERVAL ? Color.White : '#666666')
          .backgroundColor(this.currentMode === CalcMode.INTERVAL ? '#007DFF' : '#F5F5F5')
          .borderRadius(20)
          .height(36)
          .padding({ left: 16, right: 16 })
          .border({ width: 1, color: this.currentMode === CalcMode.INTERVAL ? '#007DFF' : '#E0E0E0' })
          .onClick(() => { this.currentMode = CalcMode.INTERVAL; this.calcInterval(); })

        Button(this.currentMode === CalcMode.ADD_SUB ? CalcMode.ADD_SUB : `  ${CalcMode.ADD_SUB}`)
          .fontSize($r('app.float.font_size_caption'))
          .fontColor(this.currentMode === CalcMode.ADD_SUB ? Color.White : '#666666')
          .backgroundColor(this.currentMode === CalcMode.ADD_SUB ? '#007DFF' : '#F5F5F5')
          .borderRadius(20)
          .height(36)
          .padding({ left: 16, right: 16 })
          .margin({ left: 8 })
          .border({ width: 1, color: this.currentMode === CalcMode.ADD_SUB ? '#007DFF' : '#E0E0E0' })
          .onClick(() => { this.currentMode = CalcMode.ADD_SUB; this.calcAddSub(); })
      }
      .width('100%')
      .justifyContent(FlexAlign.Center)
      .padding({ top: 12, bottom: 8 })

      if (this.currentMode === CalcMode.INTERVAL) {
        this.buildIntervalMode();
      } else {
        this.buildAddSubMode();
      }

      // 结果展示
      this.buildResultPanel();
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

      Text('日期计算')
        .fontSize($r('app.float.font_size_title_large')).fontWeight(FontWeight.Bold)
        .fontColor('#1A1A1A').margin({ left: 8 })
    }
    .width('100%').height($r('app.float.page_header_height'))
    .padding({ left: 16, right: 16 }).backgroundColor('#FFFFFF')
    .shadow({ radius: 4, color: '#10000000', offsetY: 2 })
  }

  // ==================== 日期间隔模式 ====================

  @Builder
  buildIntervalMode() {
    Column() {
      this.buildDateCard('起始日期', this.startYear, this.startMonth, this.startDay,
        (y, m, d) => { this.startYear = y; this.startMonth = m; this.startDay = d; this.calcInterval(); })

      Row() {
        Text('↓').fontSize(24).fontColor('#007DFF')
      }
      .width('100%').justifyContent(FlexAlign.Center).margin({ top: 4, bottom: 4 })

      this.buildDateCard('结束日期', this.endYear, this.endMonth, this.endDay,
        (y, m, d) => { this.endYear = y; this.endMonth = m; this.endDay = d; this.calcInterval(); })
    }
    .width('100%').padding({ left: 16, right: 16, top: 4 })
  }

  // ==================== 日期加减模式 ====================

  @Builder
  buildAddSubMode() {
    Column() {
      this.buildDateCard('基准日期', this.baseYear, this.baseMonth, this.baseDay,
        (y, m, d) => { this.baseYear = y; this.baseMonth = m; this.baseDay = d; this.calcAddSub(); })

      // 天数输入
      Column() {
        Text('加减天数（负数表示往前）')
          .fontSize($r('app.float.font_size_tiny')).fontColor('#999999')

        Row() {
          Button('-')
            .fontSize($r('app.float.font_size_title_large')).fontColor('#FF5252')
            .backgroundColor('#FFF0F0').width(48).height(40).borderRadius(8)
            .onClick(() => {
              let n = parseInt(this.daysToAdd) || 0;
              this.daysToAdd = (n - 1).toString();
              this.calcAddSub();
            })

          TextInput({ text: this.daysToAdd })
            .fontSize($r('app.float.font_size_input')).fontWeight(FontWeight.Bold)
            .textAlign(TextAlign.Center).type(InputType.Number)
            .backgroundColor('#FAFAFA').layoutWeight(1).height(48)
            .borderRadius(8).border({ width: 1, color: '#E0E0E0' })
            .margin({ left: 8, right: 8 })
            .onChange((v: string) => { this.daysToAdd = v; this.calcAddSub(); })

          Button('+')
            .fontSize($r('app.float.font_size_title_large')).fontColor('#4CAF50')
            .backgroundColor('#E8F5E9').width(48).height(40).borderRadius(8)
            .onClick(() => {
              let n = parseInt(this.daysToAdd) || 0;
              this.daysToAdd = (n + 1).toString();
              this.calcAddSub();
            })
        }
        .width('100%').margin({ top: 8 })

        // 快捷天数
        Row() {
          ForEach(['7', '30', '90', '180', '365', '-7', '-30'], (d: string) => {
            Button(d)
              .fontSize($r('app.float.font_size_tiny')).fontColor('#007DFF')
              .backgroundColor('#F0F7FF').height(30).borderRadius(15)
              .padding({ left: 10, right: 10 }).margin({ right: 6 })
              .onClick(() => { this.daysToAdd = d; this.calcAddSub(); })
          })
        }
        .width('100%').margin({ top: 6 })
      }
      .width('100%').padding(16).backgroundColor('#FFFFFF')
      .borderRadius(16).border({ width: 1, color: '#EEEEEE' })
      .margin({ top: 8 })
    }
    .width('100%').padding({ left: 16, right: 16, top: 4 })
  }

  // ==================== 日期卡片 ====================

  @Builder
  buildDateCard(
    title: string,
    year: number, month: number, day: number,
    onChange: (y: number, m: number, d: number) => void
  ) {
    Column() {
      Text(title)
        .fontSize($r('app.float.font_size_tiny')).fontColor('#999999')
        .width('100%')

      Row() {
        Text(this.formatDate(year, month, day))
          .fontSize($r('app.float.font_size_result')).fontWeight(FontWeight.Bold)
          .fontColor('#1A1A1A').layoutWeight(1)

        Text(this.getWeekday(year, month, day))
          .fontSize($r('app.float.font_size_caption')).fontColor('#999999')
          .margin({ right: 8 })
      }
      .width('100%').margin({ top: 4, bottom: 8 })

      DatePicker({
        start: new Date('1970-1-1'),
        end: new Date('2099-12-31'),
        selected: new Date(year, month - 1, day)
      })
        .onChange((value: DatePickerResult) => {
          onChange(value.year as number, (value.month as number) + 1, value.day as number);
        })
    }
    .width('100%').padding(16).backgroundColor('#FFFFFF')
    .borderRadius(16).border({ width: 1, color: '#EEEEEE' })
    .shadow({ radius: 4, color: '#0A000000', offsetY: 2 })
  }

  // ==================== 结果面板 ====================

  @Builder
  buildResultPanel() {
    Column() {
      if (this.currentMode === CalcMode.INTERVAL) {
        Text(this.intervalResult)
          .fontSize($r('app.float.font_size_input'))
          .fontWeight(FontWeight.Bold)
          .fontColor('#007DFF')
          .textAlign(TextAlign.Center)

        if (this.intervalResult) {
          Text(this.getIntervalDetail())
            .fontSize($r('app.float.font_size_caption'))
            .fontColor('#999999')
            .margin({ top: 4 })
            .textAlign(TextAlign.Center)
        }
      } else {
        Text(this.addSubResult)
          .fontSize($r('app.float.font_size_input'))
          .fontWeight(FontWeight.Bold)
          .fontColor('#007DFF')
          .textAlign(TextAlign.Center)

        if (this.addSubResult) {
          Text(this.getAddSubDetail())
            .fontSize($r('app.float.font_size_caption'))
            .fontColor('#999999')
            .margin({ top: 4 })
            .textAlign(TextAlign.Center)
        }
      }
    }
    .width('100%').padding(20).backgroundColor('#FFFFFF')
    .borderRadius(16).border({ width: 1, color: '#E3F2FD' })
    .margin({ left: 16, right: 16, top: 16 })
    .shadow({ radius: 4, color: '#0A000000', offsetY: 2 })
  }

  // ==================== 计算方法 ====================

  private calcInterval(): void {
    let start = new Date(this.startYear, this.startMonth - 1, this.startDay);
    let end = new Date(this.endYear, this.endMonth - 1, this.endDay);
    let diffMs = end.getTime() - start.getTime();
    let diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      this.intervalResult = '同一天';
    } else if (diffDays > 0) {
      this.intervalResult = `相差 ${diffDays} 天`;
    } else {
      this.intervalResult = `相差 ${Math.abs(diffDays)} 天（往前）`;
    }
  }

  private calcAddSub(): void {
    let base = new Date(this.baseYear, this.baseMonth - 1, this.baseDay);
    let days = parseInt(this.daysToAdd);
    if (isNaN(days)) { this.addSubResult = '请输入有效天数'; return; }
    let result = new Date(base.getTime() + days * 24 * 60 * 60 * 1000);
    this.addSubResult = `${result.getFullYear()}年${result.getMonth() + 1}月${result.getDate()}日`;
  }

  private getIntervalDetail(): string {
    let start = new Date(this.startYear, this.startMonth - 1, this.startDay);
    let end = new Date(this.endYear, this.endMonth - 1, this.endDay);
    let diffMs = Math.abs(end.getTime() - start.getTime());
    let days = Math.round(diffMs / (1000 * 60 * 60 * 24));
    let weeks = Math.floor(days / 7);
    let remainDays = days % 7;
    let detail = `约 ${weeks} 周`;
    if (remainDays > 0) detail += ` ${remainDays} 天`;
    if (days >= 365) {
      let years = Math.floor(days / 365);
      let r = days % 365;
      let months = Math.floor(r / 30);
      detail = `约 ${years} 年`;
      if (months > 0) detail += ` ${months} 个月`;
    }
    return detail;
  }

  private getAddSubDetail(): string {
    let days = parseInt(this.daysToAdd);
    if (isNaN(days)) return '';
    let base = new Date(this.baseYear, this.baseMonth - 1, this.baseDay);
    let result = new Date(base.getTime() + days * 24 * 60 * 60 * 1000);
    return `${this.getWeekday(result.getFullYear(), result.getMonth() + 1, result.getDate())}`;
  }

  private formatDate(y: number, m: number, d: number): string {
    return `${y}-${m.toString().padStart(2, '0')}-${d.toString().padStart(2, '0')}`;
  }

  private getWeekday(y: number, m: number, d: number): string {
    let weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    let date = new Date(y, m - 1, d);
    return weekdays[date.getDay()];
  }
}
