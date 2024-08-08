const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("versions", {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  // we can also expose variables, not just functions
});

contextBridge.exposeInMainWorld("actions", {
  ping: () => ipcRenderer.invoke("ping"),
  switchCat: (callback: Function) => {
    ipcRenderer.on(`switch-cat`, (event: any, args: any) => callback(args));
  },
});
