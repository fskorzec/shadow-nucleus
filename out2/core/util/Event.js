"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function buildQueryResult(...args) {
    let identity = args.length === 2 ? void 0 : args[0];
    let data = args.length === 2 ? args[0] : args[1];
    let nextData = args.length === 2 ? args[1] : args[2];
    return {
        sender: identity ? identity : Object.assign({}, data.sender),
        payload: Object.assign({}, Object.assign({}, data.payload), nextData)
    };
}
exports.buildQueryResult = buildQueryResult;
;
