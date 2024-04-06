const Sequelize = require("sequelize");
const db = require("../configs/dbcon");
const Hb7_fy_string = db.define(
  "hb7_fy_string",
  {
    id : {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },  
    com_id : {
      type: Sequelize.INTEGER,
      allowNull: false,
    },  
    fy : {
      type: Sequelize.STRING(30),
      allowNull: false,
    },  
   fy_string : {
        type: Sequelize.STRING(30),
        allowNull: false,
      },   
    is_default : {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },     
    },
  {
    tableName: "hb7_fy_string",
    timestamps: false
  }
);

module.exports = Hb7_fy_string;