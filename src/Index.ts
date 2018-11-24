import { EventBus }  from "./shared/event/EventBus" ;
import { IEventBus } from "./core/IEventBus"        ;

const evtBus: IEventBus = new EventBus(".", 3);


