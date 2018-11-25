import { constantTree } from "../../util/Constant";

let Evts = constantTree({
  API: {
    MODULE: {
      MODULE_LOADED : ""
    }
  }
});

let Acts = constantTree({
  API: {
    MODULE: {
      LOAD_MODULE : ""
    }
  }
});

export {
  Evts,
  Acts
};