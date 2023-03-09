# 调试
入口 extension.ts , 按f5
# 最左侧的图标是  activitybar， 相当于导航栏

https://code.visualstudio.com/api/references/contribution-points#contributes.viewsContainers

# 左侧面板
树状 view 的demo
> viewsContainers 最左侧导航栏:  1. 向已有 view (exporer\debug\scm\test)  2. 自定义 view
> view 左侧panel比如文件树


ui https://code.visualstudio.com/api/ux-guidelines/views#links
api https://code.visualstudio.com/api/references/contribution-points#contributes.views
demo https://github.com/microsoft/vscode-extension-samples/tree/main/tree-view-sample

# 悬浮菜单
> when 来触发： 只 应用在 menus, 但是 enablement 应用在所有 menus (甚至 keybinding)
> command 定义 动作
> submenu 子菜单
> group 定义 itens 的排序
> navigation group 是特殊，被置于顶层

ui  https://code.visualstudio.com/api/ux-guidelines/context-menus
api https://code.visualstudio.com/api/references/contribution-points#contributes.menus
> built-in 的menu

给 view/item/item 添加菜单
https://code.visualstudio.com/api/references/contribution-points#contributes.views

方式：package.json 定义 command; 配置package.json "view/item/context"; ts 实现 command

其他： inline 是 timeline 排列的样式