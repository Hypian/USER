"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getColonData = exports.lookupWord = exports.longEnough = exports.getStore = exports.toAlphabetic = void 0;
const constants_1 = require("./constants");
const toAlphabetic = (num) => constants_1.FIRST_LETTER.repeat(num);
exports.toAlphabetic = toAlphabetic;
const getStore = (context, isCopy = false) => {
    var _a;
    const map = (_a = context.globalState.get(constants_1.STORAGE_KEYS.USAGE_MAP)) !== null && _a !== void 0 ? _a : {};
    return isCopy ? { ...map } : map;
};
exports.getStore = getStore;
const longEnough = (prop) => prop.length > 1;
exports.longEnough = longEnough;
const lookupWord = (line) => {
    let word = "";
    for (let i = line.length - 1; i >= 0; i--) {
        const letter = line[i];
        if (constants_1.WORD_BREAKS.has(letter))
            break;
        word = letter + word;
    }
    return word;
};
exports.lookupWord = lookupWord;
const getColonData = (_prefix, suffix) => {
    const data = {
        colon: false,
        semicolon: false,
    };
    let val = "";
    const leadingWhitespace = suffix[0] === constants_1.WHITESPACE;
    for (const char of suffix) {
        if (char === constants_1.BRACKETS.CURLY.CLOSE)
            break;
        if (char === constants_1.WHITESPACE)
            continue;
        if (char === constants_1.COLON) {
            if (leadingWhitespace && val.length)
                break;
            data.colon = true;
            continue;
        }
        if (char === constants_1.SEMICOLON) {
            data.semicolon = true;
            break;
        }
        val += char;
    }
    return data;
};
exports.getColonData = getColonData;
