# API de Canciones 🎵

API REST desarrollada con Node.js y Express para gestionar una colección de canciones.

---

## 🚀 Instalación y ejecución

1. Clonar el repositorio:

```
git clone https://github.com/JAVIERCLO/lab4web
cd lab4web/api
```

2. Instalar dependencias:

```
npm install
```

3. Ejecutar el servidor:

```
node index.js
```

4. Abrir en el navegador o Postman:

```
http://localhost:3001
```

---

## 📌 Endpoints

### GET

* `/api/canciones`
  : Obtener todas las canciones

* `/api/canciones/{id}`
  : Obtener una canción por ID

* `/api/canciones?genero=pop`
  : Filtrar canciones por género

---

### POST

* `/api/canciones`
  : Crear una nueva canción

Body (JSON):

```
{
  "nombre": "Nombre",
  "artista": "Artista",
  "genero": "pop",
  "duracion": "3:00",
  "favorita": true
}
```

---

### PUT

* `/api/canciones/{id}`
  : Reemplazar una canción completa

---

### PATCH

* `/api/canciones/{id}`
  : Modificar parcialmente una canción

---

### DELETE

* `/api/canciones/{id}`
  : Eliminar una canción

---

### Otros

* `/` : Documentación básica
* `/info` : Información de la API
* `/saludo` : Mensaje de bienvenida
* `/api/status` : Estado del servidor

---

## ⚠️ Notas

* Todos los datos se almacenan en `datos.json`
* Los IDs son generados con UID
* Usar Postman para probar POST, PUT, PATCH y DELETE
