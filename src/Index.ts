import { EventBus } from "./shared/event/EventBus";
import { IModuleEntryPoint } from "./Plugin";

const evtBus = new EventBus(".", 3);

const createComponent = <T extends Object>(component: T, ...argArray: any[]): T => {
  const res = component.constructor.call({}, argArray);
  res["_evtBus"] = evtBus;
  return res;
}

export function registerComponent(startModule: IModuleEntryPoint): void {
  startModule.entryPoint(createComponent);
}