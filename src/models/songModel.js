const { DataTypes } = require("sequelize");
const sequelize = require("./../database/database");

const Song = sequelize.define("song", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  title: { type: DataTypes.STRING, allowNull: false },
  artist: { type: DataTypes.STRING, allowNull: false },
  duration: { type: DataTypes.INTEGER, allowNull: false },
  tempo: DataTypes.INTEGER,
  song_key: DataTypes.STRING,
  genre: DataTypes.STRING,
  year: DataTypes.INTEGER,
  notes: DataTypes.STRING,
}, {
  timestamps: false,
});

module.exports = Song;
