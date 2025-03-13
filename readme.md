# **Proyecto XTR**

Proyecto XTR es un backend diseñado para organizar setlists y listas de reproducción para bandas musicales. Consiste en una API conectada a una base de datos PostgreSQL.

---

## **Estructura de la Base de Datos**

Las tablas de la base de datos funcionan de la siguiente manera:

- **`songs`**: Tabla donde se guardan todas las canciones disponibles.
- **`sets`**: Tabla donde se guardan diferentes setlists.
- **`playlists`**: Tabla intermedia entre `songs` y `sets`. Aquí se guarda qué canciones pertenecen a cada setlist.

---

## **Modelos de la Base de Datos**

A continuación, se describen los modelos utilizados en la base de datos del Proyecto XTR.

---

### **1. Modelo `Song`**

El modelo `Song` representa las canciones disponibles en la base de datos. Cada canción tiene los siguientes atributos:

#### **Atributos**

- **`id`**: Identificador único de la canción (entero, autoincremental, clave primaria).
- **`title`**: Título de la canción (cadena de texto, no puede ser nulo).
- **`artist`**: Artista de la canción (cadena de texto, no puede ser nulo).
- **`duration`**: Duración de la canción en segundos (entero, no puede ser nulo, mínimo 10 segundos).
- **`tempo`**: Tempo de la canción en BPM (beats por minuto) (entero, opcional, rango entre 1 y 400).
- **`song_key`**: Tonalidad de la canción (cadena de texto, opcional).
- **`genre`**: Género musical de la canción (cadena de texto, opcional).
- **`year`**: Año de lanzamiento de la canción (entero, opcional).
- **`notes`**: Notas adicionales sobre la canción (cadena de texto, opcional).

#### **Relaciones**

- Una canción puede pertenecer a múltiples setlists a través de la tabla intermedia `Playlist`.

---

### **2. Modelo `Setlist`**

El modelo `Setlist` representa los setlists disponibles en la base de datos. Cada setlist tiene los siguientes atributos:

#### **Atributos**

- **`id`**: Identificador único del setlist (entero, autoincremental, clave primaria).
- **`name`**: Nombre del setlist (cadena de texto, no puede ser nulo).

#### **Relaciones**

- Un setlist puede contener múltiples canciones a través de la tabla intermedia `Playlist`.

---

### **3. Modelo `Playlist`**

El modelo `Playlist` es una tabla intermedia que relaciona las canciones con los setlists. Cada playlist tiene los siguientes atributos:

#### **Atributos**

- **`disposition`**: Orden de la canción en el setlist (entero, no puede ser nulo).
- **`songId`**: ID de la canción (entero, clave foránea, referencia a `Song`).
- **`setlistId`**: ID del setlist (entero, clave foránea, referencia a `Setlist`).

#### **Relaciones**

- Una playlist pertenece a una canción (`Song`) y a un setlist (`Setlist`).

## **Puntos de Acceso a la API**

A continuación, se describen los puntos de acceso (endpoints) disponibles en la API:

---

### **1. Canciones (`/api/v1/songs`)**

#### **Obtener todas las canciones**

````markdown
### **GET /api/v1/songs**

Obtiene una lista de todas las canciones disponibles.

#### **Parámetros de Consulta**

- `duration[gte]`: Filtra canciones con una duración mayor o igual al valor especificado.
- `duration[lte]`: Filtra canciones con una duración menor o igual al valor especificado.
- `tempo[gt]`: Filtra canciones con un tempo mayor al valor especificado.
- `tempo[lt]`: Filtra canciones con un tempo menor al valor especificado.
- `artist`: Filtra canciones por artista.

#### **Ejemplo de Solicitud**

```bash
GET /api/v1/songs?duration[gte]=120&duration[lte]=300&tempo[gt]=100
```
````
