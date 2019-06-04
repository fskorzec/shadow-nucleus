"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function JsonStringify(target, indentSpace = 2) {
    var cache = [];
    const res = JSON.stringify(target, function (key, value) {
        if (cache === null)
            return "";
        if (typeof value === 'object' && value !== null) {
            if (cache.indexOf(value) !== -1) {
                try {
                    return JSON.parse(JSON.stringify(value));
                }
                catch (error) {
                    return;
                }
            }
            cache.push(value);
        }
        return value;
    }, indentSpace);
    cache = null;
    return res;
}
exports.JsonStringify = JsonStringify;
