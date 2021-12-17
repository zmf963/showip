// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

function getIPAdress() {
	var interfaces = require('os').networkInterfaces();
	var ret = "";
	for (var devName in interfaces) {
		var iface = interfaces[devName];
		for (var i = 0; i < iface.length; i++) {
			var alias = iface[i];
			if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
				ret = ret + " " + alias.address;
			}
		}
	}
	return ret;
}

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "showip" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('showip.showip', async () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		let ips = getIPAdress();

		vscode.window.showInformationMessage('current ip: ' + ips);
	});

	context.subscriptions.push(disposable);
}


