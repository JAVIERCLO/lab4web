### Error #1: [Uso incorrecto de módulos]
**Ubiación:** inicio del archivo
**Tipo de error:**[sintaxis]
**Qué estaba mal:** [Se utilizaron imports pero en el package.json no estaba configurado como modular]
**Cómo lo corregí:**[Agregué "type": "module" en package.json]

### Error #2: [tipo incorrecto]
**Ubiación:** linea 14
**Tipo de error:**[HTTP]
**Qué estaba mal:** [Se estaba usando application-json en vez de application/json]
**Cómo lo corregí:**["Content-Type": "application-json" -> "Content-Type": "application/json"]

### Error #3: [respuesta mal formada]
**Ubiación:** linea 14
**Tipo de error:**[HTTP/lógica]
**Qué estaba mal:** [Se enviaba texto en una ruta que declara json]
**Cómo lo corregí:**[res.end("Ruta de información") -> res.end(JSON.stringify({ mensaje: "Ruta de información" }))]

### Error #4: [Falta await]
**Ubiación:** linea 22
**Tipo de error:**[Asincronía]
**Qué estaba mal:** [fs.readFile() devuelve una promesa, por lo que se necesita await, pero no se usa.]
**Cómo lo corregí:**[const texto = fs.readFile(filePath, "utf-8") -> const texto = await fs.readFile(filePath, "utf-8")]

### Error #5: [El json.stringify no es necesario]
**Ubiación:** linea 24
**Tipo de error:**[lógica]
**Qué estaba mal:** [Se aplicaba json.stringify cuando era un string, esto genera errores por un json incorrecto]
**Cómo lo corregí:**[res.end(JSON.stringify(texto)) -> res.end(texto)]

### Error #6: [Código HTTP incorrecto]
**Ubiación:** linea 24
**Tipo de error:**[HTTP]
**Qué estaba mal:** [El código HTTP es incorrecto]
**Cómo lo corregí:**[res.writeHead(200, { "Content-Type": "text/plain" }) -> res.writeHead(404, { "Content-Type": "text/plain" })]