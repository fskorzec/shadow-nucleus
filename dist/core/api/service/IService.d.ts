import { RegisterServiceType } from "./Types";
export interface IService {
    registerService(serviceName: string, serviceId: string, payload: RegisterServiceType): Promise<void>;
    getService<T>(serviceName: string, serviceId: string): Promise<T>;
    resolve<T>(classDefinition: any): Promise<T>;
}
//# sourceMappingURL=IService.d.ts.map