const { DataTypes } = require("sequelize");
const sequelize = require("./../database/database");

const Setlist = sequelize.define("setlist", {
  name: { type: DataTypes.STRING, allowNull: false },

});

module.exports = Setlist;