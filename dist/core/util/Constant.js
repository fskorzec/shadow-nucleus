"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function constantTree(tree, route = "") {
    for (let item in tree) {
        const currentRoute = `${route}${route !== "" ? "." : ""}${item}`;
        if (typeof (tree[item]) === "string" && tree[item].length === 0) {
            tree[item] = currentRoute;
        }
        else if (typeof (tree[item]) === "object") {
            constantTree(tree[item], currentRoute);
        }
    }
    return tree;
}
exports.constantTree = constantTree;
//# sourceMappingURL=Constant.js.map