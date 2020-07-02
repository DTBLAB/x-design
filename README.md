本项目为浙江大学DTBLAB的风格迁移产品设计定制小程序前端项目。
本项目采用uni-app框架开发。

开发人员需要对html、css、javascript有基础了解，推荐在[菜鸟教程](https://www.runoob.com/)学习，此网站同时可作为手册查阅

各种命名规范推荐参考以下两篇文章：[知乎](https://zhuanlan.zhihu.com/p/47018800)、[博客](https://www.cnblogs.com/Hsong/p/9016950.html)

本框架基于Vue，[Vue中文官网](https://cn.vuejs.org/)，需通读“学习-教程”部分，并大致了解“学习-API”部分。

开发本项目建议在[uni-app官网](https://uniapp.dcloud.io/)，通读“简介”模块到"使用Vue.js注意事项"部分，请阅读“框架”模块的“pages.json”部分，大致了解“组件”和“API”部分。

项目开发使用HBuilder X编辑器，自行按照[官网](https://www.dcloud.io/hbuilderx.html)安装并配置
调试小程序端需要安装对应的官方开发者工具，如[微信开发者工具](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)、[QQ开发者工具](https://q.qq.com/wiki/tools/devtool/#%E5%BC%80%E5%8F%91%E8%80%85%E5%B7%A5%E5%85%B7stable%E7%89%88-2020-04-20-%E6%9B%B4%E6%96%B0);
此外，请在各个小程序平台注册账号与小程序id，才能正常使用，并在各个工具设置中打开服务端口。

本项目使用less作为css预编译语法，优化开发体验，[less官网](http://lesscss.cn/)，请通读。
css命名采用BEM命名法，参见[BEM官网](https://bemcss.com/)。

项目目录结构如下：<br>
common，放置css样式资源文件；<br>
component，放置自定义vue组件；<br>
components，放置uni-ui官方拓展组件，请勿改动；<br>
pages，放置页面，主要的开发目录；<br>
static，静态资源目录，放置图片、视频等；<br>
unpackage，编译输出目录，请勿改动；<br>

根目录下文件，除了pages.json，不建议架构师之外人员做修改。

连接本地服务器时，需关闭小程序服务器域名安全校验，以微信小程序为例，点击开发者工具右上角双箭头“>>”，选择“详情”，在“本地设置”中勾选“不校验合法域名、web-view、TLS版本以及HTTPS证书”选项。

本项目以uni.request方法为基础、仿照axios封装了get和post，并进行了全局配置，通过this.$http.get和this.$http.post可以发起get和post请求，包含url、data、config三个参数；<br>
config为对象形式，为可选参数，config可包含uni.request方法参数中除url、data、method、success、fail、complete之外的其他属性；<br>
请求结果通过then、catch、finally处理，同axios，无需传入success、fail、complete作为参数；<br>
有别于axios，get参数可以直接传参入data，不用再包装一层params。<br>