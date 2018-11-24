import { constantTree } from "../../core/util/Constant";

const Acts = constantTree({
  LOGGING: {
    LOGGER: {
      LOG  : "",
      WARN : "",
      INFO : ""
    }
  }
});

const Evts = constantTree({
  LOGING: {
    LOGGER: {
      LOGGED   : "",
      WARNED   : "",
      INFORMED : ""
    }
  }
});

export {
  Acts,
  Evts
};
