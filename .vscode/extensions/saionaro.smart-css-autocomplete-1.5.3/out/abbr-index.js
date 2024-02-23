"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbbrIndex = void 0;
const constants_1 = require("./constants");
const getNode = () => ({ children: {}, vals: [] });
class AbbrIndex {
    constructor(props) {
        this.props = props;
        this.index = getNode();
        this.buildIndex(this.props);
    }
    pushItem(path, item) {
        let target = this.index;
        for (let i = 0; i < path.length; i++) {
            if (!target.children[path[i]]) {
                target.children[path[i]] = getNode();
            }
            target = target.children[path[i]];
            if (i === path.length - 1) {
                target.vals.push(item);
            }
        }
    }
    getItem(path) {
        let target = this.index;
        for (let i = 0; i < path.length; i++) {
            if (!target.children[path[i]])
                break;
            target = target.children[path[i]];
            if (i === path.length - 1) {
                return target.vals;
            }
        }
        return [];
    }
    buildIndex(items) {
        for (const p of items) {
            const parts = p.split(constants_1.PROPS_SEPARATOR);
            if (parts.length > 1) {
                const abbr = parts.map((part) => part[0]);
                this.pushItem(abbr, p);
            }
        }
    }
}
exports.AbbrIndex = AbbrIndex;
