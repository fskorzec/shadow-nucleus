import { constantTree } from "../../../core/util/Constant";
import { TSendQuery, TReturnableEvent } from "../../../core/BaseComponent";

const Evts = constantTree({
 WEBPACK: {
  PACKAGING: {
    PACK   : "",
    PACKED : "",
    FAILED : ""
  }
 }
});

export type TSendPackQuery = TSendQuery<TSendPackQueryArgs>;
export type TSendPackQueryArgs = {
  entry   : string ;
  outPath : string ;
  outFile : string ;
} & TReturnableEvent;

export {
  Evts
};
