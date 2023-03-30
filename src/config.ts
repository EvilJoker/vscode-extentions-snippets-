import * as vscode from "vscode";

export class Config {

    // 基础属性
    static instance: Config;
    static context: vscode.ExtensionContext
    // 高级属性
    USER_SNIPPETS_PATH: string // usr



    constructor(context: vscode.ExtensionContext) {
        // 初始化
        console.debug('init snippets+ config');
        Config.context = context;
        
        this.USER_SNIPPETS_PATH = vscode.Uri.joinPath(context.globalStorageUri, "../../snippets").path
        this.print()
    }

    print(){
        console.debug(this.USER_SNIPPETS_PATH)
    }


    // 入口函数调用进行设置
    static createConfig(context: vscode.ExtensionContext){
        Config.instance = new Config(context)
    }
  



}
