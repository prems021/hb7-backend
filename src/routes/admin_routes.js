const express = require("express");
const admin_router = express.Router();
const Seque = require('../configs/dbcon');

const Hb7_company_details = require("../models/company_details");
const Hb7_products = require("../models/product");
const Hb7_invoice_master = require("../models/invoice_master");
const Hb7_invoice_details = require("../models/invoice_details");
const Hb7_units = require("../models/unit");
const Hb7_fy_string = require("../models/fy_string");
const Hb7_customers = require("../models/customers");
const Hb7_users = require("../models/users");
const Hb7_product_category = require("../models/product_category");

const Hb7_trans_master =  require("../models/trans_master");

const Hb7_op_bal_stock = require("../models/op_bal_stock");


const duration = require('pendel');

module.exports = function() {
    
    admin_router.get("/", (req, res) => {    
        res.send("Admin route new up!");
    }); 

    

    // admin_router.get("/tm", (request, response) => {
    //   var datetime = new Date();
    //   var x = datetime.toISOString().slice(0,10) 

    //   Hb7_trans_master.sync({ force: true }).then(() => {
    //         //Table created
    //         return Hb7_trans_master.create({   
    //           master_id : 95,
    //           is_bulk_pay : false,
    //           type : 'CREDIT',
    //           mode :  'CASH',
    //           status  : 1,
    //           date : 2021-09-02,
    //           amount : 0,
    //           // createdAt : datetime,
    //           // updatedAt : datetime
              
    //         }).catch(err=>{
    //           console.log('ee',err)
    //         })
    //     });
    //     return response.json({ success: true, msg: "CREATED" });
    // });





    admin_router.post("/user_login", (req, res) => {

      console.log('req # user_login........................',req.body); 
           
        Hb7_users.findOne({
          where: {
            user_name: req.body.USER_NAME,
            user_password: req.body.PASSWORD
          } ,  include: [ { model: Hb7_company_details , include :  { model: Hb7_fy_string , where : { is_default : true}  }   } ]
        })
          .then(user => {
            if (user) {

                                console.log('req # user........................',user); 
             


                                                    var datetime = new Date();
                                                    var x = datetime.toISOString().slice(0,10)                           

                                                const diff  =    duration.date(x,user.next_expiry);   

              if (user.is_demo_user == true) {
                                                
                                                    if( diff.days  < 0  )
                                                    {
                                                        return res.json({ success: true,status:false,msg: "licence expired contact 7012406551" });
                                                    }
                                                    else
                                                    {
                                                        return res.json({ success: true,status:true,Role:"Demo",ID :user.id,"msg":"Demo expires in "+diff.days+" days" });
                                                    }
                                             }
                  else
                  {
                   
                     if( diff.days  < 0 )
                     {
                        return res.json({ success: true,status:false,msg: "licence expired contact 7012406551" });
                     }
                     else
                     {
                       return res.json({ success: true,status:true,msg: "Logged in.. Service expires in "+diff.days+" days",
                        user: user  });
                     }
                    
                  }

                 
                                    
                  } else {
                    return res.json({ success: true,status:false,msg: "user not found" });
                  }
              
             
          })
          .catch(error => { return res.json({ success: false, msg:error}) , console.log(error) })
      });


 

  
    // admin_router.get("/all", (req, res) => {
    //   Seque.sync({ force: true }).then(data => {
    //       if(data)
    //       {
    //           res.json({ success: "all list created" });
    //       }   
    //   }).catch(err=> {
    //       res.json({ success: "false", "err" : err });
    //   })
     
    // });





Hb7_op_bal_stock.belongsTo(Hb7_company_details,{  foreignKey: "com_id" });
Hb7_op_bal_stock.belongsTo(Hb7_fy_string,{  foreignKey: "fy_id" });
Hb7_op_bal_stock.belongsTo(Hb7_products,{  foreignKey: "product_id" });




Hb7_company_details.hasMany(Hb7_customers,{  foreignKey: "com_id" });
Hb7_customers.belongsTo(Hb7_company_details,{  foreignKey: "com_id" });

Hb7_company_details.hasMany(Hb7_invoice_master,{  foreignKey: "com_id" });
Hb7_invoice_master.belongsTo(Hb7_company_details,{  foreignKey: "com_id" });

Hb7_company_details.hasMany(Hb7_products,{  foreignKey: "com_id" });
Hb7_products.belongsTo(Hb7_company_details,{  foreignKey: "com_id" });

Hb7_company_details.hasMany(Hb7_users,{  foreignKey: "com_id" });
Hb7_users.belongsTo(Hb7_company_details,{  foreignKey: "com_id" });

Hb7_company_details.hasMany(Hb7_fy_string,{  foreignKey: "com_id" });
Hb7_fy_string.belongsTo(Hb7_company_details,{  foreignKey: "com_id" });


Hb7_invoice_master.hasMany(Hb7_invoice_details,{  foreignKey: "master_id" });
Hb7_invoice_details.belongsTo(Hb7_invoice_master,{  foreignKey: "master_id" });

Hb7_invoice_master.hasMany(Hb7_trans_master,{  foreignKey: "master_id" });
Hb7_trans_master.belongsTo(Hb7_invoice_master,{  foreignKey: "master_id" });

Hb7_company_details.hasMany(Hb7_trans_master,{  foreignKey: "com_id" });
Hb7_trans_master.belongsTo(Hb7_company_details,{  foreignKey: "com_id" });


 Hb7_invoice_master.belongsTo(Hb7_fy_string,{  foreignKey: "fy_id" });
 
 Hb7_invoice_master.belongsTo(Hb7_customers,{  foreignKey: "cus_id" }); 
 Hb7_customers.hasMany(Hb7_invoice_master,{  foreignKey: "cus_id" });

 Hb7_invoice_master.belongsTo(Hb7_users,{  foreignKey: "user_id" }); 
 Hb7_users.hasMany(Hb7_invoice_master,{  foreignKey: "user_id" });

 Hb7_products.belongsTo(Hb7_units,{  foreignKey: "unit_id" }); 
 Hb7_units.hasMany(Hb7_products,{  foreignKey: "unit_id" });

 Hb7_products.belongsTo(Hb7_product_category,{  foreignKey: "category_id" }); 
 Hb7_product_category.hasMany(Hb7_products,{  foreignKey: "category_id" });

 Hb7_invoice_details.belongsTo(Hb7_products,{  foreignKey: "product_id" }); 
 Hb7_products.hasMany(Hb7_invoice_details,{  foreignKey: "product_id" });
 



    return admin_router;
}



