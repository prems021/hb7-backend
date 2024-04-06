
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

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
const path = require("path");
const log = require("log-to-file");





exports._backup = async (req, res,next) => {
  try{
    console.log('insiuu')
  
         const backup = await mysqldump.default({
      connection: {
          host: '35.244.28.240',
          user: 'wadhain_admin',
          password: 'Arshavin021#',
          database: 'wadhain_hb7_india',
               },
          dumpToFile: './db_backup/wadhain_hb7_india.sql',
                   })

            if(backup != null)
            {         
                res.status(200).json({message:"Successfully Backup completed"});
            }
    
      else {
               res.status(200).json({message:"Backup failed"});
           }
     }
catch (error) {
 console.log('err-log',error);
 log(error,'error-log.log')        
 res.json({"success":false,"err":error,"msg":"backup failed"})           
 }

} 


exports._get_fy_list = async (req, res) => {
  const all_cus = await Hb7_fy_string.findAll({  where : { com_id : req.params.com_id }})
    res.status(200).send(all_cus)    
};


exports._set_fy_as_default = async (req, res) => {

  const exti = await Hb7_fy_string.findOne({  where : { is_default : true  , com_id :  req.params.com_id }  })
   await exti.update({
    is_default : false
   })

  const all_cus = await Hb7_fy_string.findOne({  where : { id : req.params.id }})
  await all_cus.update({
    is_default : true
  })
  res.json({"success":true,"msg":"Operation Completed"}) 
};


exports._delete_product = async (req, res,next) => {
  try{
    const user = await Hb7_products.findByPk(req.params.id)
    if(user)
    {
      const sam = await user.destroy();      
      res.json({"success":true,"msg":"Deletion Completed"}) 
    }
     }
     catch (error) {
      console.log('err-log',error);
      log(error,'error-log.log')        
      res.json({"success":false,"err":error,"msg":"Product Exist on Invoice Delete all invoice associated to product then try"})           
      }
  
  } 



exports._get_all_tran_detail_of_a_invoice_incl_advance = async (req, res,next) => {

  try{      
      const adv = await Hb7_invoice_master.findByPk(req.params.id) 
      if(adv == null)
      {
        res.json({"success":false,"data":null}) 
      }
      else
      {
        const part_pays = await Hb7_trans_master.findAll({where : {master_id : req.params.id }}  ) 
        res.json({"success":true,"adv":adv,"part_pays":part_pays}) 
      } 


    }
    catch(error) { 
      console.log('err-log',error);
      res.json({"success":false,"data":null}) 
  }                     
  }


  // exports._trans = async (req, res,next) => {

  //   try{
  
  //      const idx = await Hb7_invoice_details.findOne({where : {tax : null }})  
  //      if(idx)
  //      {      
      
  //                                    const aspx =await Hb7_products.findOne({ where : { id: idx.product_id }}) 
  //                                     console.log('found...............',aspx.product_name)
  //                                    const compan_dets = await  idx.update({ tax : aspx.tax_rate })
  //                                    if(compan_dets)
  //                                    {
                                    
                                     
  //                                      console.log('idx...............',idx.id)                                             
  //                                      res.json({"success":true,"msg":idx.id})                     
  //                                    }
  //                                    else
  //                                    {
  //                                     res.json({"success":false,"msg":"no "})  
  //                                    }
                                   
  
                               
  //      }  
     
          
     
  //   }
  //   catch(error) { 
  //     console.log('error...............',error)
  //     res.json({"success":false,"data":null}) 
  // }                     
  // }


  

// exports._transx = async (req, res,next) => {

//   try{

//      const idx = await Hb7_invoice_details.findOne({where : {tax : NaN }})  
//      if(idx.length>0)
//      {

     
       
//      var count = 1; 
//      idx.forEach(async element => {  
                                      
                                    
//                                    const aspx =await Hb7_products.findOne({ where : { id: element.product_id }}) 
//                                     console.log('found...............',aspx.product_name)
//                                    const compan_dets = await  element.update({ tax : aspx.tax_rate })
//                                    if(compan_dets)
//                                    {
//                                     count++;
//                                     if(count == idx.length){
//                                      console.log('count...............',count)                                             
//                                                             }  
//                                    }
                                 

//                              })

//      }  
   
//      res.json({"success":true,"msg":"item "})     
   
//   }
//   catch(error) { 
//     console.log('error...............',error)
//     res.json({"success":false,"data":null}) 
// }                     
// }
    




