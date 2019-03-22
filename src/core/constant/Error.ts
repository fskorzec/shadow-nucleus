import { constantTree } from "../util/Constant";

let Errors = constantTree({
  TYPE: {
    TECHNICAL : "" ,
    BUSINESS  : ""
  },
  TECHNICAL: {
    EVENTBUS_IS_NOT_DEFINED : "" ,
    GUID_IS_MISSING         : ""
  }
});

export {
  Errors
};