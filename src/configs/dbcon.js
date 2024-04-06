const Sequelize = require("sequelize");

module.exports = new Sequelize(
  "wadhain_hb7_india",
  "wadhain_admin",
  "Arshavin021#",
  {
     host: "csweb.in",
     port: 3306,
     dialect: "mysql",
     define: {
      timestimps: false
     },
     pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
     },
     operatorAliases: false
  }
 );
