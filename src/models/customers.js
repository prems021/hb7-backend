const Sequelize = require("sequelize");
const db = require("../configs/dbcon");
const Hb7_customers = db.define(

  "hb7_customers",
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
    gst_in : {
        type: Sequelize.STRING(25),
        allowNull: true,
      },
     name : {
        type: Sequelize.STRING,
        allowNull: false,
      },
      street : {
        type: Sequelize.STRING,
        allowNull: true,
      },
     address_1 : {
        type: Sequelize.STRING(160),
        allowNull: false,
      },
      address_2 : {
        type: Sequelize.STRING(160),
        allowNull: true,
      }, 
      type : {
        type: Sequelize.INTEGER(4),  // 1 - cus with gst   2 - cus without gst  3-vendor with gst 4-vendor without gst
        allowNull: false,
      },  
      cast : {
        type: Sequelize.INTEGER(4),  // 1 - inter state   2 - out-state  3-sez    5 - inter-national(export)
        allowNull: false,
      }, 

      ph : {
        type: Sequelize.STRING(15),
        allowNull: true,
      }, 
      mob : {
        type: Sequelize.STRING(15),
        allowNull: true,
      }, 
      email : {
        type: Sequelize.STRING(180),
        allowNull: true,
      }, 
      opening_balance : {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      credit_balance : {
        type: Sequelize.FLOAT,
        allowNull: true,
      },     
    },
  {
    tableName: "hb7_customers",
    timestamps: true
  }
);

module.exports = Hb7_customers;