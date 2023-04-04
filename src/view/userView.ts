import * as vscode from 'vscode';
import { SnippetInstance } from '../entry/model';
import { UserSnippetService } from '../service/UserSnippetService';

// 数据结构： 父-子
export class SnipItem extends vscode.TreeItem {
    name?: string;
    children?: SnipItem[] | null;
    isSnip?: boolean;// 是否是叶子节点
    snipInst?: SnippetInstance;

    constructor(label: string, isSnip?: boolean, snipInst?: SnippetInstance) {

        let collapsibleState = isSnip ? vscode.TreeItemCollapsibleState.None : vscode.TreeItemCollapsibleState.Collapsed;  // 默认可折叠
        super(label, collapsibleState); // label 代表显示的名字

        this.isSnip = isSnip;
        this.snipInst = snipInst;
        if (isSnip) {
            this.tooltip = new vscode.MarkdownString(`\n\n\`\`\`${snipInst?.scope}\n${snipInst?.body}\n\`\`\``);
        }

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
            let treeView = vscode.window.createTreeView((that.constructor as any).viewId, {
                treeDataProvider: that,
                showCollapseAll: true,
            });

            // 监听鼠标悬停事件，设置 tooltip 大小
            treeView.onDidChangeSelection(e => {
                const node = e.selection && e.selection[0];
                if (node) {
                    const tooltip = node.tooltip;
                    if (tooltip && tooltip instanceof vscode.MarkdownString) {
                        tooltip.isTrusted = true; // 允许 html 标签
    
                        tooltip.appendMarkdown(`<style> .tooltip-hover-container { font-size: 20px; color: green; max-height: 10000px; } </style>`); // 设置 tooltip 大小
                        console.log(tooltip.value);
                    }
                }
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





    getSnippets(): Promise<SnipItem[]> {

        let tree = UserSnippetService.getUserSnippetsTree()

        return Promise.resolve(tree)
    }



}



