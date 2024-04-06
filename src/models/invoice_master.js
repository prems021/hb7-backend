const Sequelize = require("sequelize");
const db = require("../configs/dbcon");


const Hb7_invoice_master = db.define(

  "hb7_invoice_master",
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
    cus_id : {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    type : {
        type: Sequelize.STRING(10),   // B2B ,  B2C ,SEZ, IGST  
        allowNull: false,
      }, 
     cast : {
        type: Sequelize.INTEGER(4),   //  1 - Invoice , 2 - Performa  
        allowNull: false,
      }, 
    mode : {
        type: Sequelize.STRING(10),   // IN ,  SR , PUR , PUR_RET , LOC_PUR , LOC_PUR_RET , 
        allowNull: false,
      },  
      pos : {
        type: Sequelize.STRING(80),   // place of supply , 
        allowNull: true,
      },
      lpo_no : {
        type: Sequelize.STRING(80),   // local purchase order no , 
        allowNull: true,
      },
      mode_of_supply : {
        type: Sequelize.STRING(80),   //  , 
        allowNull: true,
      },
      bundles : {
        type: Sequelize.STRING(50),   // 
        allowNull: true,
      },
      
     status : {
        type: Sequelize.INTEGER(4),   // 1 - fresh ,  2-updated , 3-cancelled , 4-deleted 
        allowNull: false,
      },   
      user_id : {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      counter_no : {
        type: Sequelize.INTEGER(4),
        allowNull: false,
      },
      invoice_no : {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      ref_invoice_number : {
        type: Sequelize.STRING(80),
        allowNull: true,
      },
      invoice_no_pur : {
        type: Sequelize.STRING(80),
        allowNull: true,
      },
       invoice_date : {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      ref_invoice_date  : {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },    
      round_off : {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      discount_amt : {
        type: Sequelize.FLOAT,
        allowNull: true,
      },    
      grand_amt : {
        type: Sequelize.FLOAT,
        allowNull: true,
      },   
      token : {
        type: Sequelize.STRING(5),
        allowNull: true,
      },
     
    },
  {
    tableName: "hb7_invoice_master",
    timestamps: true,
    paranoid : true
  }
);

module.exports = Hb7_invoice_master;