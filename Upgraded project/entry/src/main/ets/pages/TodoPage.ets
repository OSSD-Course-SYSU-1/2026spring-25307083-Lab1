import { common } from '@kit.AbilityKit';
import router from '@ohos.router';
import Logger from '../common/util/Logger';
import { TodoViewModel } from '../viewmodel/TodoViewModel';
import { TodoItem } from '../model/TodoItem';

const TAG = 'TodoPage';

@Entry
@Component
struct TodoPage {
  /** ViewModel 实例 */
  @State viewModel: TodoViewModel = new TodoViewModel();
  /** 输入框文本（双向绑定到 ViewModel） */
  @State inputText: string = '';
  /** 编辑弹窗是否可见 */
  @State showEditDialog: boolean = false;

  aboutToAppear(): void {
    const context = getContext(this) as common.UIAbilityContext;
    this.viewModel.initialize(context);
    Logger.info(TAG, 'TodoPage aboutToAppear');
  }

  aboutToDisappear(): void {
    this.viewModel.save();
    Logger.info(TAG, 'TodoPage aboutToDisappear');
  }

  build() {
    Column() {
      // ========== 顶部状态栏 ==========
      this.buildHeader();

      // ========== 输入区域 ==========
      this.buildInputArea();

      // ========== 待办列表 ==========
      this.buildTodoList();

      // ========== 底部工具栏 ==========
      this.buildBottomBar();
    }
    .width('100%')
    .height('100%')
    .backgroundColor('#F1F3F5')
  }

  /**
   * 顶部状态栏：显示同步状态和返回按钮。
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

      Text('待办事项')
        .fontSize($r('app.float.font_size_title_large'))
        .fontWeight(FontWeight.Bold)
        .fontColor('#1A1A1A')
        .margin({ left: 8 })

      Blank()

      Row() {
        Circle({ width: 8, height: 8 })
          .fill(this.viewModel.isConnected ? '#4CAF50' : '#FF9800')
          .margin({ right: 4 })

        Text(this.viewModel.syncStatusText)
          .fontSize($r('app.float.font_size_small'))
          .fontColor('#666666')
          .maxLines(1)
      }
      .padding({ left: 10, right: 10, top: 4, bottom: 4 })
      .backgroundColor('#FFFFFF')
      .borderRadius(12)
      .border({ width: 1, color: '#E0E0E0' })
    }
    .width('100%')
    .height($r('app.float.page_header_height'))
    .padding({ left: 16, right: 16 })
    .backgroundColor('#FFFFFF')
    .shadow({ radius: 4, color: '#10000000', offsetY: 2 })
  }

  /**
   * 输入区域：文本输入框 + 添加按钮。
   */
  @Builder
  buildInputArea() {
    Row() {
      TextInput({ placeholder: '输入新的待办事项...', text: this.inputText })
        .layoutWeight(1)
        .height($r('app.float.button_height'))
        .fontSize($r('app.float.font_size_body'))
        .backgroundColor('#FFFFFF')
        .borderRadius(22)
        .padding({ left: 16, right: 16 })
        .border({ width: 1, color: '#E0E0E0' })
        .onChange((value: string) => {
          this.inputText = value;
          this.viewModel.inputText = value;
        })
        .onSubmit(() => {
          this.viewModel.addTodo();
          this.inputText = '';
        })

      Button('添加')
        .fontSize($r('app.float.font_size_caption'))
        .fontColor(Color.White)
        .backgroundColor('#007DFF')
        .borderRadius(22)
        .height($r('app.float.button_height'))
        .padding({ left: 20, right: 20 })
        .margin({ left: 8 })
        .onClick(() => {
          this.viewModel.addTodo();
          this.inputText = '';
        })
    }
    .width('100%')
    .padding({ left: 16, right: 16, top: 12, bottom: 8 })
  }

  /**
   * 待办列表区域。
   */
  @Builder
  buildTodoList() {
    if (this.viewModel.todoItems.length === 0) {
      Column() {
        Text('📝')
          .fontSize($r('app.float.empty_icon_size'))
          .margin({ bottom: 12 })

        Text('暂无待办事项')
          .fontSize($r('app.float.font_size_body'))
          .fontColor('#999999')

        Text('添加一条新任务开始吧')
          .fontSize($r('app.float.font_size_caption'))
          .fontColor('#BBBBBB')
          .margin({ top: 4 })
      }
      .width('100%')
      .layoutWeight(1)
      .justifyContent(FlexAlign.Center)
    } else {
      List() {
        ForEach(this.viewModel.todoItems, (item: TodoItem, index: number) => {
          ListItem() {
            this.buildTodoItem(item)
          }
        }, (item: TodoItem) => item.id)
      }
      .layoutWeight(1)
      .width('100%')
      .padding({ left: 16, right: 16, top: 4 })
      .divider({
        strokeWidth: 1,
        color: '#F0F0F0',
        startMargin: 56,
        endMargin: 16
      })
    }
  }

