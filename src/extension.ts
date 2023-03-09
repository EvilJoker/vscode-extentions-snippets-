// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { ExplorDataProvider } from './snippets--explor';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "snippets-" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('snippets-.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from snippets+!');
	});

	context.subscriptions.push(disposable);
	// 注册 item
	vscode.window.registerTreeDataProvider('snippets--explor', new ExplorDataProvider());
	// item 菜单
	vscode.commands.registerCommand('snippets-.item_edit', () => vscode.window.showInformationMessage(`Call edit`));
	vscode.commands.registerCommand('snippets-.item_delete', () => vscode.window.showInformationMessage(`Call edit`));
	vscode.commands.registerCommand('snippets-.item_insert', () => vscode.window.showInformationMessage(`Call edit.`));
}

// This method is called when your extension is deactivated
export function deactivate() {}