exports._get_stock_qty = async (req, res,next) => {

  try{

    const op_bal = await Hb7_products.findByPk(req.params.pro_id)

    const pur_tot = await Hb7_invoice_details.sum('qty',{ where: { product_id : req.params.pro_id  },
      include: [{ model: Hb7_invoice_master , required: true ,  where: {  cast :  3 } }  ]})

  

    const sales_tot = await Hb7_invoice_details.sum('qty', {     include: [{ model: Hb7_invoice_master , required: true , where: {  cast :  1  , 
      mode : 'IN' , com_id: req.params.com_id , status : { [Op.or]: [1,2]} } } ],                     
    where: { product_id : req.params.pro_id     } , required: true   }   );

    const sales_ret_tot = await Hb7_invoice_details.sum('qty', {     include: [{ model: Hb7_invoice_master , required: true , where: {  cast :  1  , 
      mode : 'SR' , com_id: req.params.com_id , status : { [Op.or]: [1,2]} } } ],                     
    where: { product_id : req.params.pro_id     } , required: true   }   );

    const purchase_ret_tot = await Hb7_invoice_details.sum('qty', {     include: [{ model: Hb7_invoice_master , required: true , where: {  cast :  1  , 
      mode : 'PUR_RET' , com_id: req.params.com_id , status : { [Op.or]: [1,2]} } } ],                     
    where: { product_id : req.params.pro_id     } , required: true   }   );
    


      res.json({"success":true,"op_bal":op_bal.opening_stock,"pur_tot": pur_tot,"sales_tot":sales_tot,"sales_ret_tot": sales_ret_tot, "purchase_ret_tot": purchase_ret_tot}) 

    }catch(error) { 
                          console.log('err-log',error);
                          res.json({"success":false,"data":null}) 
                  }                     
    }

    exports._get_stock_qty_report = async (req, res,next) => {

      try{
    
        const op_bal = await Hb7_products.findByPk(req.params.pro_id)
    
        const pur_tot = await Hb7_invoice_details.sum('qty',{ where: { product_id : req.params.pro_id  },
          include: [{ model: Hb7_invoice_master , required: true ,  where: {  cast :  3 , createdAt : { 
            [Op.lte]: req.params.date          
         } } }  ]})
    
      
    
        const sales_tot = await Hb7_invoice_details.sum('qty', {     include: [{ model: Hb7_invoice_master , required: true , where: {  cast :  1  , createdAt : { 
          [Op.lte]: req.params.date          
       },
          mode : 'IN' , com_id: req.params.com_id , status : { [Op.or]: [1,2]} } } ],                     
        where: { product_id : req.params.pro_id     } , required: true   }   );
    
        const sales_ret_tot = await Hb7_invoice_details.sum('qty', {     include: [{ model: Hb7_invoice_master , required: true , where: {  cast :  1  , createdAt : { 
          [Op.lte]: req.params.date          
       },
          mode : 'SR' , com_id: req.params.com_id , status : { [Op.or]: [1,2]} } } ],                     
        where: { product_id : req.params.pro_id     } , required: true   }   );
    
        const purchase_ret_tot = await Hb7_invoice_details.sum('qty', {     include: [{ model: Hb7_invoice_master , required: true , where: {  cast :  1  , createdAt : { 
          [Op.lte]: req.params.date          
       },
          mode : 'PUR_RET' , com_id: req.params.com_id , status : { [Op.or]: [1,2]} } } ],                     
        where: { product_id : req.params.pro_id     } , required: true   }   );
        
    
    
          res.json({"success":true,"req_id": req.params.pro_id-0 ,  "op_bal":op_bal.opening_stock,"pur_tot": pur_tot,"sales_tot":sales_tot,"sales_ret_tot": sales_ret_tot, "purchase_ret_tot": purchase_ret_tot}) 
    
        }catch(error) { 
                              console.log('err-log',error);
                              res.json({"success":false,"data":null}) 
                      }                     
        }

    


exports._get_logo = async (req, res,next) => {

 try{
  const fileName = req.params.file_name;
 // directoryPath =   '../'+__dirname + '/public/';
const directoryPath =  path.join(__dirname+'../../../public/');
  res.set({'Content-Type': 'image/png'});
   var filepath = directoryPath + fileName;

res.sendFile(filepath,(err) => {
if (err) {
  console.log('err-log',err);
res.status(500).send({
message: "Could not download the file. " + err,
});
}
});
  

}catch(error) { 
  console.log('err-log',error);
  res.status(500).send({
  message: "Could not download the file."}) }
                 
}


