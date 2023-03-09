import * as vscode from 'vscode';

export class ExplorDataProvider implements vscode.TreeDataProvider<SnipItem>{
    // 事件注册
    private _onDidChangeTreeData: vscode.EventEmitter<SnipItem | undefined | void> = new vscode.EventEmitter<SnipItem | undefined | void>();
	readonly onDidChangeTreeData: vscode.Event<SnipItem | undefined | void> = this._onDidChangeTreeData.event;
    
    // 刷新动作
	refresh(): void {
        // 发送 事件
		this._onDidChangeTreeData.fire();
	}
    // 获取元素
	getTreeItem(element: SnipItem): vscode.TreeItem {
		return element;
	}
    // 获取子元素
	getChildren(element?: SnipItem): Thenable<SnipItem[]> { 
		return Promise.resolve([new SnipItem(), new SnipItem(), new SnipItem(), new SnipItem()]);

	}

}


export class SnipItem extends vscode.TreeItem {
	name :string = "myitem"
    constructor(){
        let label = "sitem"
        let collapsibleState = vscode.TreeItemCollapsibleState.None
        super(label, collapsibleState);
    }
    // item 的
    contextValue = 'snipitem';
}





