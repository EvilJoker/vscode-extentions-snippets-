[官网](https://code.visualstudio.com/api/working-with-extensions/publishing-extension)
[博客](https://juejin.cn/post/7076649162653040647)


# package.json 含义
name 插件 id 
publisher 发布者
> publisher.name 插件唯一 id ,应用市场展示

displayName 展示的名称

keywords 搜索展示的 @tag 标签

version 插件版本
categories 分类
repository 代码库地址 @category 标签
bugs 提 issue 的链接
homepage 首页地址

# devops 组织名
https://dev.azure.com/dreamlandX/vscode

https://marketplace.visualstudio.com/manage/
publisher : Ashton Sun 

打包
vsce package
1. 手动上传 
2. 或者 vsce publish， token 认证不了