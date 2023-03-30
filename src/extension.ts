// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { Config } from './config';
import { UserViewProvider } from './view/userView';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "snippets-" is now active!');
	
	Config.createConfig(context)
	registerTreeView()
	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('snippets-.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from snippets+!');
	});
	// subscriptions 加载时生效，结束时 deactivate 销毁
	context.subscriptions.push(disposable);


	// item 菜单
	context.subscriptions.push(vscode.commands.registerCommand('snippets-.item_edit', () => vscode.window.showInformationMessage(`Call edit`)));
	context.subscriptions.push(vscode.commands.registerCommand('snippets-.item_delete', () => vscode.window.showInformationMessage(`Call deltete`)));
	context.subscriptions.push(	vscode.commands.registerCommand('snippets-.item_insert', () => vscode.window.showInformationMessage(`Call edit.`)));

}

// This method is called when your extension is deactivated
export function deactivate() { }


function registerTreeView(){
	new UserViewProvider()
}

