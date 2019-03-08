import { BaseTerminal}           from "./core/BaseTerminal"  ;
import { IColorTerminalDelegate, Styles} from "./core/Constant" ;
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

export class Terminal extends BaseTerminal implements IColor16Terminal<Terminal>{
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

  drawColoredText(text: string, foreColor?: number, backColor?: number): this {
    foreColor && this._color(foreColor);
    backColor && this._color(backColor);
    this.text(text);
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
    for(let i in Color16) {
      (this as any)[i] = function(text: string = "") {
        return text ===  "" ? this : (this as Terminal)
          ["_color"](ForeColor[Color16[i]])
          .text(text)
          ["_color"](endingForeColor);
      }
      let j = i[0].toUpperCase() + i.substr(1);
      (this as any)[`bg${j}`] = function(text: string = "") {
        return  text ===  "" ? this : (this as Terminal)
          ["_color"](BackColor[Color16[i]])
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
}
