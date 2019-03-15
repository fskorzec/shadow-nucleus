"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Constant_1 = require("../../util/Constant");
let Evts = Constant_1.constantTree({
    API: {
        SERVICE: {
            SERVICE_REGISTERED: "",
            SERVICE_RETURNED: ""
        }
    }
});
exports.Evts = Evts;
let Acts = Constant_1.constantTree({
    API: {
        SERVICE: {
            REGISTER_SERVICE: "",
            GET_SERVICE: ""
        }
    }
});
exports.Acts = Acts;
//# sourceMappingURL=Events.js.map