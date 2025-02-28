const { DataTypes } = require("sequelize");
const sequelize = require("./../database/database");
const Song = require("./songModel");

const Playlist = sequelize.define("playlist", {
  disposition: DataTypes.INTEGER,
});

Playlist.hasMany();
