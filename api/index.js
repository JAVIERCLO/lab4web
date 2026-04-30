import express from 'express';
import {uid} from 'uid';
import fs from 'fs';
import path from 'path';

const rutaArchivo = '../datos.json';

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

// Leer archivo json
async function leerArchivoJSON(rutaArchivo) {
    try {
        const rawData = await fs.promises.readFile(rutaArchivo, 'utf8');
        console.log('Archivo JSON leído correctamente');        
        return JSON.parse(rawData);
    } catch (error) {
        console.error('Error al leer el archivo JSON:', error);
        throw error;
    }
}

// Endpoint para todas las canciones
app.get("/api/canciones", async (req, res) => {
    try {
        const canciones = await leerArchivoJSON(rutaArchivo);
        res.json({
        ok: true,
        canciones: canciones
    });
    } catch (error) {
        res.status(500).json({
            ok: false,
            error: "Error al leer las canciones"
    });
    }
});

// Endpoint para obtener canción por id
app.get("/api/canciones/:id", async (req, res) => {
    try {
        const cancion = await leerArchivoJSON(rutaArchivo);
        const id = req.params.id;
        const cancionEncontrada = cancion.find(c => c.id === id);
        if (cancionEncontrada) {
            res.json({
                ok: true,
                cancion: cancionEncontrada
            });
        } else {
            res.status(404).json({
                ok: false,
                error: "Canción no encontrada"
            });
        }
    } catch (error) {
        res.status(500).json({
            ok: false,
            error: "Error al leer la canción"
        });
    }
});

// iniciar servidor en puerto
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});

