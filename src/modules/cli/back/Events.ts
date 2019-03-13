import { constantTree } from "../../../core/util/Constant";

const Evts = constantTree({
  CLI: {
    PACKAGE : {
      REGISTER   : "",
      REGISTERED : ""
    },
    RUNNER: {
      EXECUTE  : "",
      EXECUTED : ""
    }
  }
});

export {
  Evts
};
