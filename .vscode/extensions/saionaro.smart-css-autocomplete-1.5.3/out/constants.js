"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WORD_BREAKS = exports.DEBUG = exports.BRACKETS = exports.PROPS_SEPARATOR = exports.ALPHABET = exports.CURSOR = exports.TAB = exports.WHITESPACE = exports.SEMICOLON = exports.COLON = exports.FIRST_LETTER = exports.ITEMS_LOOKUP = exports.COMMANDS = exports.STORAGE_KEYS = exports.SELECTOR = exports.FILES_GLOB = exports.SCHEME = exports.TITLE = void 0;
exports.TITLE = "vs-smart-css-autocomplete";
exports.SCHEME = "file";
exports.FILES_GLOB = "**/*.{css,scss,less,sass,styl}";
exports.SELECTOR = {
    scheme: exports.SCHEME,
    pattern: exports.FILES_GLOB,
};
exports.STORAGE_KEYS = {
    USAGE_MAP: `${exports.TITLE}.usage`,
};
exports.COMMANDS = {
    SELECTED: {
        TITLE: "selected-notification",
        CMD: `${exports.TITLE}.selected`,
    },
};
exports.ITEMS_LOOKUP = 50;
exports.FIRST_LETTER = "a";
exports.COLON = ":";
exports.SEMICOLON = ";";
exports.WHITESPACE = " ";
exports.TAB = "	";
exports.CURSOR = "$0";
exports.ALPHABET = "abcdefghijklmnopqrstuvwxyz-";
exports.PROPS_SEPARATOR = "-";
exports.BRACKETS = {
    CURLY: {
        OPEN: "{",
        CLOSE: "}",
    },
};
exports.DEBUG = false;
exports.WORD_BREAKS = new Set([
    exports.SEMICOLON,
    exports.TAB,
    exports.WHITESPACE,
    exports.BRACKETS.CURLY.OPEN,
    exports.BRACKETS.CURLY.CLOSE,
]);
