import { BaseTerminal}           from "./core/BaseTerminal"  ;
import { IColorTerminalDelegate, Styles, EStyle, Color16TypeString} from "./core/Constant" ;
import { 
  BgColor16Type    , 
  Color16Type      , 
  Color16          , 
  ForeColor        , 
  BackColor        , 
  endingForeColor  , 
  IColor16Terminal , 
  endingBackColor 
} from "./core/Constant";

type IColorTerminal<T> = {
  [key in keyof Color16Type] : T;
}

type IBgColorTerminal<T> = {
  [key in keyof BgColor16Type] : T;
}

export class Terminal extends BaseTerminal implements IColor16Terminal<Terminal> {
  red            : IColorTerminalDelegate<Terminal> = void 0 as unknown as IColorTerminalDelegate<Terminal> ;
  black          : IColorTerminalDelegate<Terminal> = void 0 as unknown as IColorTerminalDelegate<Terminal> ;
  green          : IColorTerminalDelegate<Terminal> = void 0 as unknown as IColorTerminalDelegate<Terminal> ;
  yellow         : IColorTerminalDelegate<Terminal> = void 0 as unknown as IColorTerminalDelegate<Terminal> ;
  blue           : IColorTerminalDelegate<Terminal> = void 0 as unknown as IColorTerminalDelegate<Terminal> ;
  magenta        : IColorTerminalDelegate<Terminal> = void 0 as unknown as IColorTerminalDelegate<Terminal> ;
  cyan           : IColorTerminalDelegate<Terminal> = void 0 as unknown as IColorTerminalDelegate<Terminal> ;
  lightGray      : IColorTerminalDelegate<Terminal> = void 0 as unknown as IColorTerminalDelegate<Terminal> ;
  darkGray       : IColorTerminalDelegate<Terminal> = void 0 as unknown as IColorTerminalDelegate<Terminal> ;
  lightRed       : IColorTerminalDelegate<Terminal> = void 0 as unknown as IColorTerminalDelegate<Terminal> ;
  lightGreen     : IColorTerminalDelegate<Terminal> = void 0 as unknown as IColorTerminalDelegate<Terminal> ;
  lightYellow    : IColorTerminalDelegate<Terminal> = void 0 as unknown as IColorTerminalDelegate<Terminal> ;
  lightBlue      : IColorTerminalDelegate<Terminal> = void 0 as unknown as IColorTerminalDelegate<Terminal> ;
  lightMagenta   : IColorTerminalDelegate<Terminal> = void 0 as unknown as IColorTerminalDelegate<Terminal> ;
  lightCyan      : IColorTerminalDelegate<Terminal> = void 0 as unknown as IColorTerminalDelegate<Terminal> ;
  white          : IColorTerminalDelegate<Terminal> = void 0 as unknown as IColorTerminalDelegate<Terminal> ;
  bgRed          : IColorTerminalDelegate<Terminal> = void 0 as unknown as IColorTerminalDelegate<Terminal> ;
  bgBlack        : IColorTerminalDelegate<Terminal> = void 0 as unknown as IColorTerminalDelegate<Terminal> ;
  bgGreen        : IColorTerminalDelegate<Terminal> = void 0 as unknown as IColorTerminalDelegate<Terminal> ;
  bgYellow       : IColorTerminalDelegate<Terminal> = void 0 as unknown as IColorTerminalDelegate<Terminal> ;
  bgBlue         : IColorTerminalDelegate<Terminal> = void 0 as unknown as IColorTerminalDelegate<Terminal> ;
  bgMagenta      : IColorTerminalDelegate<Terminal> = void 0 as unknown as IColorTerminalDelegate<Terminal> ;
  bgCyan         : IColorTerminalDelegate<Terminal> = void 0 as unknown as IColorTerminalDelegate<Terminal> ;
  bgLightGray    : IColorTerminalDelegate<Terminal> = void 0 as unknown as IColorTerminalDelegate<Terminal> ;
  bgDarkGray     : IColorTerminalDelegate<Terminal> = void 0 as unknown as IColorTerminalDelegate<Terminal> ;
  bgLightRed     : IColorTerminalDelegate<Terminal> = void 0 as unknown as IColorTerminalDelegate<Terminal> ;
  bgLightGreen   : IColorTerminalDelegate<Terminal> = void 0 as unknown as IColorTerminalDelegate<Terminal> ;
  bgLightYellow  : IColorTerminalDelegate<Terminal> = void 0 as unknown as IColorTerminalDelegate<Terminal> ;
  bgLightBlue    : IColorTerminalDelegate<Terminal> = void 0 as unknown as IColorTerminalDelegate<Terminal> ;
  bgLightMagenta : IColorTerminalDelegate<Terminal> = void 0 as unknown as IColorTerminalDelegate<Terminal> ;
  bgLightCyan    : IColorTerminalDelegate<Terminal> = void 0 as unknown as IColorTerminalDelegate<Terminal> ;
  bgWhite        : IColorTerminalDelegate<Terminal> = void 0 as unknown as IColorTerminalDelegate<Terminal> ;

