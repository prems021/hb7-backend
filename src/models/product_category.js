const Sequelize = require("sequelize");
const db = require("../configs/dbcon");
const Hb7_product_category = db.define(
  "hb7_product_category",
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
     category_name : {
        type: Sequelize.STRING(120),
        allowNull: false,
      },   
         
    },
  {
    tableName: "hb7_product_category",
    timestamps: false
  }
);

module.exports = Hb7_product_category;