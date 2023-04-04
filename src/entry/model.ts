// 导入必要的依赖
import * as vscode from "vscode";
import * as fs from "fs";
import path = require("path");
import { SnipItem } from "../view/userView";

// snip 文件格式
export interface SnippetInstance {
    body: string[] | string;
    description: string;
    prefix: string;
    scope: string; // 语言类型
}

export class SnippetsJson {
    filepath = "";
    scope = "plaintext";
    body: Record<string, SnippetInstance> = {};

    constructor(filepath: string) {
        this.filepath = filepath;
        let basename = path.basename(filepath);
        this.scope = filepath.endsWith(".json")
            ? basename.replace(".json", "")
            : basename;

        this.parseFromFile();
        this.deal();
    }

    // 解析json文件，初始化body
    private parseFromFile() {
        try {
            const data = fs.readFileSync(this.filepath, { encoding: "utf-8" });
            const json = data.replace(/\/\/.*/g, '');
            let snippets = JSON.parse(json);
            for (let key in snippets) {
                this.body[key] = snippets[key];
            }
        } catch (err: any) {
            console.error(`Failed to read input file: ${err.message}`);
        }
    }

    private deal() {
        for (let key in this.body) {
            const snippet = this.body[key];
            // scope 为空或者是空字符串，就用文件名
            snippet.scope = (!snippet.scope || snippet.scope === "") ? this.scope : snippet.scope;

        }
    }

}
// 用来和 SnipItem 进行转化，只包含关键的属性
export class SnipItemContainer {
    label?: string; // 叶子节点展示名称
    isSnip?: boolean; // 是否是根节点
    children?: SnipItemContainer[] = [];
    snipInst?: SnippetInstance;

    static fromSnippetsJson(snippetsJson: SnippetsJson): SnipItemContainer {
        const container = new SnipItemContainer();
        // 替换 .json 或者.code-snippets 后缀
        container.label = path
            .basename(snippetsJson.filepath)
            .replace(/\.(json|code-snippets)$/i, "")
            .toUpperCase();
        container.isSnip = false;
        container.children = [];

        for (let key in snippetsJson.body) {
            const child = new SnipItemContainer();
            child.label = key;
            child.isSnip = true;
            child.snipInst = snippetsJson.body[key];
            container.children.push(child);
        }
        return container;
    }

    toSnipItem(): SnipItem {
        let item: SnipItem
        // 如果没有子节点，就不展示展开按钮
        item = new SnipItem(this.label || "", this.isSnip, this.snipInst);

        item.children = this.children?.map(child => child.toSnipItem()) || [];

        return item;
    }

}