  drawColoredText(text: string, foreColor?: number, backColor?: number, style?: EStyle): this {
    foreColor && this._color(foreColor);
    backColor && this._color(backColor);
    style     && this._color(Styles[style][0]);
    this.text(text);
    style     && this._color(Styles[style][1]);
    backColor && this._color(endingBackColor);
    foreColor && this._color(endingForeColor);
    return this;
  }

  getAndClearBuffer() {
    const res = this._buffer;
    this.clearBuffer();
    return res;
  }

  constructor() {
    super();

    /**
     * Mixin for foreground and background colors
     */
    for(let i in (Color16 as Color16Type)) {
      (this as any)[i] = function(text: string = "") {
        return text ===  "" ? this : (this as Terminal)
          ["_color"](ForeColor[Color16[i as Color16TypeString] as number])
          .text(text)
          ["_color"](endingForeColor);
      }
      let j = i[0].toUpperCase() + i.substr(1);
      (this as any)[`bg${j}`] = function(text: string = "") {
        return  text ===  "" ? this : (this as Terminal)
          ["_color"](BackColor[Color16[i as Color16TypeString]])
          .text(text)
          ["_color"](endingBackColor);
      }
    }

    /**
     * Mixin for styles
     */
    for(let i in Styles) {
      (this as any)[i] = function(text: string = "") {
        return  text ===  "" ? this : (this as Terminal)
          ["_color"](Styles[i][0])
          .text(text)
          ["_color"](Styles[i][1]);
      }
    }
  }

  
  async getNextinputChoice(choices: Array<string>) : Promise<number> {
    this.listenInputs(true);
    return new Promise<number>( (r,x) => {

      this.newLine();
      this.write();
      this.saveCursorPosition().write();

      let idx = 0;

      choices.forEach( (choice, index) => {
        if (index === idx) {
          this.green(`[${index+1}] ${choice}`).newLine().write();        
       } else {
         this.white(` ${index+1}  ${choice}`).newLine().write();        
       }
      });

      
      this.onWrite = (data) => {
        //console.log(data, data.length, data[0].length)
        data.forEach(strData => {
          switch(strData.charCodeAt(0)) {
            case 13:
              this.stopListen();
              this.newLine().write();
              r(idx);
              break;
              default:
                //this.write(strData.charCodeAt(0)).write(" ");
                break;
              }
              
        })

        const UP = "\u001b[A";
        const DN = "\u001b[B";
        const RT = "\u001b[D";
        const LT = "\u001b[C";
        const str = data[0];

        if (str === UP || str === DN || str === LT ||str === RT) {
          switch(str) {
            case UP: idx--;break;
            case DN: idx++;break;
          }

          idx < 0 ? (idx = 0) : void 0;
          idx >= choices.length ? (idx = choices.length -1) : void 0;

          //this.restoreCursorPosition().write();
          this.topBy(choices.length).write();
          choices.forEach( (choice, index) => {
            if (index === idx) {
               this.green(`[${index+1}] ${choice}`).newLine().write();        
            } else {
              this.white(` ${index+1}  ${choice}`).newLine().write();
            }
          });
        }

      }
    });
  }

  async getNextInput(text?: string, isPassword: boolean = false) {
    if (text) this.write(text);
    return new Promise<string>( (r,x) => {
      try {
        let res = "";
        this.onWrite = (data) => {
          const strData = data.join();
          res += strData;
          this.write(isPassword ? "*" : strData);
          if (strData.charCodeAt(0) === 13) {
            this.stopListen();
            this.newLine().write();
            r(res);
          }
        }
        this.listenInputs(true);
      } catch (ex) {
        x(ex);
      }
    });
  }
}
