import { constantTree } from "../../util/Constant";

let Evts = constantTree({
  API: {
    SERVICE: {
      SERVICE_REGISTERED : "",
      SERVICE_RETURNED   : ""
    }
  }
});

let Acts = constantTree({
  API: {
    SERVICE: {
      REGISTER_SERVICE : "" ,
      GET_SERVICE      : ""
    }
  }
});

export {
  Evts,
  Acts
};