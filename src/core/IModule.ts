export interface IModuleEntryPoint {
  entryPoint(createComponent: <T extends Object>(component: T, ...argArray: any[]) => T): void;
}