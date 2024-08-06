const {
  app,
  BrowserWindow,
  globalShortcut,
  Tray,
  Menu,
  ipcMain,
} = require("electron");
const path = require("path");
const { autoUpdater } = require("electron-updater");

try {
  require("electron-reloader")(module);
} catch (_) {}

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 350,
    height: 350,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
    frame: false,
    transparent: true,
    autoHideMenuBar: true,
  });

  mainWindow.loadFile(path.join(__dirname, "dist/index.html"));

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();

  return mainWindow;
}

function createTray(win) {
  const iconPath = path.join(__dirname, "dist/assets/tray.png");
  const tray = new Tray(iconPath);
  const contextMenu = Menu.buildFromTemplate([
    {
      label: "貓咪 4",
      click: () => {
        win.show();
        win.webContents.send("switch-cat", 4);
      },
    },
    {
      label: "貓咪 5",
      click: () => {
        win.show();
        win.webContents.send("switch-cat", 5);
      },
    },
    {
      label: "貓咪 6",
      click: () => {
        win.show();
        win.webContents.send("switch-cat", 6);
      },
    },
    {
      label: "縮小",
      click: () => win.hide(), // 隱藏 桌面貓咪
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

  tray.on("click", () => win.show());

  return tray;
}

app.on("ready", () => {
  const win = createWindow();
  createTray(win);

  [1, 2, 3].map((num) => {
    globalShortcut.register(`CommandOrControl+${num}`, () => {
      win.webContents.send("switch-cat", num);
      win.show();
    });
  });

  autoUpdater.checkForUpdatesAndNotify();
  win.Message;
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.

  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
