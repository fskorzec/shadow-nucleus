export interface IModule {
  loadModule(path: string): Promise<void>;
}
