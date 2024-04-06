const Sequelize = require("sequelize");
const db = require("../configs/dbcon");


const Hb7_units = db.define(

  "hb7_units",
  {
    id : {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },  
    Quantity : {
      type: Sequelize.STRING(30),
      allowNull: false,
    },  
    Quantity_Type : {
      type: Sequelize.STRING(30),
      allowNull: false,
    },  
    UQC_Code : {
        type: Sequelize.STRING(30),
        allowNull: false,
      },       
    },
  {
    tableName: "hb7_units",
    timestamps: false
  }
);

module.exports = Hb7_units;