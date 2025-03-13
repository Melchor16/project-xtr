# **Project XTR**

Project XTR is a backend designed to organize setlists and playlists for musical bands. It consists of an API connected to a PostgreSQL database.

---

## **Database Structure**

The database tables work as follows:

- **`songs`**: Table where all available songs are stored.
- **`sets`**: Table where different setlists are stored.
- **`playlists`**: Intermediate table between `songs` and `sets`. It stores which songs belong to each setlist.

---

## **Database Models**

Below are the models used in the Project XTR database.

---

### **1. `Song` Model**

The `Song` model represents the songs available in the database. Each song has the following attributes:

#### **Attributes**

- **`id`**: Unique identifier for the song (integer, auto-incremental, primary key).
- **`title`**: Title of the song (string, cannot be null).
- **`artist`**: Artist of the song (string, cannot be null).
- **`duration`**: Duration of the song in seconds (integer, cannot be null, minimum 10 seconds).
- **`tempo`**: Tempo of the song in BPM (beats per minute) (integer, optional, range between 1 and 400).
- **`song_key`**: Key of the song (string, optional).
- **`genre`**: Musical genre of the song (string, optional).
- **`year`**: Release year of the song (integer, optional).
- **`notes`**: Additional notes about the song (string, optional).

#### **Relationships**

- A song can belong to multiple setlists through the intermediate table `Playlist`.

#### **Sequelize Model Definition**

```javascript
const Song = sequelize.define(
  "song",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    artist: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
        min: 10,
      },
    },
    tempo: {
      type: DataTypes.INTEGER,
      validate: {
        min: 1,
        max: 400,
      },
    },
    song_key: DataTypes.STRING,
    genre: DataTypes.STRING,
    year: DataTypes.INTEGER,
    notes: DataTypes.STRING,
  },
  {
    indexes: [
      {
        unique: true,
        fields: ["title", "artist"],
      },
    ],
  }
);
```

---

### **2. `Setlist` Model**

The `Setlist` model represents the setlists available in the database. Each setlist has the following attributes:

#### **Attributes**

- **`id`**: Unique identifier for the setlist (integer, auto-incremental, primary key).
- **`name`**: Name of the setlist (string, cannot be null).

#### **Relationships**

- A setlist can contain multiple songs through the intermediate table `Playlist`.

#### **Sequelize Model Definition**

```javascript
const Setlist = sequelize.define("setlist", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  name: { type: DataTypes.STRING, allowNull: false },
});
```

---

### **3. `Playlist` Model**

The `Playlist` model is an intermediate table that relates songs to setlists. Each playlist has the following attributes:

#### **Attributes**

- **`disposition`**: Order of the song in the setlist (integer, cannot be null).
- **`songId`**: ID of the song (integer, foreign key, references `Song`).
- **`setlistId`**: ID of the setlist (integer, foreign key, references `Setlist`).

#### **Relationships**

- A playlist belongs to a song (`Song`) and a setlist (`Setlist`).

#### **Sequelize Model Definition**

```javascript
const Playlist = sequelize.define(
  "playlist",
  {
    disposition: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    songId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Song,
        key: "id",
      },
    },
    setlistId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Setlist,
        key: "id",
      },
    },
  },
  {
    primaryKey: false,
  }
);
```

---

## **API Endpoints**

Below are the available endpoints in the API:

---

### **1. Songs (`/api/v1/songs`)**

### **1.1 Get All Songs**

#### **GET /api/v1/songs**

Retrieves a list of all available songs.

#### **Query Parameters**

- `duration[gte]`: Filters songs with a duration greater than or equal to the specified value.
- `duration[lte]`: Filters songs with a duration less than or equal to the specified value.
- `tempo[gt]`: Filters songs with a tempo greater than the specified value.
- `tempo[lt]`: Filters songs with a tempo less than the specified value.
- `artist`: Filters songs by artist.

(This applies to any parameter.)

#### **Example Request**

```bash
GET /api/v1/songs/?duration[lte]=500&tempo[gte]=120
```

#### **Example Response**

