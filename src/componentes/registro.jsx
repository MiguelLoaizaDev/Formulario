import React, { useState, useEffect } from "react";
import axios from "axios";
import '../stylesheets/registro.css';

const Registro = () => {
    const [nombre, setNombre] = useState("");
    const [codigo, setCodigo] = useState("");
    const [simulacion, setSimulacion] = useState(false);
    const [lecturaCritica, setLecturaCritica] = useState(false);
    const [datos, setDatos] = useState([]);
    const [filtro, setFiltro] = useState("todos");

    useEffect(() => {
        obtenerDatos();
    }, []);

    const obtenerDatos = async () => {
        try {
            const res = await axios.get("http://localhost:5000/obtener-datos");
            if (res.data.success) {
                setDatos(res.data.data);
            }
        } catch (error) {
            console.error("Error obteniendo los datos:", error);
        }
    };

    const enviarDatos = async () => {
        if (!nombre || !codigo) {
            alert("Por favor, completa todos los campos.");
            return;
        }

        try {
            await axios.post("http://localhost:5000/guardar", {
                nombre,
                codigo,
                simulacion: simulacion ? "x" : "",
                lecturaCritica: lecturaCritica ? "x" : "",
            });

            setNombre("");
            setCodigo("");
            setSimulacion(false);
            setLecturaCritica(false);

            obtenerDatos();
        } catch (error) {
            console.error("Error enviando datos:", error);
        }
    };

    const filtrarDatos = () => {
        if (filtro === "todos") return datos;
        if (filtro === "simulacion") return datos.filter(d => d.Simulación === "x" && d["Lectura Crítica"] === "");
        if (filtro === "lecturaCritica") return datos.filter(d => d.Simulación === "" && d["Lectura Crítica"] === "x");
        if (filtro === "ambos") return datos.filter(d => d.Simulación === "x" && d["Lectura Crítica"] === "x");
        return datos;
    };

    return (
        <div style={{ display: "flex", justifyContent: "center", gap: "30px" }}>
            <div style={{ maxWidth: "300px" }}>
                <h2>Registro</h2>
                <input type="text" placeholder="Nombre" value={nombre} onChange={e => setNombre(e.target.value)} />
                <input type="text" placeholder="Código" value={codigo} onChange={e => setCodigo(e.target.value)} />
                <br />
                <button onClick={() => setSimulacion(!simulacion)} style={{ backgroundColor: simulacion ? "green" : "gray" }}>
                    Simulación
                </button>
                <button onClick={() => setLecturaCritica(!lecturaCritica)} style={{ backgroundColor: lecturaCritica ? "green" : "gray" }}>
                    Lectura Crítica
                </button>
                <br />
                <button onClick={enviarDatos}>Enviar</button>
            </div>

            <div>
                <h2>Lista de registros</h2>
                <div>
                    <button onClick={() => setFiltro("todos")}>Todos</button>
                    <button onClick={() => setFiltro("simulacion")}>Solo Simulación</button>
                    <button onClick={() => setFiltro("lecturaCritica")}>Solo Lectura Crítica</button>
                    <button onClick={() => setFiltro("ambos")}>Ambos</button>
                </div>
                
                {/* Contenedor con scroll para la tabla */}
                <div style={{ maxHeight: "300px", overflowY: "auto", border: "1px solid #ccc", marginTop: "10px" }}>
                    <table border="1" style={{ width: "100%", borderCollapse: "collapse" }}>
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Código</th>
                                <th>Simulación</th>
                                <th>Lectura Crítica</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtrarDatos().map((item, index) => (
                                <tr key={index}>
                                    <td>{item.Nombre}</td>
                                    <td>{item.Código}</td>
                                    <td>{item.Simulación}</td>
                                    <td>{item["Lectura Crítica"]}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Registro;
