import router from '@ohos.router';
import historyViewModel from '../viewmodel/HistoryViewModel';
import { HistoryItem } from '../model/HistoryItem';

@Entry
@Component
struct HistoryPage {
  @State records: Array<HistoryItem> = historyViewModel.getRecords();
  @State hasRecords: boolean = historyViewModel.getCount() > 0;

  aboutToAppear(): void {
    this.refreshList();
  }

  refreshList(): void {
    this.records = historyViewModel.getRecords();
    this.hasRecords = this.records.length > 0;
  }

  build() {
    Column() {
      // Title bar
      Row() {
        Text('←')
          .fontSize($r('app.float.font_size_back_icon'))
          .fontColor(Color.Black)
          .padding({ left: 12, right: 12, top: 8, bottom: 8 })
          .onClick(() => {
            router.back();
          })

        Blank()

        Text('计算记录')
          .fontSize($r('app.float.font_size_title_medium'))
          .fontColor('#182431')

        Blank()

        Text('清空')
          .fontSize($r('app.float.font_size_caption'))
          .fontColor(this.hasRecords ? '#007DFF' : '#CCCCCC')
          .padding({ left: 12, right: 12, top: 8, bottom: 8 })
          .onClick(() => {
            if (this.hasRecords) {
              historyViewModel.clearAll();
              this.refreshList();
            }
          })
      }
      .width('100%')
      .height($r('app.float.page_header_height_small'))
      .backgroundColor('#F5F5F5')
      .padding({ left: 4, right: 4 })

      // Divider
      Divider()
        .strokeWidth(1)
        .color('#E0E0E0')

      // History list
      if (this.hasRecords) {
        List() {
          ForEach(this.records, (item: HistoryItem, index: number) => {
            ListItem() {
              Column() {
                Text(item.expression)
                  .fontSize($r('app.float.font_size_title_medium'))
                  .fontColor('#007DFF')
                  .maxLines(1)
                  .textOverflow({ overflow: TextOverflow.Ellipsis })
                  .width('100%')
                  .textAlign(TextAlign.End)

                Text(`= ${item.result}`)
                  .fontSize($r('app.float.font_size_result'))
                  .fontColor('#182431')
                  .fontWeight(FontWeight.Bold)
                  .maxLines(1)
                  .textOverflow({ overflow: TextOverflow.Ellipsis })
                  .width('100%')
                  .textAlign(TextAlign.End)
                  .margin({ top: 4 })

                Text(this.formatTime(item.timestamp))
                  .fontSize($r('app.float.font_size_tiny'))
                  .fontColor('#AAAAAA')
                  .margin({ top: 6 })
              }
              .width('100%')
              .alignItems(HorizontalAlign.End)
              .padding({ left: 16, right: 16, top: 14, bottom: 14 })
            }
            .borderRadius(8)
            .backgroundColor(Color.White)
            .margin({ left: 12, right: 12, top: 4, bottom: 4 })
            .shadow({
              radius: 2,
              color: '#10000000',
              offsetY: 1
            })
          }, (item: HistoryItem) => item.timestamp.toString())
        }
        .width('100%')
        .layoutWeight(1)
        .backgroundColor('#F5F5F5')
        .padding({ top: 4, bottom: 4 })
        .divider({
          strokeWidth: 0
        })
      } else {
        // Empty state
        Column() {
          Text('暂无计算记录')
            .fontSize($r('app.float.font_size_body'))
            .fontColor('#AAAAAA')
            .margin({ top: 20 })

          Text('在计算器页面点击 + 按钮添加记录')
            .fontSize($r('app.float.font_size_caption'))
            .fontColor('#CCCCCC')
            .margin({ top: 6 })
        }
        .width('100%')
        .layoutWeight(1)
        .justifyContent(FlexAlign.Center)
        .backgroundColor('#F5F5F5')
      }
    }
    .width('100%')
    .height('100%')
    .backgroundColor('#F5F5F5')
  }

  /**
   * Format timestamp to readable time string.
   */
  formatTime(timestamp: number): string {
    let date = new Date(timestamp);
    let year = date.getFullYear();
    let month = (date.getMonth() + 1).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');
    let hour = date.getHours().toString().padStart(2, '0');
    let min = date.getMinutes().toString().padStart(2, '0');
    let sec = date.getSeconds().toString().padStart(2, '0');
    return `${year}-${month}-${day} ${hour}:${min}:${sec}`;
  }
}
