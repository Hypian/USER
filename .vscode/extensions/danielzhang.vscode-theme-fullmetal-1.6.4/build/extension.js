"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = __importStar(require("vscode"));
const schemaNames = ['color-theme', 'textmate-colors', 'token-styling', 'workbench-colors'];
const activate = (context) => {
    context.subscriptions.push(vscode.commands.registerCommand('saveBuiltInSchemas', () => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const baseUri = (_a = vscode.workspace.workspaceFolders) === null || _a === void 0 ? void 0 : _a[0].uri;
        if (baseUri) {
            const outputDir = vscode.Uri.joinPath(baseUri, 'schemas');
            yield vscode.workspace.fs.createDirectory(outputDir);
            yield Promise.all(schemaNames.map((name) => __awaiter(void 0, void 0, void 0, function* () {
                const schemaUri = vscode.Uri.parse(`vscode://schemas/${name}`);
                const jsonDoc = yield vscode.workspace.openTextDocument(schemaUri);
                yield vscode.workspace.fs.writeFile(vscode.Uri.joinPath(outputDir, `${name}.json`), Buffer.from(JSON.stringify(JSON.parse(jsonDoc.getText()), null, 2)));
            })));
        }
    })));
};
exports.activate = activate;
const deactivate = () => undefined;
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map