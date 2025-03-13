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

#### **Raw sequelize model**

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

#### **Raw sequelize model**

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

#### **Raw sequelize model**

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

#### **Get All Songs**

```markdown
### **GET /api/v1/songs**

Retrieves a list of all available songs.

### **Query Parameters**

- `duration[gte]`: Filters songs with a duration greater than or equal to the specified value.
- `duration[lte]`: Filters songs with a duration less than or equal to the specified value.
- `tempo[gt]`: Filters songs with a tempo greater than the specified value.
- `tempo[lt]`: Filters songs with a tempo less than the specified value.
- `artist`: Filters songs by artist.
```

#### **Example Request**

```bash
GET /api/v1/songs?duration[gte]=120&duration[lte]=300&tempo[gt]=100
```
