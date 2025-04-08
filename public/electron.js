const { app, BrowserWindow } = require("electron");
const { exec } = require("child_process");
const path = require("path");

let mainWindow;
let backendProcess;

app.whenReady().then(() => {
  // Iniciar el backend
  backendProcess = exec(`node ${path.join(__dirname, "server.js")}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error al iniciar el backend: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`Error en backend: ${stderr}`);
    }
    console.log(`Backend iniciado: ${stdout}`);
  });

  // Crear ventana principal
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  mainWindow.loadURL("http://localhost:3000");

  mainWindow.on("closed", () => {
    if (backendProcess) {
      backendProcess.kill(); // 🔥 Cierra el backend cuando se cierre la app
    }
    app.quit();
  });
});

app.on("window-all-closed", () => {
  if (backendProcess) {
    backendProcess.kill(); // 🔥 Cierra el backend al cerrar todas las ventanas
  }
  if (process.platform !== "darwin") {
    app.quit();
  }
});
