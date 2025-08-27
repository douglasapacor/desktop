import {
  app,
  BrowserWindow,
  ipcMain,
  Menu,
  nativeImage,
  powerSaveBlocker,
  Tray,
} from "electron";
import serve from "electron-serve";
import path from "path";
import fetch from "./fetch";
import { createWindow } from "./helpers";
const iconPath = `${path.join(__dirname, "../resources/windowIcon.png")}`;
const isProd = process.env.NODE_ENV === "production";
let window: BrowserWindow | null;
let tray = null;

powerSaveBlocker.start("prevent-app-suspension");
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = "true";

if (isProd) serve({ directory: "app" });
else app.setPath("userData", `${app.getPath("userData")} (dev)`);

(async () => {
  await app.whenReady();

  const mainWindow = createWindow("main", {
    width: 1000,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  Menu.setApplicationMenu(null);

  const icon = nativeImage.createFromPath(iconPath);
  tray = new Tray(icon);

  const contextMenu = Menu.buildFromTemplate([
    {
      label: "Boletins",
      type: "normal",
      click: function () {
        window.webContents.send("goToBoletins");
        window.maximize();
      },
    },
    {
      label: "Classificadores",
      type: "normal",
      click: function () {
        window.webContents.send("goToClassificadores");
        window.maximize();
      },
    },
    {
      label: "Favoritos",
      type: "normal",
      click: function () {
        window.webContents.send("goToFavoritos");
        window.maximize();
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

  if (isProd) {
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

ipcMain.handle("request:home", async (_) => {
  try {
    const res = await fetch.get("https://api.publicacoesinr.com.br/home");
    return res;
  } catch (error) {
    return { error: error.message };
  }
});
