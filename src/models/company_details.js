
const Sequelize = require("sequelize");
const db = require("../configs/dbcon");

const Hb7_company_details = db.define(

  "hb7_company_details",
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },  
    company_name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    company_gstin: {
        type: Sequelize.STRING(25),
        allowNull: true,
      },
      company_email : {
        type: Sequelize.STRING(160),
        allowNull: true,
      },
      company_street : {
        type: Sequelize.STRING(160),
        allowNull: true,
      },
      company_address_1 : {
        type: Sequelize.STRING(160),
        allowNull: false,
      },
      company_address_2 : {
        type: Sequelize.STRING(160),
        allowNull: true,
      },
      company_ph_1 : {
        type: Sequelize.STRING(15),
        allowNull: false,
      },
      company_ph_2 : {
        type: Sequelize.STRING(15),
        allowNull: true,
      },

      company_bank_name : {
        type: Sequelize.STRING(80),
        allowNull: true,
      },
      company_bank_ac_no : {
        type: Sequelize.STRING(80),
        allowNull: true,
      },
      company_bank_branch_name : {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      company_bank_ifsc_code : {
        type: Sequelize.STRING(25),
        allowNull: true,
      },
      default_print_type: {
        type: Sequelize.INTEGER(4),
        allowNull: true,
      },
      default_print_type_80mm : {
        type: Sequelize.INTEGER(4),
        allowNull: true,
      },
      default_invo_number_type : {
        type: Sequelize.INTEGER(4),   // 1 --  continues for b2c ,b2b ,,  2 - saperate count for b2c & b2b
        allowNull: true,
      },
      default_print_size :  {
        type: Sequelize.STRING(5),
        allowNull: true,
      },
      
    },
  {
    tableName: "hb7_company_details",
    timestamps: true
  }
);

module.exports = Hb7_company_details;