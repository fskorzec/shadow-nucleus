import { generateConstantTree } from "../util/Constant";

let Errors = {
  TYPE: {
    TECHNICAL : "" ,
    BUSINESS  : ""
  },
  TECHNICAL: {
    EVENTBUS_IS_NOT_DEFINED: ""
  }
}

generateConstantTree(Errors);

export {
  Errors
};