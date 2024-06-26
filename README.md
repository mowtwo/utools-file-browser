# utools-file-browser

一个文件浏览器插件，基于 [uTools](https://u.tools/)。

## 功能列表

- [x] 读取文件目录
  - [x] 若当前在文件管理器中，则读取当前目录
  - [x] 若当前不在文件管理器中，则读取$HOME 目录
- [x] 搜索文件
  - [ ] `\+` 模糊搜索
    - [x] regex
    - [ ] ~~批量操作~~
- [x] 快速访问文件
  - [x] 采用默认软件打开
- [ ] 支持指令系统
  - [x] `\@`: 在默认文件管理器打开文件或文件夹，支持搜索
  - [x] `\!`: 浏览并切换盘符(Windows Only)
    - [x] 支持搜索
  - [x] `\?`: 显示帮助信息
  - [x] `\>`: 运行系统指令，目前默认采用 cmd(Windows)
  - [ ] `\,`: 设置功能
    - [x] 是否显示隐藏文件
    - [x] 是否显示文件大小
    - [ ] ~~是否显示文件类型~~
    - [ ] 支持设置文件列表首项功能：默认返回上级
      - [ ] 可选：返回上级、在默认文件管理器打开当前文件夹
  - [ ] `\^`: 排序功能
    - [x] 全局排序
    - [x] `\^+$type` 局部排序
      - [x] 支持搜索
  - [ ] `\@@`: 在默认文件管理器打开当前文件夹
- [ ] 支持深度搜索
  - [ ] 使用递归搜索
  - [ ] 使用迭代搜索（平铺）
  - [ ] 层级：5，创建内存索引（列表刷新时）

## TODO

- [ ] 修改指令系统
  - [ ] 使指令系统可以配置启动的控制台
    - [ ] Windows 支持 cmd 跟 powershell
    - [ ] 尝试支持 macOS
  - [ ] 封装指令系统
- [ ] 2.0
  - [ ] 支持局域网共享
    - [ ] webui

## 功能截图

![screenshot-1](./resources/screenshot-1.png)

![screenshot-2](./resources/screenshot-2.png)

![screenshot-3](./resources/screenshot-3.png)

![screenshot-4](./resources/screenshot-4.png)

## 致谢

感谢汉堡大佬的 LOGO

![logo](./src-utools/logo.png)
