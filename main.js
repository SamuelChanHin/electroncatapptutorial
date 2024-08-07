const {
  app,
  BrowserWindow,
  globalShortcut,
  Tray,
  Menu,
  ipcMain,
} = require("electron");
// const { autoUpdater } = require("electron-updater");
const path = require("path");

class Bootstrapper {
  mainWindow;

  constructor() {
    this.init();
  }

  init() {
    try {
      require("electron-reloader")(module);
    } catch (_) {}

    app.on("ready", () => {
      this.createWindow();
      this.createTray();

      [1, 2, 3].map((num) => {
        globalShortcut.register(`CommandOrControl+${num}`, () => {
          console.log(num);
          this.mainWindow.webContents.send("switch-cat", num);
          this.mainWindow.show();
        });
      });

      app.on("activate", () => {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.

        if (BrowserWindow.getAllWindows().length === 0) {
          this.createWindow();
        }
      });
    });

    app.on("window-all-closed", () => {
      if (process.platform !== "darwin") {
        app.quit();
      }
    });
  }

  createWindow() {
    this.mainWindow = new BrowserWindow({
      width: 350,
      height: 350,
      webPreferences: {
        preload: path.join(__dirname, "preload.js"),
        nodeIntegration: true,
        contextIsolation: true,
      },
      // frame: false,
      // transparent: true,
      // autoHideMenuBar: true,
    });

    this.mainWindow.loadFile(path.join(__dirname, "dist/index.html"));

    // Open the DevTools.
    this.mainWindow.webContents.openDevTools();

    return this.mainWindow;
  }

  createTray() {
    const iconPath = path.join(__dirname, "dist/assets/tray.png");
    const tray = new Tray(iconPath);
    const contextMenu = Menu.buildFromTemplate([
      {
        label: "貓咪 4",
        click: () => {
          this.mainWindow.show();
          this.mainWindow.webContents.send("switch-cat", 4);
        },
      },
      {
        label: "貓咪 5",
        click: () => {
          this.mainWindow.show();
          this.mainWindow.webContents.send("switch-cat", 5);
        },
      },
      {
        label: "貓咪 6",
        click: () => {
          this.mainWindow.show();
          this.mainWindow.webContents.send("switch-cat", 6);
        },
      },
      {
        label: "縮小",
        click: () => this.mainWindow.hide(), // 隱藏 桌面貓咪
      },
      {
        label: "結束",
        click: () => {
          app.isQuiting = true;
          app.quit();
        },
      },
    ]);
    tray.setToolTip(app.getVersion());
    tray.setContextMenu(contextMenu);

    tray.on("click", () => this.mainWindow.show());

    return tray;
  }
}

new Bootstrapper();
