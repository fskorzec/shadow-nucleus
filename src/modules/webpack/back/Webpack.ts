import { BaseComponent } from "../../../Plugin";
import _Webpack from "webpack";

declare var Services: any;

export class Webpack extends BaseComponent {
  cmpName = "webpack"    ;
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
    }
  
  }

  webpack() {
    _Webpack({
      entry:[""],
      output:{
        path:"",
        filename:""
      }
    },(err, stats) => {

    })  
  }

}

export interface IWebpack {
  
}