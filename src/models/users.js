const Sequelize = require("sequelize");
const db = require("../configs/dbcon");

const Hb7_users = db.define(
  "hb7_users",
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },  
    user_name: {
      type: Sequelize.STRING(25),
      allowNull: false,
    },
    user_password: {
        type: Sequelize.STRING(25),
        allowNull: false,
      },
      user_role : {
        type: Sequelize.STRING(25),
        allowNull: false,
      },
      next_expiry : {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },

      msg_to_display : {
        type: Sequelize.STRING,
        allowNull: false,
      },

      is_demo_user : {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
    
      com_id : {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    },
  {
    tableName: "hb7_users",
    timestamps: false
  }
);


module.exports = Hb7_users;