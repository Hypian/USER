"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const command_1 = require("./command");
const item_provider_1 = require("./item-provider");
const constants_1 = require("./constants");
const activate = (context) => {
    context.globalState.setKeysForSync([constants_1.STORAGE_KEYS.USAGE_MAP]);
    (0, command_1.registerCommand)(context);
    (0, item_provider_1.registerProvider)(context);
};
exports.activate = activate;
const deactivate = () => {
    return Promise.resolve();
};
exports.deactivate = deactivate;
