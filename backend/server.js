const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const xlsx = require("xlsx");
const { app: electronApp } = require("electron");

const app = express();
const PORT = process.env.PORT || 5000; // Puerto dinámico

// Configuración del middleware
app.use(cors());
app.use(express.json());

// Guardar el Excel en una ruta persistente
const filePath = path.join(electronApp.getPath("userData"), "registros.xlsx");

const guardarEnExcel = (nombre, codigo, simulacion, lecturaCritica) => {
  console.log("📂 Intentando guardar en Excel...");

  let workbook;
  let worksheet;

  if (fs.existsSync(filePath)) {
    console.log("✅ Archivo Excel encontrado.");
    workbook = xlsx.readFile(filePath);
    worksheet = workbook.Sheets["Registros"];
    if (!worksheet) {
      console.log("⚠️ Hoja 'Registros' no encontrada. Creando una nueva...");
      worksheet = xlsx.utils.aoa_to_sheet([["Nombre", "Código", "Simulación", "Lectura Crítica"]]);
      xlsx.utils.book_append_sheet(workbook, worksheet, "Registros");
    }
  } else {
    console.log("⚠️ Archivo Excel no encontrado. Creando uno nuevo...");
    workbook = xlsx.utils.book_new();
    worksheet = xlsx.utils.aoa_to_sheet([["Nombre", "Código", "Simulación", "Lectura Crítica"]]);
    xlsx.utils.book_append_sheet(workbook, worksheet, "Registros");
  }

  let data = xlsx.utils.sheet_to_json(worksheet, { header: 1 });
  console.log("📊 Datos actuales en Excel:", data);

  const nuevaFila = [nombre, codigo, simulacion, lecturaCritica];
  data.push(nuevaFila);
  console.log("📝 Agregando fila:", nuevaFila);

  worksheet = xlsx.utils.aoa_to_sheet(data);
  workbook.Sheets["Registros"] = worksheet;

  try {
    xlsx.writeFile(workbook, filePath);
    console.log("✅ Datos guardados correctamente en registros.xlsx");
  } catch (error) {
    console.error("❌ Error al escribir en el archivo Excel:", error);
  }
};

// Ruta para manejar el formulario
app.post("/guardar", (req, res) => {
  const { nombre, codigo, simulacion, lecturaCritica } = req.body;
  console.log("📩 Datos recibidos en backend:", req.body);

  if (!nombre || !codigo) {
    return res.status(400).json({ error: "Nombre y código son obligatorios" });
  }

  guardarEnExcel(nombre, codigo, simulacion, lecturaCritica);
  res.json({ message: "Datos guardados correctamente en registros.xlsx" });
});

app.get("/obtener-datos", (req, res) => {
  if (!fs.existsSync(filePath)) {
    return res.json({ success: false, message: "El archivo Excel no existe." });
  }

  try {
    const workbook = xlsx.readFile(filePath);
    const worksheet = workbook.Sheets["Registros"];

    if (!worksheet) {
      return res.json({ success: false, message: "No hay registros." });
    }

    const data = xlsx.utils.sheet_to_json(worksheet);
    res.json({ success: true, data });
  } catch (error) {
    console.error("❌ Error al leer el archivo Excel:", error);
    res.status(500).json({ success: false, message: "Error al leer los datos." });
  }
});

// Integración con Electron
if (require.main === module) {
  app.listen(PORT, () => console.log(`✅ Servidor corriendo en http://localhost:${PORT}`));
} else {
  module.exports = app;
}
