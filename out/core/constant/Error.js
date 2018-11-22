"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Constant_1 = require("../util/Constant");
let Errors = {
    TYPE: {
        TECHNICAL: "",
        BUSINESS: ""
    },
    TECHNICAL: {
        EVENTBUS_IS_NOT_DEFINED: ""
    }
};
exports.Errors = Errors;
Constant_1.generateConstantTree(Errors);
