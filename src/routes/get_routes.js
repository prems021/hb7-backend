const express = require("express");
const get_router = express.Router();
const Sequelize = require("sequelize");




const mysqldump = require("mysqldump");
const Seque = require('../configs/dbcon');


const Op = Sequelize.Op;



module.exports = function() {
    get_router.get("/", (req, res) => {
      res.json({ success: "get_router" });
    });

//     get_router.get("/s", (req, res) => {
//         Inv.findAll({ where : { INVOICE_NUMBER : {[Op.gt]: 7575 }   }}).then(_all=>{
//             var count = 0; 
//             _all.forEach(async element => {  

//                 const compan_dets = await  element.update({ INVOICE_NUMBER : (element.INVOICE_NUMBER-0) + 712 })
//                 count++;
//                 if(count == _all.length){   res.json({ success: "migrated" })  }                   

//         })
//     })
// })
       
    


    // get_router.get("/p", (req, res) => {


    // Ins.findAll({ where : { MASTER_ID : {[Op.gt]: 7575 } , ID :  { [Op.between]: [27905, 28906]}  }}).then(_alx=>{

    //     var count = 0; 
    //     _alx.forEach(async element => {  

    //         const compan_dets = await  element.update({ MASTER_ID : (element.MASTER_ID-0) + 712 })
    //         count++;
    //         if(count == _alx.length){ 

    //                                      res.json({ success: "migrated" });
    //                                  }

    //                                 })
    //                             })
    //                         })

    //                         get_router.get("/q", (req, res) => {


    //                             Ins.findAll({ where : { MASTER_ID : {[Op.gt]: 7575 } , ID :  { [Op.between]: [28905, 29906]}  }}).then(_alx=>{
                            
    //                                 var count = 0; 
    //                                 _alx.forEach(async element => {  
                            
    //                                     const compan_dets = await  element.update({ MASTER_ID : (element.MASTER_ID-0) + 712 })
    //                                     count++;
    //                                     if(count == _alx.length){ 
                            
    //                                                                  res.json({ success: "migrated" });
    //                                                              }
                            
    //                                                             })
    //                                                         })
    //                                                     })


    //                                                     get_router.get("/r", (req, res) => {


    //                                                         Ins.findAll({ where : { MASTER_ID : {[Op.gt]: 7575 } , ID :  { [Op.gt]: [29905]}  }}).then(_alx=>{
                                                        
    //                                                             var count = 0; 
    //                                                             _alx.forEach(async element => {  
                                                        
    //                                                                 const compan_dets = await  element.update({ MASTER_ID : (element.MASTER_ID-0) + 712 })
    //                                                                 count++;
    //                                                                 if(count == _alx.length){ 
                                                        
    //                                                                                              res.json({ success: "migrated" });
    //                                                                                          }
                                                        
    //                                                                                         })
    //                                                                                     })
    //                                                                                 })


   get_router.get("/backup", (request, response) => {
    mysqldump.default({
        connection: {
            host: 'wadha.in',
            user: 'wadhain_admin',
            password: 'Arshavin021#',
            database: 'wadhain_hb7_india',
        },
        dumpToFile: './db_backup/wadhain_hb7_india.sql',
    }).then(function (backup) {
        if (backup) {
            response.json('Backup completed');
        }
        else if (Error) {
            response.json('Error');
        }
    });
});


  




  
    return get_router;
};