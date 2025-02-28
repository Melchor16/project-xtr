const dotenv = require("dotenv");
const Sequelize = require("sequelize");

// env variables
dotenv.config({ path: "./src/config.env" });

// connecting tu database ///////////////////////////////////////////////////////////////////////////////
const sequelize = new Sequelize(
  `postgresql://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE}`,
  {
    dialect: "postgresql",
  }
);
////////////////////////////////////////////////////////////////////////////////////////////////////////

module.exports = sequelize;
