"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function Ioc(value) {
    return function (ctor) {
        ctor.prototype.__nc__Services = value;
    };
}
exports.Ioc = Ioc;
function DI(target, propertyKey) {
    console.log(target, propertyKey);
}
exports.DI = DI;
//# sourceMappingURL=Ioc.js.map