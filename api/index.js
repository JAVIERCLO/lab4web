const express = require('express');
const {uid} = require('uid');

const app = express();
app.use(express.json());

const port = 3001;

// Endpoints obligatorios
// Documentación de la API
app.get("/", (req, res) => {
    res.send(`
    API DE CANCIONES

    <h2>ENDPOINTS DISPONIBLES:</h2>

    <h3>GET:</h3>
    <ul>
    <li>/canciones: Obtener todas las canciones</li>
    <li>/canciones/{id}: Obtener una canción por ID</li>
    <li>/canciones?genero=pop: Filtrar por género</li>
    <li>/canciones?favorita=true: Filtrar favoritas</li>
    </ul>

    <h3>POST:</h3>
    <ul>
    <li>/canciones: Crear una nueva canción</li>
    </ul>
    <p>El body debe incluir: nombre, artista, genero, duracion, favorita</p>

    <h3>PUT:</h3>
    <ul>
    <li>/canciones/{id}: Reemplazar una canción completa</li>
    </ul>

    <h3>PATCH:</h3>
    <ul>
    <li>/canciones/{id}: Modificar campos específicos</li>
    </ul>

    <h3>DELETE:</h3>
    <ul>
    <li>/canciones/{id}: Eliminar una canción</li>
    </ul>
    </html>`);
});

// Endpoint de información
app.get("/info", (req, res) => {
    res.json({
        "mensaje": "API de canciones",
        "nombre": "Javier Chavez",
        "curso": "Sistemas y Tecnologías Web",
        "tecnologia": "JavaScript y Express",
        "version": "1.0.0"
    });
});

// Endpoint de saludo
app.get("/saludo", (req, res) => {
    res.send("Hola! Esta es una API de canciones hecha con Express.");
});

// Endpoint de status
app.get("/api/status", (req, res) => {
    res.json({
        "ok": true,
        "status": "Servidor activo",
        "puerto": port,
        "timestamp": new Date().toISOString()
    })
});