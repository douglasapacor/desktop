import {
  app,
  BrowserWindow,
  ipcMain,
  Menu,
  NativeImage,
  nativeImage,
  powerSaveBlocker,
  Tray,
} from "electron";
import serve from "electron-serve";
import path from "path";
import * as proccesses from "./processes";
import { createWindow, root } from "./lib";
import { ICON_PATH, IS_PROD, OS_USER_DATA } from "./static";
let finalPath = "";
let tray = null;
let icon: NativeImage | null = null;
let mainWindow: BrowserWindow | null = null;

powerSaveBlocker.start("prevent-app-suspension");
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = "true";

if (IS_PROD) {
  finalPath = OS_USER_DATA;
  serve({ directory: "app" });
} else {
  finalPath = `${OS_USER_DATA} (dev)`;
  app.setPath("userData", finalPath);
}

root.register({ path: finalPath });

(async () => {
  await app.whenReady();

  mainWindow = createWindow("main", {
    width: 1000,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  Menu.setApplicationMenu(null);

  icon = nativeImage.createFromPath(ICON_PATH);
  tray = new Tray(icon);

  const contextMenu = Menu.buildFromTemplate([
    {
      label: "Boletins",
      type: "normal",
      click: function () {
        mainWindow.webContents.send("goToBoletins");
        mainWindow.maximize();
      },
    },
    {
      label: "Classificadores",
      type: "normal",
      click: function () {
        mainWindow.webContents.send("goToClassificadores");
        mainWindow.maximize();
      },
    },
    {
      label: "Favoritos",
      type: "normal",
      click: function () {
        mainWindow.webContents.send("goToFavoritos");
        mainWindow.maximize();
      },
    },
    { type: "separator" },
    {
      label: "Fechar",
      type: "normal",
      click: function () {
        console.log("close");
      },
    },
  ]);

  tray.setTitle("INR Publicações");
  tray.setToolTip("INR Publicações");
  tray.setContextMenu(contextMenu);

  if (IS_PROD) {
    await mainWindow.loadURL("app://./home");
  } else {
    const port = process.argv[2];
    await mainWindow.loadURL(`http://localhost:${port}/home`);
    mainWindow.webContents.openDevTools();
  }
})();

app.on("window-all-closed", () => {
  app.quit();
});

// app.setLoginItemSettings({
//   name: "Leitor INR",
//   openAtLogin: true,
//   path: app.getPath("exe"),
// });

Object.values(proccesses).map((proccess) =>
  ipcMain.handle(proccess.key, proccess.handle)
);
