import { Config } from "../config";
import { SnipItemContainer, SnippetsJson } from "../entry/model";
import * as fs from 'fs';
import * as path from 'path';
import { SnipItem } from "../view/userView";

export class UserSnippetService {


    static getUserSnippetsTree(): SnipItem[] {
        let snippets: SnippetsJson[] = [];
        const files = getFilesInDirectory(Config.instance.USER_SNIPPETS_PATH);
        for (const file of files) {
            if (file.endsWith(".json") || file.endsWith(".code-snippets")) {
                const snippetsJson = new SnippetsJson(file);
                snippets.push(snippetsJson);
                console.debug("load user snippets: " + file)
            }
        }
        let tree: SnipItem[] = [];

        for (const snippet of snippets) {
            let container = SnipItemContainer.fromSnippetsJson(snippet)
            tree.push(container.toSnipItem())
            
        }
        // 按 label 排序 
        tree.sort((a, b) => a.label_str!.localeCompare(b.label_str!))

        return tree

    }
}
// 工具函数
// 递归的找所有文件
function getFilesInDirectory(dir: string): string[] {
    const files = [];
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isFile()) {
            files.push(fullPath);
        } else if (entry.isDirectory()) {
            const subDirFiles = getFilesInDirectory(fullPath);
            files.push(...subDirFiles);
        }
    }
    return files;
}