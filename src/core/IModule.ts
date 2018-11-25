import { IApi } from "./api/IApi";

export interface IModuleEntryPoint {
  entryPoint(api : IApi): Promise<void>;
}