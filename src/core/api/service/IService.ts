import { RegisterServiceType } from "./Types";
export interface IService {
  registerService(identity: {serviceName: string, serviceId: string}, payload: RegisterServiceType): Promise<void>;
  getService<T>(identity: {serviceName: string, serviceId: string}): Promise<T>;
  resolve<T>(classDefinition: any): Promise<T>;
}
