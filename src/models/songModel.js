const { DataTypes } = require("sequelize");
const sequelize = require("./../database/database");

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

module.exports = Song;
