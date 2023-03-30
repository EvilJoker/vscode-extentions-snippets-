// 导入必要的依赖
import * as vscode from "vscode";
import * as fs from "fs";
import { Uri } from "vscode";
import path = require("path");
import { SnipItem } from "../view/userView";

// snip 文件格式
export interface SnippetItem {
    body: string[] | string;
    description: string;
    prefix: string;
    scope: string;
}

export class SnippetsJson {
    filepath = "";
    body: Record<string, SnippetItem> = {};

    constructor(filepath: string) {
        this.filepath = filepath;
        this.parse();
    }

    // 解析json文件，初始化body
    private parse() {
        try {
            const data = fs.readFileSync(this.filepath, { encoding: "utf-8" });
            // Remove comments
            const json = data.replace(/\/\/.*/g, '');
            let snippets = JSON.parse(json);
            for (let key in snippets) {
                this.body[key] = snippets[key];
            }
        } catch (err: any) {
            console.error(`Failed to read input file: ${err.message}`);
        }
    }
}
// 用来和 SnipItem 进行转化，只包含关键的属性
export class SnipItemContainer {
    label?: string; // 叶子节点展示名称
    isRoot?: boolean; // 是否是根节点
    children?: SnipItemContainer[] = []

    static fromSnippetsJson(snippetsJson: SnippetsJson): SnipItemContainer {
        const container = new SnipItemContainer();
        // 替换 .json 或者.code-snippets 后缀
        container.label = path.basename(snippetsJson.filepath).replace(/\.(json|code-snippets)$/i, "").toUpperCase()
        container.isRoot = true;
        container.children = [];
        for (let key in snippetsJson.body) {
            // const snippet = snippetsJson.body[key];
            const child = new SnipItemContainer();
            child.label = key;
            child.isRoot = false;
            container.children.push(child);
        }
        return container;
    }

    toSnipItem(): SnipItem {
        let item: SnipItem
        // 如果没有子节点，就不展示展开按钮
        if (this.isRoot) {
            item = new SnipItem(this.label || "", "collapsed");
        } else {
            item = new SnipItem(this.label || "");
        }


        item.children = this.children?.map(child => child.toSnipItem()) || [];

        return item;
    }

}