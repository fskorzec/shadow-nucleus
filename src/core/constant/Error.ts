import { constantTree } from "../util/Constant";

let Errors = constantTree({
  TYPE: {
    TECHNICAL : "" ,
    BUSINESS  : ""
  },
  TECHNICAL: {
    EVENTBUS_IS_NOT_DEFINED: ""
  }
});

export {
  Errors
};