exports._get_all_trans_detail_of_a_invoice = async (req, res,next) => {
  const deluh = await  Hb7_trans_master.findAll({where : { master_id : req.params.id , cast : 'SALE',type : 'CREDIT' }})
  res.status(200).send(deluh);    
}

exports._get_all_trans_detail_of_a_purchase = async (req, res,next) => {
  const deluh = await  Hb7_trans_master.findAll({where : { master_id : req.params.id , cast : 'PUR',type : 'DEBIT' }})
  res.status(200).send(deluh);    
}


exports._delete_item_from_invoice_list = async (req, res,next) => {

  const delg = await Hb7_invoice_details.findOne({where:{ id : req.params.id  }})
  if(delg) 
  {
    const dte = await delg.destroy();

    if(!dte)
      {
         return next({"msg": "Modification Failed","success":false});
      }
    else
    {  
  
      const delh = await Hb7_invoice_details.findAll({where:{ master_id : req.params.master_id,  index_no :  { [Op.gt]: [ (req.params.index_no-0) ]}   }})
       
       if(delh.length>0)
       {
                    
          var count = 0; 
          delh.forEach(async element => {  
                            
                                        const compan_dets = await  element.update({ index_no : (element.index_no-0) - 1 })
                                        count++;
                                        if(count == delh.length){
                                          res.status(200).json({"success":true,"msg":"item deleted"})                                                                   
                                                                }  
    
                                  })
       }
       else
       {
        res.status(200).json({"success":true,"msg":"item deleted"})
       } 
  
    }
  }

  else
  {
    res.status(400).json({"success":true,"msg":"item not found"})  
  }

  
}



exports._get_a_invoice_detail = async (req, res) => {
  try{
  
       const all_invo = await Hb7_invoice_master.findOne({  where : { id : req.params.id   } ,
           order:[ [{model: Hb7_invoice_details}, 'index_no', 'asc'  ]],
            include: [ { model: Hb7_customers } , { model: Hb7_invoice_details ,  include: [ { model: Hb7_products, include: [ { model: Hb7_units }] } ]  } , 
            {model : Hb7_trans_master } ]})
            if(all_invo != null)
            {
              res.status(200).send(all_invo)    
            }
            else
            {
              res.status(200).send(null)  
            }
   }
catch (error) {
  console.log('err-log',error);
  log(error,'error-log.log')        
  res.json({"success":false,"err":error,"msg":"Errors on Entry"})     
  
  }

};

exports._change_customer_of_invoice = async (req, res,next) => {
  try{
        
          const invos = await Hb7_invoice_master.findOne({  where : { id : req.params.id}   } )
          if(invos)
          {
            
            const fin = await Hb7_customers.findOne({  where : { id : invos.cus_id } })
            const fin2 = await Hb7_customers.findOne({  where : { id : req.params.cus_id } })
            
            if(fin.cast == fin2.cast && fin.type == fin2.type)
            {
              const update = await invos.update({ cus_id : req.params.cus_id , type : req.params.type , status : 2  })
              if(!update)
              {
                res.json({"success":false,"msg":"Modification Failed"})     
                
              }
              else{
                res.status(200).json({"success":true,"msg":"Customer updated"})
              } 
            }
            else
            {
              res.json({"success":false,"msg":"Modification Failed  Indiffernt Cast"})     
              
            }

        
        }
        else
        {
          res.json({"success":false,"msg":"Modification Failed Customer not Found"})    
        }
  }
  catch (error) {
    console.log('err-log',error);
    log(error,'error-log.log')        
    res.json({"success":false,"err":error,"msg":"Errors on Entry"})     
    
    }

};


exports._change_vendor_of_purchase = async (req, res,next) => {
  try{
         
           const invos = await Hb7_invoice_master.findOne({  where : { id : req.params.id}   } )
           if(invos)
           {
             
             const fin = await Hb7_customers.findOne({  where : { id : invos.cus_id } })
             const fin2 = await Hb7_customers.findOne({  where : { id : req.params.cus_id } })
          
             
             if(fin.cast == fin2.cast)
              {
              
               const update = await invos.update({ cus_id : req.params.cus_id , status : 2  })
                 if(!update)
                {
                  
                    res.json({"msg": "Modification Failed","success":false});
                 }
               else{               
                     res.status(200).json({"success":true,"msg":"Customer updated"})
                   } 
                }
              else
              {
                
                res.json({"msg": "Modification Failed Indiffernt Cast","success":false});
              }
 
         
         }
         else
         {          
          res.json({"msg": "Modification Failed","success":false});
         }
   }
  catch (error) {
    console.log('err-log',error);
    log(error,'error-log.log')        
    res.json({"success":false,"err":error,"msg":"Errors on Entry"})     
    
    }

};




