const { DataTypes } = require("sequelize");
const sequelize = require("./../database/database");
const Song = require("./songModel");
const Setlist = require("./setModel");

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

module.exports = Playlist;
