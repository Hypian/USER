"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getItems = exports.getItemBuilder = exports.getComporator = exports.getTemplate = void 0;
const fuzzy_search_1 = __importDefault(require("fuzzy-search"));
const vscode_1 = require("vscode");
const css_props_json_1 = __importDefault(require("./css-props.json"));
const constants_1 = require("./constants");
const utils_1 = require("./utils");
const abbr_index_1 = require("./abbr-index");
const types_1 = require("./types");
const priorityMap = css_props_json_1.default.reduce((acc, prop, index) => {
    acc[prop] = index;
    return acc;
}, {});
const searcher = new fuzzy_search_1.default(css_props_json_1.default, []);
const abbrIndex = new abbr_index_1.AbbrIndex(css_props_json_1.default);
const getTemplate = (property, prefix, suffix) => {
    const lineData = (0, utils_1.getColonData)(prefix, suffix);
    let template = property;
    if (!lineData.colon) {
        template += `${constants_1.COLON} ${constants_1.CURSOR}`;
    }
    if (!lineData.semicolon) {
        template += constants_1.SEMICOLON;
    }
    return template;
};
exports.getTemplate = getTemplate;
const getComporator = (usageMap) => (a, b) => {
    var _a, _b, _c, _d;
    const valA = (_b = (_a = usageMap[a.value]) !== null && _a !== void 0 ? _a : -priorityMap[a.value]) !== null && _b !== void 0 ? _b : 0;
    const valB = (_d = (_c = usageMap[b.value]) !== null && _c !== void 0 ? _c : -priorityMap[b.value]) !== null && _d !== void 0 ? _d : 0;
    return valB - valA;
};
exports.getComporator = getComporator;
const getItemBuilder = (usageMap, prefix, suffix) => (property, index) => {
    var _a;
    const item = new vscode_1.CompletionItem(property.value, vscode_1.CompletionItemKind.Field);
    const usageCount = (_a = usageMap[property.value]) !== null && _a !== void 0 ? _a : 0;
    item.command = {
        title: constants_1.COMMANDS.SELECTED.TITLE,
        command: constants_1.COMMANDS.SELECTED.CMD,
        arguments: [property.value],
    };
    item.detail = "";
    if (usageCount || constants_1.DEBUG) {
        item.detail += `Used ${usageCount} times`;
        if (constants_1.DEBUG) {
            item.detail += ` [Source: ${property.kind}]`;
            item.detail += ` [Priority: ${-priorityMap[property.value]}]`;
        }
    }
    item.filterText = property.value;
    item.sortText = (0, utils_1.toAlphabetic)(index + 1);
    item.insertText = new vscode_1.SnippetString((0, exports.getTemplate)(property.value, prefix, suffix));
    return item;
};
exports.getItemBuilder = getItemBuilder;
const getItems = (context, lineText, position) => {
    const prefix = lineText.slice(0, position);
    const suffix = lineText.slice(position);
    const word = (0, utils_1.lookupWord)(prefix);
    if (!word)
        return [];
    const usageMap = (0, utils_1.getStore)(context);
    const result = [];
    const addedMap = new Map();
    if (word.length >= 1) {
        for (const value of css_props_json_1.default) {
            if (value.startsWith(word) && (0, utils_1.longEnough)(value)) {
                result.push({ value, kind: types_1.ItemKind.PREFIX });
                addedMap.set(value, 1);
            }
        }
        if (word.length >= 2) {
            const abbrItems = abbrIndex.getItem(word.split(""));
            for (const value of abbrItems) {
                if (addedMap.has(value))
                    continue;
                result.push({ value, kind: types_1.ItemKind.ABBR });
                addedMap.set(value, 1);
            }
        }
    }
    if (word.length > 2 && result.length < 5) {
        const fuzzyItems = searcher.search(word);
        for (const value of fuzzyItems) {
            if ((0, utils_1.longEnough)(value) && !addedMap.has(value)) {
                result.push({ value, kind: types_1.ItemKind.FUZZY });
                addedMap.set(value, 1);
            }
        }
    }
    return result
        .sort((0, exports.getComporator)(usageMap))
        .map((0, exports.getItemBuilder)(usageMap, prefix, suffix));
};
exports.getItems = getItems;