exports._change_invoice_date = async (req, res,next) => {
  
  const invo = await Hb7_invoice_master.findOne({  where : { id : req.params.id}   } )
  const update = await invo.update({ invoice_date : req.params.date })
  if(!update)
  {
    return next({"msg": "Modification Failed","success":false});
  }
  else{
    res.status(200).json({"success":true,"msg":"date updated"})
  }       
};



exports._get_all_invoices = async (req, res) => {
  try{
 
  const all_invo = await Hb7_invoice_master.findAll({  where : { com_id : req.params.com_id , fy_id : req.params.fy_id , cast : 1 , mode : 'IN' } ,
      include: [ { model: Hb7_customers }]})
      if(all_invo == null)
      {
        res.status(200).send(null) 
      }
      else
      {
        res.status(200).send(all_invo) 
      }
       
  }
  catch (error) {
    console.log('err-log',error);
    log(error,'error-log.log')        
    res.json({"success":false,"err":error,"msg":"Errors on Request"})     
    
    }
};

exports._get_all_perfoma_invoices = async (req, res) => {
  try{
 
  const all_invo = await Hb7_invoice_master.findAll({  where : { com_id : req.params.com_id , fy_id : req.params.fy_id , cast : 2 , mode : 'IN' } ,
      include: [ { model: Hb7_customers }]})
      if(all_invo == null)
      {
        res.status(200).send(null) 
      }
      else
      {
        res.status(200).send(all_invo) 
      }
       
  }
  catch (error) {
    console.log('err-log',error);
    log(error,'error-log.log')        
    res.json({"success":false,"err":error,"msg":"Errors on Request"})     
    
    }
};






exports._get_all_purchase_returns = async (req, res) => { 
  const all_pur_ret = await Hb7_invoice_master.findAll({  where : { com_id : req.params.com_id , fy_id : req.params.fy_id , cast : 1 , mode : 'PUR_RET' } ,
      include: [ { model: Hb7_customers }]})
    res.status(200).send(all_pur_ret)    
};




exports._get_all_purchases = async (req, res) => {
  try{
  const all_invo = await Hb7_invoice_master.findAll({  where : { com_id : req.params.com_id , fy_id : req.params.fy_id , cast : 3 , mode : 'PUR'  } ,
      include: [ { model: Hb7_customers }]})
      if(all_invo == null)
      {
        res.status(200).send(null) 
      }
      else
      {
        res.status(200).send(all_invo) 
      }
    
  }
  catch (error) {
    console.log('err-log',error);
    log(error,'error-log.log')        
    res.json({"success":false,"err":error,"msg":"Errors on Request"})     
    
    }   
};



 






exports._all_cus_vendors = async (req, res) => {
  const all_cus = await Hb7_customers.findAll({  where : { com_id : req.params.com_id }})
    res.status(200).send(all_cus)    
};

exports._all_assets = async (req, res) => {
    try{  
  const all_ass = await Hb7_products.findAll({  where : { com_id : req.params.com_id } ,  include: [ { model: Hb7_units }] })
  if(all_ass == null)
  {
    res.status(200).send(null)
  }
  else
  {
    res.status(200).send(all_ass) 
  }
  }
  catch (error) {
    console.log('err-log',error);
    log(error,'error-log.log')        
    res.json({"success":false,"err":error,"msg":"Errors on Request"})     
    
    }    
};

exports._get_all_product_category = async (req, res) => {
  try{
  const all_pcat = await Hb7_product_category.findAll({  where : { com_id : req.params.com_id }})
  if(all_pcat == null)
  {
    res.status(200).send(null)
  }
  else
  {
    res.status(200).send(all_pcat)
  }
        
  }
  catch (error) {
    console.log('err-log',error);
    log(error,'error-log.log')        
    res.json({"success":false,"err":error,"msg":"Errors on Request"})     
    
    } 
};

exports._get_all_units = async (req, res) => {
  try{  
  const all_punit = await Hb7_units.findAll()
  if(all_punit == null)
  {
    res.status(200).send(null)
  }
  else
  {
    res.status(200).send(all_punit)
  } 
    
     }
  catch (error) {
    console.log('err-log',error);
    log(error,'error-log.log')        
    res.json({"success":false,"err":error,"msg":"Errors on Request"})     
    
    } 
};

exports._get_company_details = async (req, res) => {  
  const com_det = await Hb7_company_details.findOne({  where : { id : req.params.com_id }})
    res.status(200).send(com_det)    
};










