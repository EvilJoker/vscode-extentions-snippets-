import * as vscode from 'vscode';
import { UserSnippetService } from '../service/UserSnippetService';

// 数据结构： 父-子
export class SnipItem extends vscode.TreeItem {
    label_str?: string ;
    name?: string;
    uri?: vscode.Uri;
    children?: SnipItem[] = []

    constructor(label : string, collapsibleState_str?: string) {

        let collapsibleState = vscode.TreeItemCollapsibleState.None; // 默认不可折叠
        if(collapsibleState_str == 'collapsed'){
            collapsibleState = vscode.TreeItemCollapsibleState.Collapsed;  
        }else if(collapsibleState_str == 'expanded'){
            collapsibleState = vscode.TreeItemCollapsibleState.Expanded;
        }

        super(label , collapsibleState); // label 代表显示的名字
        this.label_str = label;
    }
    // 表示该节点的上下文信息
    contextValue = 'snipitem';

    static create_empty_item(): SnipItem {
        const item = new SnipItem('empty');
        item.contextValue = 'empty';
        return item;
    }
}




export class UserViewProvider implements vscode.TreeDataProvider<SnipItem>{
    public static viewId: string = 'snippets--explor';


    // 事件注册
    private _onDidChangeTreeData: vscode.EventEmitter<SnipItem | undefined | void> = new vscode.EventEmitter<SnipItem | undefined | void>();
    readonly onDidChangeTreeData: vscode.Event<SnipItem | undefined | void> = this._onDidChangeTreeData.event;


    constructor() {
        const that = this;
        // wait for onDidChangeTreeData and _onDidChangeTreeData added
        setTimeout(() => {
            vscode.window.createTreeView((that.constructor as any).viewId, {
                treeDataProvider: that,
                showCollapseAll: true,
            });
        }, 0);
    }


    // 刷新动作
    refresh(): void {
        // 发送 事件
        this._onDidChangeTreeData.fire();
    }
    // 获取元素
    getTreeItem(element: SnipItem): vscode.TreeItem {
        return element;
    }
    // 获取子元素, element 代表父元素
    getChildren(element?: SnipItem): SnipItem[] | Thenable<SnipItem[]> {
        // 节点为空代表根节点
        if (!element) {
            return this.getSnippets();
        }

        if (!element.children) {
            return [];
        }
        return element.children;
    }




    getSnippets() : Promise<SnipItem[]>{
        //TODO tree 的叶子数据，修改为真正的数据
        // for(let i=0;i<6;i++){
        //     tree.push(new SnipItem())
        // }

        let tree = UserSnippetService.getUserSnippetsTree()
   
        return Promise.resolve(tree)
    }
    


}



