const { DataTypes } = require("sequelize");
const sequelize = require("./../database/database");

const Setlist = sequelize.define("setlist", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  name: { type: DataTypes.STRING, allowNull: false },
});

module.exports = Setlist;