  /**
   * 单个待办事项组件。
   */
  @Builder
  buildTodoItem(item: TodoItem) {
    Row() {
      // 完成状态复选框
      Checkbox({ name: item.id, group: 'todoGroup' })
        .select(item.completed)
        .selectedColor('#4CAF50')
        .width($r('app.float.icon_size_small'))
        .height($r('app.float.icon_size_small'))
        .margin({ right: 12 })
        .onChange((value: boolean) => {
          this.viewModel.toggleTodo(item.id);
        })

      // 标题文本
      Column() {
        Text(item.title)
          .fontSize($r('app.float.font_size_body'))
          .fontColor(item.completed ? '#AAAAAA' : '#1A1A1A')
          .decoration({ type: item.completed ? TextDecorationType.LineThrough : TextDecorationType.None })
          .maxLines(2)
          .textOverflow({ overflow: TextOverflow.Ellipsis })

        Text(this.formatTime(item.createTime))
          .fontSize($r('app.float.font_size_tiny'))
          .fontColor('#BBBBBB')
          .margin({ top: 2 })
      }
      .alignItems(HorizontalAlign.Start)
      .layoutWeight(1)

      // 编辑按钮
      Button({ type: ButtonType.Circle }) {
        Text('✎')
          .fontSize($r('app.float.font_size_caption'))
          .fontColor('#007DFF')
      }
      .width($r('app.float.button_icon_size'))
      .height($r('app.float.button_icon_size'))
      .backgroundColor('#F0F7FF')
      .margin({ right: 4 })
      .onClick(() => {
        this.viewModel.startEdit(item.id, item.title);
        this.showEditDialog = true;
      })

      // 删除按钮
      Button({ type: ButtonType.Circle }) {
        Text('✕')
          .fontSize($r('app.float.font_size_caption'))
          .fontColor('#FF5252')
      }
      .width($r('app.float.button_icon_size'))
      .height($r('app.float.button_icon_size'))
      .backgroundColor('#FFF0F0')
      .onClick(() => {
        this.viewModel.deleteTodo(item.id);
      })
    }
    .width('100%')
    .padding({ top: 14, bottom: 14 })
    .backgroundColor('#FFFFFF')
    .borderRadius(8)
    .margin({ bottom: 6 })
    .padding({ left: 12, right: 8 })
  }

  /**
   * 底部工具栏：显示统计信息和操作按钮。
   */
  @Builder
  buildBottomBar() {
    Row() {
      Text(`${this.viewModel.getPendingCount()} 项待完成`)
        .fontSize($r('app.float.font_size_caption'))
        .fontColor('#888888')

      Blank()

      Button('清除已完成')
        .fontSize($r('app.float.font_size_small'))
        .fontColor('#FF5252')
        .backgroundColor(Color.Transparent)
        .height(32)
        .padding({ left: 12, right: 12 })
        .border({ width: 1, color: '#FFCDD2', radius: 16 })
        .onClick(() => {
          this.viewModel.clearCompleted();
        })
    }
    .width('100%')
    .height($r('app.float.page_header_height_small'))
    .padding({ left: 20, right: 16 })
    .backgroundColor('#FFFFFF')
    .border({ width: { top: 1 }, color: '#EEEEEE' })

    // ========== 编辑弹窗 ==========
    if (this.showEditDialog) {
      this.buildEditDialog()
    }
  }

  /**
   * 编辑弹窗。
   */
  @Builder
  buildEditDialog() {
    Column() {
      Column() {
        Text('编辑待办事项')
          .fontSize($r('app.float.font_size_title_medium'))
          .fontWeight(FontWeight.Bold)
          .margin({ bottom: 16 })

        TextInput({ text: this.viewModel.editingText })
          .fontSize($r('app.float.font_size_body'))
          .width('100%')
          .height($r('app.float.button_height'))
          .backgroundColor('#F5F5F5')
          .borderRadius(8)
          .padding({ left: 12, right: 12 })
          .onChange((value: string) => {
            this.viewModel.editingText = value;
          })
          .onSubmit(() => {
            this.viewModel.confirmEdit();
            this.showEditDialog = false;
          })

        Row() {
          Button('取消')
            .fontSize($r('app.float.font_size_caption'))
            .fontColor('#666666')
            .backgroundColor('#F5F5F5')
            .layoutWeight(1)
            .height($r('app.float.button_dialog_height'))
            .borderRadius(8)
            .margin({ right: 8 })
            .onClick(() => {
              this.viewModel.cancelEdit();
              this.showEditDialog = false;
            })

          Button('确认')
            .fontSize($r('app.float.font_size_caption'))
            .fontColor(Color.White)
            .backgroundColor('#007DFF')
            .layoutWeight(1)
            .height($r('app.float.button_dialog_height'))
            .borderRadius(8)
            .onClick(() => {
              this.viewModel.confirmEdit();
              this.showEditDialog = false;
            })
        }
        .width('100%')
        .margin({ top: 16 })
      }
      .width('80%')
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
      // 点击遮罩关闭
      this.viewModel.cancelEdit();
      this.showEditDialog = false;
    })
    .hitTestBehavior(HitTestMode.Block)
  }

  /**
   * 格式化时间戳为可读字符串。
   */
  private formatTime(timestamp: number): string {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - timestamp;
    const oneDay = 24 * 60 * 60 * 1000;

    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    if (diff < oneDay && now.getDate() === date.getDate()) {
      return `今天 ${hours}:${minutes}`;
    }
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${month}-${day} ${hours}:${minutes}`;
  }
}
