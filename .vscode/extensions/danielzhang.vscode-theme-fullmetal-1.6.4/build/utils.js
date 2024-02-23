"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.opacity = exports.specificity = void 0;
function specificity(...scopes) {
    return scopes.join(' ');
}
exports.specificity = specificity;
function opacity(color, percentage) {
    if (color.length === '#0000'.length || color.length === '#fffeee00'.length) {
        throw new Error('Hex color already includes alpha value');
    }
    if (percentage > 1) {
        percentage /= 100;
    }
    return `${color}${Math.round(255 * percentage).toString(16)}`;
}
exports.opacity = opacity;
//# sourceMappingURL=utils.js.map