import { TSendQuery } from "../BaseComponent";

function buildQueryResult<T,U>(identity: {cmpName: string, cmpId: string}, data: TSendQuery<T>, nextData: U) : TSendQuery<U>;
function buildQueryResult<T,U>(data: TSendQuery<T>, nextData: U) : TSendQuery<U>;
function buildQueryResult<T,U>(...args: any[]) 
{
  let identity = args.length === 2 ? void 0  : args[0];
  let data     = args.length === 2 ? args[0] : args[1];
  let nextData = args.length === 2 ? args[1] : args[2];
  
  return {
    sender  : identity ? identity : Object.assign({}, data.sender),
    payload : {
      ...Object.assign({}, data.payload),
      ...nextData
    }
  } as TSendQuery<U>;
};

export {
  buildQueryResult
};