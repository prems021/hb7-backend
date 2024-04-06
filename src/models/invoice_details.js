const Sequelize = require("sequelize");
const db = require("../configs/dbcon");

const Hb7_invoice_details = db.define(
  "hb7_invoice_details",
  {
    id : {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },  
    master_id : {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    product_id : {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    index_no : {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue : 0
      },
    batch_id : {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      product_description : {
        type: Sequelize.STRING(120),
        allowNull: true,
      },
    rate : {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      mrp : {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      tax : {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
     qty : {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      discount : {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      free_qty : {
        type: Sequelize.FLOAT ,
        allowNull: true,
      },
    },
  {
    tableName: "hb7_invoice_details",
    timestamps: true,
    paranoid : true
  }
);

module.exports = Hb7_invoice_details;