export interface IModuleEntryPoint {
  entryPoint(
    api : {
      createComponent: <T extends Object>(component: T, ...argArray: any[]) => T,
      getService: <T>(serviceName: string, serviceId?:string) => T
    }
  ): void;
}