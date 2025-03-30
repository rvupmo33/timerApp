const { app, BrowserWindow, Menu } = require("electron");
const path = require("path");

const isMac = process.platform === "darwin";

function createMainWindow() {
  const mainWindow = new BrowserWindow({
    title: "Timer App",
    width: 400,
    height: 430,
    resizable: false,
    backgroundColor: "#ffffff",
    frame: true,
  });
  mainWindow.loadFile("./renderer/index.html");
}

//Create about window
function createAboutWindow() {
  const aboutWindow = new BrowserWindow({
    title: "About Image Resizer",
    width: 300,
    height: 300,
  });

  aboutWindow.loadFile("./renderer/about.html");
}

app.whenReady().then(() => {
  createMainWindow();

  //impliment menu
  const mainMenu = Menu.buildFromTemplate(menu);
  Menu.setApplicationMenu(mainMenu);

  //boiler plate code
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow();
    }
  });
});

const menu = [
  ...(isMac
    ? [
        {
          label: app.name,
          submenu: [
            {
              label: "About",
              click: createAboutWindow,
            },
          ],
        },
      ]
    : []),
  {
    role: "fileMenu",
  },
  ...(!isMac
    ? [
        {
          label: "Help",
          submenu: [
            {
              label: "About",
              click: createAboutWindow,
            },
          ],
        },
      ]
    : []),
];

app.on("window-all-closed", () => {
  if (!isMac) {
    app.quit();
  }
});
