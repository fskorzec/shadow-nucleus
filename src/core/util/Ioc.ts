export function Ioc(value: {[index: string]: [string, string]}) {
    return function (ctor: Function) {
        ctor.prototype.__nc__Services = value;
    };
}
