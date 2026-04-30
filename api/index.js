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

// Endpoint para crear una nueva canción
app.post("/api/canciones", async (req, res) => {
    try {
        const canciones = await leerArchivoJSON(rutaArchivo);
        const nuevaCancion = {
            id: uid(),
            nombre: req.body.nombre,
            artista: req.body.artista,
            genero: req.body.genero,
            duracion: req.body.duracion,
            favorita: req.body.favorita
        };
        // Validación de que existan los campos
        if (!nuevaCancion.nombre || !nuevaCancion.artista || !nuevaCancion.genero || !nuevaCancion.duracion || nuevaCancion.favorita === undefined) {
            return res.status(400).json({
                ok: false,
                error: "Faltan campos obligatorios"
            });
        }

        // Validación de campos no vacíos
        if (nuevaCancion.nombre.trim() === "" || nuevaCancion.artista.trim() === "" || nuevaCancion.genero.trim() === "" || nuevaCancion.duracion.trim() === "") {
            return res.status(400).json({
                ok: false,
                error: "Los campos no pueden estar vacíos"
            });
        }

        // Validación de favorito como boolean
        if (typeof nuevaCancion.favorita !== "boolean") {
            return res.status(400).json({
                ok: false,
                error: "El campo 'favorita' debe ser true o false"
            });
        }

        canciones.push(nuevaCancion);
        await fs.promises.writeFile(rutaArchivo, JSON.stringify(canciones, null, 2));
        res.status(201).json({
            ok: true,
            cancion: nuevaCancion
        });
    } catch (error) {
        console.error('Error al crear la canción:', error);
        res.status(500).json({
            ok: false,
            error: "Error al crear la canción"
        });
    }
});

// Endpoint para reemplazar una canción completa
app.put("/api/canciones/:id", async (req, res) => {
    try {
        const canciones = await leerArchivoJSON(rutaArchivo);
        const id = req.params.id;
        // encontrar el index de la canción que se quiere actualizar
        const index = canciones.findIndex(c => c.id === id);
        // VAlidación de que la canción exista
        if (index === -1) {
            return res.status(404).json({
                ok: false,
                error: "Canción no encontrada"
            });
        }
        // Validación de campos
        const { nombre, artista, genero, duracion, favorita } = req.body;
        if (!nombre || !artista || !genero || !duracion || favorita === undefined) {
            return res.status(400).json({
                ok: false,
                error: "Faltan campos obligatorios"
            });
        }
        // Validación de campos no vacíos
        if (nombre.trim() === "" || artista.trim() === "" || genero.trim() === "" || duracion.trim() === "") {
            return res.status(400).json({
                ok: false,
                error: "Los campos no pueden estar vacíos"
            });
        }
        // validación de favorito como boolean
        if (typeof favorita !== "boolean") {
            return res.status(400).json({
                ok: false,
                error: "El campo 'favorita' debe ser true o false"
            });
        }

        // Crear la canción actualizada
        const cancionActualizada = {
            id: id,
            nombre: nombre,
            artista: artista,
            genero: genero,
            duracion: duracion,
            favorita: favorita
        };

        // Reemplazar la canción en el array
        canciones[index] = cancionActualizada;
        // guardar la canción
        await fs.promises.writeFile(rutaArchivo, JSON.stringify(canciones, null, 2));

        res.json({
            ok: true,
            cancion: cancionActualizada
        });
    } catch (error) {
        console.error('Error al actualizar la canción:', error);
        res.status(500).json({
            ok: false,
            error: "Error al actualizar la canción"
        });
    }

});

// Endpoint para modificar una canción
app.patch("/api/canciones/:id", async (req, res) => {
    try {
        const canciones = await leerArchivoJSON(rutaArchivo);
        const id = req.params.id;
        const index = canciones.findIndex(c => c.id === id);
        if (index === -1) {
            return res.status(404).json({
                ok: false,
                error: "Canción no encontrada"
            });
        }
        const cancionActual = canciones[index];
        const cancionModificada = {
            id: cancionActual.id,
            nombre: req.body.nombre || cancionActual.nombre,
            artista: req.body.artista || cancionActual.artista,
            genero: req.body.genero || cancionActual.genero,
            duracion: req.body.duracion || cancionActual.duracion,
            favorita: req.body.favorita !== undefined ? req.body.favorita : cancionActual.favorita
        };

        // Validación de campos no vacíos
        if (cancionModificada.nombre.trim() === "" || cancionModificada.artista.trim() === "" || cancionModificada.genero.trim() === "" || cancionModificada.duracion.trim() === "") {
            return res.status(400).json({
                ok: false,  
                error: "Los campos no pueden estar vacíos"
            });
        }
        canciones[index] = cancionModificada;
        await fs.promises.writeFile(rutaArchivo, JSON.stringify(canciones, null, 2));
        res.json({
            ok: true,
            cancion: cancionModificada
        });

    } catch (error) {
            console.error('Error al modificar la canción:', error);
            res.status(500).json({
                ok: false,
                error: "Error al modificar la canción"
            });
    }
});

// Endpoint para eliminar una canción
app.delete("/api/canciones/:id", async (req, res) => {
    try {
        const canciones = await leerArchivoJSON(rutaArchivo);
        const id = req.params.id;
        const index = canciones.findIndex(c => c.id === id);
        // Validación de que la canción exista
        if (index === -1) {
            return res.status(404).json({
                ok: false,
                error: "Canción no encontrada"
            });
        }
        const NuevaPlaylist = canciones.filter(c => c.id !== id);
        await fs.promises.writeFile(rutaArchivo, JSON.stringify(NuevaPlaylist, null, 2));
        res.json({
            ok: true,
            mensaje: "Canción eliminada correctamente"
        });
    } catch (error) {
        console.error('Error al eliminar la canción:', error);
        res.status(500).json({
            ok: false,
            error: "Error al eliminar la canción"
        });
    }
});

// Error 404
app.use((req, res) => {
    res.status(404).json({
        ok: false,
        error: "Endpoint no encontrado",
        ruta: req.originalUrl,
        metodo: req.method,
        sugerencia: "Puedes revisar / para ver los endpints disponibles"
    });
});

// iniciar servidor en puerto
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});