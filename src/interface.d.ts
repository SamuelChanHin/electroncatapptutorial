export interface IElectronAPI {
  switchCat: (callback: (num: number) => void) => void;
}

declare global {
  interface Window {
    actions: IElectronAPI;
  }
}
