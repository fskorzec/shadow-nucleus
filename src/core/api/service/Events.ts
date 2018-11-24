import { generateConstantTree } from "../../util/Constant";

let Evts = {
  API: {
    SERVICE: {
      SERVICE_REGISTERED : "",
      SERVICE_RETURNED   : ""
    }
  }
};

let Acts = ({
  API: {
    SERVICE: {
      REGISTER_SERVICE : "" ,
      GET_SERVICE      : ""
    }
  }
});

Evts = generateConstantTree(Evts) ;
Acts = generateConstantTree(Acts) ;

export {
  Evts,
  Acts
};