```json
{
  "status": "success",
  "results": 2,
  "data": {
    "songs": [
      {
        "id": 14,
        "title": "titulo 11",
        "artist": "artista 5",
        "duration": 456,
        "tempo": 120,
        "song_key": null,
        "genre": null,
        "year": null,
        "notes": null,
        "createdAt": "2025-03-13T21:57:19.643Z",
        "updatedAt": "2025-03-13T21:57:19.643Z"
      },
      {
        "id": 15,
        "title": "titulo 12",
        "artist": "artista 5",
        "duration": 456,
        "tempo": 120,
        "song_key": null,
        "genre": null,
        "year": null,
        "notes": null,
        "createdAt": "2025-03-13T21:57:25.052Z",
        "updatedAt": "2025-03-13T21:57:25.052Z"
      }
    ]
  }
}
```

#### **Select Fields**

- `fields`: Select the fields that you want to display. When using this parameter, it will only return the specified fields (columns).

#### **Example Request**

```bash
GET /api/v1/songs/?fields=title,artist,duration
```

#### **Example Response**

```json
{
  "status": "success",
  "results": 11,
  "data": {
    "songs": [
      {
        "title": "titulo 2",
        "artist": "artista 1",
        "duration": 10
      },
      {
        "title": "titulo 3",
        "artist": "artista 1",
        "duration": 10
      }
    ]
  }
}
```

#### **Pagination**

- `limit`: Defines the number of results to return.
- `page`: Selects the page number to return.

These two options work together. When you specify a `limit` and a `page`, the script automatically calculates which results should be returned.

#### **Example Request**

```bash
GET /api/v1/songs/?page=2&limit=3
```

#### **Example Response**

```json
{
  "status": "success",
  "results": 3,
  "data": {
    "songs": [
      {
        "id": 7,
        "title": "titulo 5",
        "artist": "artista 4",
        "duration": 150,
        "tempo": null,
        "song_key": null,
        "genre": null,
        "year": null,
        "notes": null,
        "createdAt": "2025-03-13T21:11:33.996Z",
        "updatedAt": "2025-03-13T21:11:33.996Z"
      },
      {
        "id": 8,
        "title": "titulo 6",
        "artist": "artista 3",
        "duration": 400,
        "tempo": null,
        "song_key": null,
        "genre": null,
        "year": null,
        "notes": null,
        "createdAt": "2025-03-13T21:11:46.059Z",
        "updatedAt": "2025-03-13T21:11:46.059Z"
      },
      {
        "id": 9,
        "title": "titulo 7",
        "artist": "artista 2",
        "duration": 400,
        "tempo": null,
        "song_key": null,
        "genre": null,
        "year": null,
        "notes": null,
        "createdAt": "2025-03-13T21:11:57.486Z",
        "updatedAt": "2025-03-13T21:11:57.486Z"
      }
    ]
  }
}
```

#### **Example of a Full Request**

This is how a full request might look:

```bash
GET /api/v1/songs/?duration[lte]=500&fields=title,artist,duration&page=2&limit=4
```

#### **Example Response**

```json
{
  "status": "success",
  "results": 3,
  "data": {
    "songs": [
      {
        "title": "titulo 5",
        "artist": "artista 4",
        "duration": 150
      },
      {
        "title": "titulo 6",
        "artist": "artista 3",
        "duration": 400
      },
      {
        "title": "titulo 7",
        "artist": "artista 2",
        "duration": 400
      }
    ]
  }
}
```

### **1.2 Get Song**

##### **GET /api/v1/songs/id**

Retrieves the song specified by the id.

#### **Example Request**

```bash
GET /api/v1/songs/5
```

#### **Example Response**

```json
{
  "status": "Success",
  "data": {
    "song": {
      "id": 5,
      "title": "titulo 3",
      "artist": "artista 1",
      "duration": 10,
      "tempo": 0,
      "song_key": "",
      "genre": "",
      "year": 0,
      "notes": "",
      "createdAt": "2025-03-10T22:10:19.091Z",
      "updatedAt": "2025-03-10T22:10:19.091Z"
    }
  }
}
```

### **1.3 Create a new song**

##### **POST /api/v1/songs**

Creates a new song in the `songs` table.

#### **Example Request**

```bash
POST /api/v1/songs
```

#### **Example Request Body**

```json
{
  "title": "Born to be Wild",
  "artist": "Steppenwolf",
  "duration": 210,
  "tempo": 146,
  "song_key": "E",
  "genre": "Rock",
  "year": 1968,
  "notes": "This song require more rehearsal"
}
```

**Note:** The song must have at least a `title`, `artist`, and `duration`, and the combination of `title` and `artist` must be unique.
