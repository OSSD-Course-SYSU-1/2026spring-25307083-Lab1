analysis of the original project
    一:app.json5位于项目根目录，是全局配置代码文件，代码主要定义应用的全局身份以及最基础的一些信息。
app.json5中的核心字段
    1：bundleName:应用包名，采用了反向域名格式，是系统识别应用的标识。在本例子中，bundleName为"example.com.simplecaculator".对应其简易计算器的功能
    2：vendor：开发者或者厂商名称，与应用商店分发体系有所关联。
    二: 模块配置文件：module.json5
核心字段
    1:abilities:用于声明该模块包含的ability组件,在Stage模型中,主要包含两个部分 UIAbility和ExtensionAbility,分别提供UI界面交互功能和特定场景扩展功能.

    2:requestPermissions:声明模块运行所需要进行请求的系统权限.

    三:各种页面文件 (ets/pages/*.ets)
    这些文件位于模块的ets/pages/目录下,基于ArkUI声明式范式进行开发,用于实现应用界面.
     
     特别地，其中的rsc文件夹下面的资源文件用于存放所有静态资源；
     包括用于存放字符串的string.json和color.json
     以及存放图片媒体视频等资源的media文件

     最后是编译，构建相关代码文件
     hvigor文件夹中的build-profile.json5用于配置模块构建选项。
     hvigor-config.json5用于配置构建工具hvigor。



