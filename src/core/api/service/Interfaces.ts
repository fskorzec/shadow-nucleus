import { IEventBus } from "../../IEventBus";

export interface IClass {
  new (): IClass;
}

export interface IPrivateClass extends IClass {
  _evtBus: IEventBus | undefined;
}
