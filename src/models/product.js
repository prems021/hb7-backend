const Sequelize = require("sequelize");
const db = require("../configs/dbcon");


const Hb7_products = db.define(

  "Hb7_products",
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
    batch_id : {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
     bar_code : {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      hsn_code : {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
     product_name : {
        type: Sequelize.STRING,
        allowNull: true,
      },
      product_description : {
        type: Sequelize.STRING,
        allowNull: true,
      },
      category_id : {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    tax_rate : {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
    mrp : {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
    rate : {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      unit_id : {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
     opening_stock : {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
     
    },
  {
    tableName: "hb7_products",
    timestamps: true
  }
);

module.exports = Hb7_products;