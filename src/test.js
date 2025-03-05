const sequelize = require("./database/database");
const Song = require("./models/songModel");
const Set = require("./models/setModel");
const Playlist = require("./models/playlistModel");
const modelRelations = require('./database/associations')

// Función para probar las operaciones
const testDatabase = async () => {
  try {
    // Sincronizar modelos con la base de datos
    modelRelations()
    await sequelize.sync({ force: true }); // force: true borra y recrea las tablas
    console.log("Tablas sincronizadas!");

    // Crear canciones
    

  } catch (error) {
    console.error("Error durante la prueba:", error);
  } finally {
    // Cerrar la conexión a la base de datos
    await sequelize.close();
    console.log("Conexión cerrada.");
  }
};

// Ejecutar la prueba
module.exports = testDatabase;