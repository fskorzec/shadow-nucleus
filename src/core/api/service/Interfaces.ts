import { IEventBus } from "../../IEventBus";

export interface IClass {
  new (): IClass;
}

export interface IPrivateClass extends IClass {
  _EvtBus: IEventBus | undefined;
  initialize(): void;
  getService: <T>(serviceName: string, serviceId: string) => Promise<T>;
}
