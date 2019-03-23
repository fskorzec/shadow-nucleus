import { BaseComponent } from "../../../Plugin";
import _Webpack from "webpack";
import { Evts, TSendPackQueryArgs } from "./Events";

declare var Services: any;

export class Webpack extends BaseComponent {
  cmpName = "webpack"     ;
  cmpId   = "com.nucleus" ;

  static hasBeenInitialized: boolean = false;
  
  constructor() {
    super();
  }

  protected initialize() {
    if (Webpack.hasBeenInitialized) {
      return;
    } else {
      Webpack.hasBeenInitialized = true;
      this._Receive<TSendPackQueryArgs>(Evts.WEBPACK.PACKAGING.PACK, (data) => {
        const res = _Webpack({
          entry:[data.payload.entry],
          output:{
            path     : data.payload.outPath ,
            filename : data.payload.outFile
          }
        },(err, stats) => {
          if (err) {
            this._SendSync(Evts.WEBPACK.PACKAGING.FAILED, {
              sender  : this.identity,
              payload : {
                error : err               ,
                guid  : data.payload.guid ,
                stats
              }
            });
          } else {
            this._SendSync(Evts.WEBPACK.PACKAGING.PACKED, {
              sender: this.identity,
              payload: {
                guid: data.payload.guid
              }
            });
          }
        });        
      });
    }
  
  }
}