import { Service, IService } from "./service/Service";
import { IEventBus } from "../IEventBus";

export class Api {
  _evtBus: IEventBus;
  _service: Service;

  constructor(evtBus: IEventBus) {
    this._evtBus = evtBus;
    this._service = new Service(evtBus);
  }

  get Service() : Service {
    return this._service;
  }  
}

export interface IApi {
  Service: IService;
}