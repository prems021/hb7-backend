const Sequelize = require("sequelize");
const db = require("../configs/dbcon");


const Hb7_trans_master = db.define(

  "hb7_trans_master",
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
    com_id : {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    is_bulk_pay : {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
    serial_no : {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    cast : {
      type: Sequelize.STRING(10),   //SALE ,  SALE_RET , PUR , PUR_RET ,
      allowNull: false,
    }, 
    type : {
        type: Sequelize.STRING(10),   // CREDIT ,  DEBIT ,
        allowNull: false,
      }, 
    mode : {
        type: Sequelize.STRING(10),   // CASH ,  CHEQUE , NEFT , RTGS , SWIFT , UPI , 
        allowNull: false,
      },
      ref_no : {
        type: Sequelize.STRING(50),   // CASH ,  CHEQUE , NEFT , RTGS , SWIFT , UPI , 
        allowNull: true,
      },
    status : {
        type: Sequelize.INTEGER(4),   //0 - advance on bill  1 - fresh ,  2-updated , 3-cancelled , 4-deleted 
        allowNull: false,
      },   
     date : {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      amount : {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
     
    },
  {
    tableName: "hb7_trans_master",
    timestamps: true,
    paranoid : true
  }
);

module.exports = Hb7_trans_master;