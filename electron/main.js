const { app, BrowserWindow } = require("electron");
const { exec } = require("child_process");
let mainWindow;

app.whenReady().then(() => {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
        },
    });

    mainWindow.loadURL("http://localhost:3000"); // O la ruta de tu React app

    // Inicia el backend automáticamente
    exec("node server.js", (error, stdout, stderr) => {
        if (error) {
            console.error(`Error al iniciar el backend: ${error.message}`);
            return;
        }
        console.log(`Backend iniciado: ${stdout}`);
    });
});
