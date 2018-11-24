import { IApi } from "./api/Api";

export interface IModuleEntryPoint {
  entryPoint(api : IApi): Promise<void>;
}