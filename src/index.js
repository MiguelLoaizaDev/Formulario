import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

// Verifica si la aplicación está corriendo en Electron o en el navegador
const isElectron = window.navigator.userAgent.toLowerCase().includes("electron");

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Si estás en Electron, oculta la barra de navegación (opcional)
if (isElectron) {
  document.body.style.overflow = "hidden";
}
