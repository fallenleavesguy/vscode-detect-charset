'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import {readFile} from 'fs';
var jschardet = require('jschardet');

export function activate(context: vscode.ExtensionContext) {
    vscode.commands.registerTextEditorCommand("extension.detectcharset", (textEditor) => {
        let editor = vscode.window.activeTextEditor;
        readFile(editor.document.fileName, (err, data) => {
            if (err) {
                console.error(err);
            } else {
                let encoding = jschardet.detect(data).encoding;
                vscode.window.setStatusBarMessage(`may be ${encoding}`, 4000);
            }
        });
    }, context.subscriptions);
}

// this method is called when your extension is deactivated
export function deactivate() {
}