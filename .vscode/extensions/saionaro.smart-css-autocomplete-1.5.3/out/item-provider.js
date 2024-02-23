"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerProvider = void 0;
const vscode_1 = require("vscode");
const constants_1 = require("./constants");
const items_manager_1 = require("./items-manager");
let context;
const providerFunction = {
    provideCompletionItems: (document, position) => {
        const shift = Math.max(0, position.character - constants_1.ITEMS_LOOKUP);
        const lineStart = new vscode_1.Position(position.line, shift);
        const range = new vscode_1.Range(lineStart, lineStart.translate(0, position.character + constants_1.ITEMS_LOOKUP));
        const lineText = document.getText(range);
        return (0, items_manager_1.getItems)(context, lineText, position.character - shift);
    },
};
const registerProvider = (ctx) => {
    context = ctx;
    ctx.subscriptions.push(vscode_1.languages.registerCompletionItemProvider(constants_1.SELECTOR, providerFunction, ...constants_1.ALPHABET));
};
exports.registerProvider = registerProvider;
