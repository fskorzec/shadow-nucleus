import { TSendQuery } from "../BaseComponent";
declare function buildQueryResult<T, U>(identity: {
    serviceName: string;
    serviceId: string;
}, data: TSendQuery<T>, nextData: U): TSendQuery<U>;
declare function buildQueryResult<T, U>(data: TSendQuery<T>, nextData: U): TSendQuery<U>;
export { buildQueryResult };
//# sourceMappingURL=Event.d.ts.map