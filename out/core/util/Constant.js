"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function generateConstantTree(tree) {
    for (let item in tree) {
        if (typeof (tree[item]) === "string" && tree[item].length === 0) {
            tree[item] = item;
        }
        else if (typeof (tree[item]) === "object") {
            generateConstantTree(tree[item]);
        }
    }
}
exports.generateConstantTree = generateConstantTree;
