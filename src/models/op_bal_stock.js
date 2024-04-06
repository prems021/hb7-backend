const Sequelize = require("sequelize");
const db = require("../configs/dbcon");


const Hb7_op_bal_stock = db.define(

  "Hb7_op_bal_stock",
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
    fy_id : {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    product_id : {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
   opening_stock : {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
     
    },
  {
    tableName: "hb7_op_bal_stock",
    timestamps: true
  }
);

module.exports = Hb7_op_bal_stock;