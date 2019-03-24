"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isNode() {
    return Object.prototype.toString.call(typeof process !== 'undefined' ? process : 0) === '[object process]';
}
exports.isNode = isNode;
