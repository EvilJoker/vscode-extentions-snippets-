# 打印日志
**日志输出**
1. 使用默认的输出器 console.log()/console.error()/console.debug()
2. 自定义：自定义完后可以在 下方 out put 里查看
import * as vscode from 'vscode';
const logger: vscode.OutputChannel = vscode.window.createOutputChannel('Error Logger');
logger.appendLine(errorMessage);
logger.show();

**日志配置**
1. launch.json
```
    "configurations": [
        {
            "name": "Extension Launch",
            "type": "extensionHost",
            "request": "launch",
            "runtimeExecutable": "${execPath}",
            "args": ["--extensionDevelopmentPath=${workspaceFolder}", "--disable-extensions", "--enable-proposed-api=your.extension.id"],
            "outFiles": [
                "${workspaceFolder}/extension/log.txt"
            ],
            "logLevel": "trace" // 设置 log level
        }
    ]
```
2. command palte 设置： set log

**日志查看**
这个可以生效 : help -> 开发者工具
1. command palte 设置： show log -> : extension host
2. output : extension host
