!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=2)}([function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.constantTree=function e(t,n=""){for(let r in t){const o=`${n}${""!==n?".":""}${r}`;"string"==typeof t[r]&&0===t[r].length?t[r]=o:"object"==typeof t[r]&&e(t[r],o)}return t}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.IocInject=function(e){return()=>void 0},t.IocResolve=function(e){return()=>void 0}},function(e,t,n){"use strict";var r=this&&this.__decorate||function(e,t,n,r){var o,i=arguments.length,c=i<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,n):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)c=Reflect.decorate(e,t,n,r);else for(var u=e.length-1;u>=0;u--)(o=e[u])&&(c=(i<3?o(c):i>3?o(t,n,c):o(t,n))||c);return i>3&&c&&Object.defineProperty(t,n,c),c},o=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))(function(o,i){function c(e){try{s(r.next(e))}catch(e){i(e)}}function u(e){try{s(r.throw(e))}catch(e){i(e)}}function s(e){e.done?o(e.value):new n(function(t){t(e.value)}).then(c,u)}s((r=r.apply(e,t||[])).next())})};Object.defineProperty(t,"__esModule",{value:!0});const i=n(3);class c{entryPoint(e){return o(this,void 0,void 0,function*(){yield e.Service.registerService(this.logger.identity,{serviceInstance:this.logger})})}}r([n(1).IocResolve("ILogger")],c.prototype,"logger",void 0),t.default=c,i.connect(c)},function(e,t,n){"use strict";var r=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))(function(o,i){function c(e){try{s(r.next(e))}catch(e){i(e)}}function u(e){try{s(r.throw(e))}catch(e){i(e)}}function s(e){e.done?o(e.value):new n(function(t){t(e.value)}).then(c,u)}s((r=r.apply(e,t||[])).next())})},o=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t};Object.defineProperty(t,"__esModule",{value:!0});const i=n(4);t.BaseComponent=i.BaseComponent;const c=o(n(6));t.UtilEnv=c;const u=o(n(0));t.UtilConstant=u;const s=n(1);t.IocInject=s.IocInject,t.IocResolve=s.IocResolve,t.connect=function(e){return r(this,void 0,void 0,function*(){yield _nucleus(e)})}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(5);t.BaseComponent=class{constructor(){this._NC_TYPE_="BaseComponent",this.serviceId="",this.serviceName="",this.getService=void 0}_Send(e,t){this._EvtBus&&this._EvtBus.emitAsync(e,t)}_SendSync(e,t){this._EvtBus&&this._EvtBus.emit(e,t)}_SendWithReturn(e,t,n){return new Promise((o,i)=>{if(null!==n.payload.guid&&void 0!==n.payload.guid||i(Error(r.Errors.TECHNICAL.GUID_IS_MISSING)),this._EvtBus){const r=this._EvtBus.on(t,e=>{e.payload.guid===n.payload.guid&&(r.off(),o(e))});this._EvtBus.emitAsync(e,n)}else i(Error(r.Errors.TECHNICAL.EVENTBUS_IS_NOT_DEFINED))})}_Receive(e,t){return this._EvtBus?this._EvtBus.on(e,t):{off:()=>void 0}}_ReceiveOnce(e,t){return this._EvtBus?this._EvtBus.once(e,t):{off:()=>void 0}}get identity(){return{serviceId:this.serviceId,serviceName:this.serviceName}}initialize(){}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});let r=n(0).constantTree({TYPE:{TECHNICAL:"",BUSINESS:""},TECHNICAL:{EVENTBUS_IS_NOT_DEFINED:"",GUID_IS_MISSING:""}});t.Errors=r},function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.isNode=function(){return"[object process]"===Object.prototype.toString.call(void 0!==e?e:0)}}).call(this,n(7))},function(e,t){var n,r,o=e.exports={};function i(){throw new Error("setTimeout has not been defined")}function c(){throw new Error("clearTimeout has not been defined")}function u(e){if(n===setTimeout)return setTimeout(e,0);if((n===i||!n)&&setTimeout)return n=setTimeout,setTimeout(e,0);try{return n(e,0)}catch(t){try{return n.call(null,e,0)}catch(t){return n.call(this,e,0)}}}!function(){try{n="function"==typeof setTimeout?setTimeout:i}catch(e){n=i}try{r="function"==typeof clearTimeout?clearTimeout:c}catch(e){r=c}}();var s,l=[],f=!1,a=-1;function d(){f&&s&&(f=!1,s.length?l=s.concat(l):a=-1,l.length&&v())}function v(){if(!f){var e=u(d);f=!0;for(var t=l.length;t;){for(s=l,l=[];++a<t;)s&&s[a].run();a=-1,t=l.length}s=null,f=!1,function(e){if(r===clearTimeout)return clearTimeout(e);if((r===c||!r)&&clearTimeout)return r=clearTimeout,clearTimeout(e);try{r(e)}catch(t){try{return r.call(null,e)}catch(t){return r.call(this,e)}}}(e)}}function h(e,t){this.fun=e,this.array=t}function p(){}o.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)t[n-1]=arguments[n];l.push(new h(e,t)),1!==l.length||f||u(v)},h.prototype.run=function(){this.fun.apply(null,this.array)},o.title="browser",o.browser=!0,o.env={},o.argv=[],o.version="",o.versions={},o.on=p,o.addListener=p,o.once=p,o.off=p,o.removeListener=p,o.removeAllListeners=p,o.emit=p,o.prependListener=p,o.prependOnceListener=p,o.listeners=function(e){return[]},o.binding=function(e){throw new Error("process.binding is not supported")},o.cwd=function(){return"/"},o.chdir=function(e){throw new Error("process.chdir is not supported")},o.umask=function(){return 0}}]);