https://code.visualstudio.com/docs/editor/userdefinedsnippets

# 1. snippets 的数据格式

// in file 'Code/User/snippets/javascript.json'
{
  "For Loop": { // snippet 的 名称
    "scope" :"javascript,html" // 语言域
    "prefix": ["for", "for-const"], // 前缀， 定义触发的关键词
    "body": ["for (const ${2:element} of ${1:array}) {", "\t$0", "}"], // 代码内容
    "description": "A for loop." // 描述
    "isFileTemplate" :"true" // 可选： 是否作为模板文件，是的话 替换整个文件
  }
}
## scopped 分类： 
+ scoped 属性
> language: 语言相关才会被推荐 javascript.json  
> project : 项目相关才会被推荐


+ language :  
> 全局 global : 定义在 global.code-snippets。 "scope" :"javascript,html" 区分
> 语言: javascript.json 


+ project 在 .vscode 下 ,类似global 和 script


# 2. snippets 插件
https://code.visualstudio.com/api/language-extensions/snippet-guide#using-textmate-snippets

contributes.snippets 是一个 Contribution Point

+ 插件的 package.json, 分类为  "categories": ["Snippets"]

# 参考的插件

Devon Ray.Snippet
> 比较理想，但不是 vscode 支持的格式，不易保存
zjffun.Snippets Manager
> 界面比较好
inu1255.Easy Snippet
> 左侧边栏 是理想的合适