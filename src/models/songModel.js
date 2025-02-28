const { DataTypes } = require("sequelize");
const sequelize = require("./../database/database");

const Song = sequelize.define("song", {
  title: { type: DataTypes.STRING, allowNull: false },
  artist: { type: DataTypes.STRING, allowNull: false },
  duration: { type: DataTypes.FLOAT, allowNull: false },
  tempo: DataTypes.INTEGER,
  song_key: DataTypes.STRING,
  genre: DataTypes.STRING,
  year: DataTypes.INTEGER,
  notes: DataTypes.STRING,
});

module.exports = Song;
