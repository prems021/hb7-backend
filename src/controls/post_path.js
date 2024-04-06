





  

const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const Seque = require('../configs/dbcon');
const Hb7_invoice_master = require("../models/invoice_master");
const Hb7_invoice_details = require("../models/invoice_details");
const Hb7_products = require("../models/product");
const Hb7_customers = require("../models/customers");
const Hb7_trans_master =  require("../models/trans_master");
const log = require("log-to-file");
const Hb7_units = require("../models/unit");
const Hb7_product_category = require("../models/product_category");
const Hb7_users = require("../models/users");
const Hb7_fy_string = require("../models/fy_string");





exports._sales_report_sales_to_specific_customer_transaction = async (req, res) => {

  try {


    console.log(req.body)

   
   
 const result = await Hb7_invoice_master.findAll({
    where: {
      createdAt : { [Op.between]:  [req.body.sdate  ,  req.body.edate]} ,
                     mode:  { [Op.or]: ['IN','SR']} ,
                     com_id :  req.body.com_id,
                     cus_id : req.body.cus_id,
                     cast : 1 , 
                     status :  { [Op.or]: [1,2]} 
                   }, include : [{ model: Hb7_trans_master }  ]    
            });


            res.send(result)

  
      } catch (error) {
console.log('err',error);
log(error,'error-log.log')        
res.json({"success":false,"err":error,"msg":"Errors on Entry"})      

}
};


exports._summary_sales_period_stock = async (req, res) => {

  try {
   
 const result = await Hb7_invoice_master.findAll({
    where: {
      invoice_date : { [Op.between]:  [req.body.sdate ,  req.body.edate]} ,
                     mode: "IN",
                     com_id :  req.body.com_id,
                     cast : 1 , fy_id : req.body.fy_id,
                     status :  { [Op.or]: [1,2]} 
                   }, include : [{ model: Hb7_invoice_details, include : [{ model : Hb7_products , include :  { model : Hb7_units }     }]}, { model: Hb7_customers }  ]    
            });


            res.send(result)

  
      } catch (error) {
console.log('err',error);
log(error,'error-log.log')        
res.json({"success":false,"err":error,"msg":"Errors on Entry"})      

}
};



exports._summary_sales_hsn_wise_stock = async (req, res) => {

  try {
   
 const result = await Hb7_invoice_master.findAll({
    where: {
      invoice_date : { [Op.between]:  [req.body.sdate ,  req.body.edate]} ,
                     mode: "IN",
                     com_id :  req.body.com_id,
                     cast : 1 ,
                     status :  { [Op.or]: [1,2]} 
                   }, include : [{ model: Hb7_invoice_details, include : [{ model : Hb7_products , include :  { model : Hb7_units }     }]}, { model: Hb7_customers }  ]    
            });


            res.send(result)

  
      } catch (error) {
console.log('err',error);
log(error,'error-log.log')        
res.json({"success":false,"err":error,"msg":"Errors on Entry"})      

}
};

exports._summary_sales_hsn_wise_stock_b2b = async (req, res) => {

  try {
   
 const result = await Hb7_invoice_master.findAll({
    where: {
      invoice_date : { [Op.between]:  [req.body.sdate ,  req.body.edate]} ,
                     mode: "IN",
                     com_id :  req.body.com_id,
                     cast : 1 ,
                     type :"B2B",
                     status :  { [Op.or]: [1,2]} 
                   }, include : [{ model: Hb7_invoice_details, include : [{ model : Hb7_products , include :  { model : Hb7_units }     }]}, { model: Hb7_customers }  ]    
            });


            res.send(result)

  
      } catch (error) {
console.log('err',error);
log(error,'error-log.log')        
res.json({"success":false,"err":error,"msg":"Errors on Entry"})      

}
};

exports._summary_sales_hsn_wise_stock_b2c = async (req, res) => {

  try {
   
 const result = await Hb7_invoice_master.findAll({
    where: {
      invoice_date : { [Op.between]:  [req.body.sdate ,  req.body.edate]} ,
                     mode: "IN",
                     type :"B2C",
                     com_id :  req.body.com_id,
                     cast : 1 ,
                     status :  { [Op.or]: [1,2]} 
                   }, include : [{ model: Hb7_invoice_details, include : [{ model : Hb7_products , include :  { model : Hb7_units }     }]}, { model: Hb7_customers }  ]    
            });


            res.send(result)

  
      } catch (error) {
console.log('err',error);
log(error,'error-log.log')        
res.json({"success":false,"err":error,"msg":"Errors on Entry"})      

}
};



exports._summary_sales_all_cash_daily = async (req, res) => {

  try {
         
         const all_invo = await Hb7_invoice_master.findAll({  where : { com_id : req.body.com_id , mode : 'IN' , status :  { [Op.or]: [1,2]} , cast : 1 ,
         invoice_date: { 
          [Op.eq]: req.body.sdate         
           }  } ,
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



      } catch (error) {
        console.log('err-log',error);
    log(error,'error-log.log')        
    res.json({"success":false,"err":error,"msg":"Errors on Entry"})      
    
    }
    };
    

exports._summary_sales_daily_stock = async (req, res) => {

  try {
   
 const result = await Hb7_invoice_master.findAll({
    where: {
      invoice_date: { 
                        [Op.eq]: req.body.sdate,
                       
                     },
                     mode: "IN",
                     com_id :  req.body.com_id,
                     cast : 1 ,
                     status :  { [Op.or]: [1,2]} 
                   }, include : [{ model: Hb7_invoice_details, include : [{ model : Hb7_products , include :  { model : Hb7_units }     }]}, { model: Hb7_customers }  ]    
            });


            res.send(result)

  
      } catch (error) {
console.log('err',error);
log(error,'error-log.log')        
res.json({"success":false,"err":error,"msg":"Errors on Entry"})      

}
};

exports._summary_gst_b2bs = async (req, res) => {

  try {
      const invo_b2bs = await Hb7_invoice_master.findAll({        
      where: {
        status :  { [Op.or]: [1,2]}   , com_id : req.body.com_id , mode : 'IN' , cast : 1 , type :   { [Op.or]: ['B2B','SEZ','IGST']} ,
         invoice_date : {[Op.between]:  [req.body.sdate ,
            req.body.edate]} 
           } , include : [{ model: Hb7_invoice_details, include : { model : Hb7_products }}, { model: Hb7_customers } ]     
    }) 
    res.send(invo_b2bs)
  
      } catch (error) {
console.log('err',error);
log(error,'error-log.log')        
res.json({"success":false,"err":error,"msg":"Errors on Entry"})      

}
};

exports._summary_gst_b2c_small = async (req, res) => {

  try {
      const invo_b2cs = await Hb7_invoice_master.findAll({        
      where: {
        status :  { [Op.or]: [1,2]}   , com_id : req.body.com_id , mode : 'IN' , cast : 1 , type : 'B2C' ,
         invoice_date : {[Op.between]:  [req.body.sdate ,
            req.body.edate]} 
           } , include : [{ model: Hb7_invoice_details, include : { model : Hb7_products }}, { model: Hb7_customers } ]     
    }) 
    res.send(invo_b2cs)
  
      } catch (error) {
console.log('err',error);
log(error,'error-log.log')        
res.json({"success":false,"err":error,"msg":"Errors on Entry"})      

}
};






exports._change_password = async (req, res,next) => {

  try{
        
        const user = await Hb7_users.findByPk(req.body.user_id)
        if(user)
        {
          if(user.user_password == req.body.old_pass)
          {
            const user_u = await user.update({
                                               user_password : req.body.new_pass_1
                                            })
                                            res.json({"success":true,"msg":"Updation Completed"}) 
          }
          else
          {
            res.json({"success":false,"msg":"Old password mismatch"}) 
          }
        }
        else
        {
          res.json({"success":false,"msg":"No user found on the system"}) 
        }
       
    }
  catch (error) {
    console.log('err-log',error);
    log(error,'error-log.log')        
    res.json({"success":false,"err":error,"msg":"Errors on Entry"})     
    
    }

} 




exports._add_new_single_payment = async (req, res,next) => {

  try{  

     const invo_rec = await Hb7_trans_master.max('serial_no', {where: { com_id :  req.body.com_id , type : { [Op.eq]:'DEBIT'}}});
     
    if(isNaN(invo_rec))
   {
     res.json({"success":false,"msg":"Errors on Data"})  
    }
    else{
         const master = await Hb7_trans_master.create({
                                                            master_id : req.body.master_id,
                                                            com_id :  req.body.com_id,
                                                            serial_no : invo_rec + 1,
                                                            is_bulk_pay : req.body.is_bulk_pay,
                                                            cast : 'PUR',
                                                            type : req.body.type,
                                                            mode : req.body.mode,
                                                            status : req.body.status,
                                                            date : req.body.date,
                                                            amount : req.body.amt,
                                                            ref_no : req.body.ref_no,
                                                })
                                                if(master instanceof Hb7_trans_master)
                                                                                                 {
                                                                                                  res.json({"success":true,"msg":"Updation Completed"}) 
                                                                                                 }
                                                                                                 else
                                                                                                 {
                                                                                                   res.json({"success":false,"msg":"Entry creation Failed"})  
                                                                                                 }
                                                res.json({"success":true,"msg":"Updation Completed"}) 
       }
     }
  catch (error) {
    console.log('err-log',error);
    log(error,'error-log.log')        
    res.json({"success":false,"err":error,"msg":"Errors on Entry"})     
    
    }

} 


exports._add_new_fy = async (req, res,next) => {
  try{
    console.log(req.body)
    const exti = await Hb7_fy_string.findOne({ where : {fy : req.body.fy, fy_string : req.body.fy_string , com_id : req.body.com_id }})
    if(exti)
    {
      res.json({"success":false,"msg":"Duplicate Entry Found"}) 
    }
    else{
      const extic = await Hb7_fy_string.create({
        com_id : req.body.com_id,
        fy :  req.body.fy, 
        fy_string : req.body.fy_string,
        is_default : false
      })

      res.json({"success":true,"msg":"Entry added"})   
    }
   
  }
  catch (error) {
    console.log('err-log',error);
    log(error,'error-log.log')        
    res.json({"success":false,"err":error,"msg":"Errors on Entry"})      
    }

} 


 exports._add_product = async (req, res,next) => {
  try{
    
    const epro = await  Hb7_products.findOne({where : {  bar_code : req.body.bar_code , com_id : req.body.com_id }})
    if(epro == null)
    {
      const epro_name = await  Hb7_products.findOne({where : {  product_name : req.body.product_name }})
      if(epro_name == null)
      {
        const epro_new = await  Hb7_products.create(req.body)
        if(epro_new instanceof Hb7_products)
        {
          res.json({ success: true , msg : 'Product Added to list' }) 
        }
        else
        {
          res.json({ success: false , msg : 'Product Addition Failed Restart app...' });
        }
         
      }
      else
      {
        res.json({ success: false , msg : 'Product Name Already Existing' });
      }
    } 
    else
    {
      res.json({ success: false , msg : 'Bar code Already Existing' });
    }
    }
    catch (error) {
      console.log('err-log',error);
      log(error,'error-log.log')        
      res.json({"success":false,"err":error,"msg":"Errors on Entry"})      
      }
  
  } 



exports._add_customer = async (req, res,next) => {
  try{
    
   const exsting = await Hb7_customers.findOne({where : { name : req.body.name , ph : req.body.ph   }})
   if(exsting)
    {
      res.json({ success: false , msg : 'Name Already Existing' });
    }
    else
    { 
      const ex_new = await Hb7_customers.create(req.body)
        if(ex_new != null) {
          res.json({ "success" : true , "msg" : 'Customer Added to list' })  } 
          else { 
            res.json({ "success" : false ,"msg": "Wrong or missing Input field " })
               }

    }

  }
  catch (error) {
    console.log('err-log',error);
    log(error,'error-log.log')        
    res.json({"success":false,"err":error,"msg":"Errors on Entry"})     
    
    }

} 

exports._add_new_single_reciept = async (req, res,next) => {

  try{
   
    const invo_rec = await Hb7_trans_master.max('serial_no', {where: { com_id :  req.body.com_id , type : { [Op.eq]:'CREDIT'}}});
   if(isNaN(invo_rec))
   {
     res.json({"success":false,"msg":"Errors on Data"})  
   }
   else{
    const master = await Hb7_trans_master.create({
                                                   master_id : req.body.master_id,
                                                   com_id :  req.body.com_id,
                                                   serial_no : invo_rec + 1,
                                                   is_bulk_pay : req.body.is_bulk_pay,
                                                   cast : req.body.cast,
                                                   type : req.body.type,
                                                   mode : req.body.mode,
                                                   status : req.body.status,
                                                   date : req.body.date,
                                                   amount : req.body.amt,
                                                   ref_no : req.body.ref_no,
                                                })
                                                if(master instanceof Hb7_trans_master)
                                                {
                                                  res.json({"success":true,"msg":"Updation Completed"}) 
                                                }
                                                else
                                                {
                                                  res.json({"success":false,"msg":"Entry creation Failed"})  
                                                }
                                               
             }
  }
  catch (error) {
    console.log('err-log',error);
    log(error,'error-log.log')        
    res.json({"success":false,"err":error,"msg":"Errors on Entry"})     
    
    }

} 




  
exports._update_purchase_taxed = async (req, res,next) => {

  try{
   
    const user = await Hb7_users.findByPk(req.body.head.user_id)
    if(user.user_role == 'Admin')
        {
          const master = await Hb7_invoice_master.findByPk(req.body.head.idx)
          if(master != null)
          {
            master.update({ 
              status : 2,
              round_off : req.body.head.round_off,
              invoice_no_pur : req.body.head.invoice_no_pur,
              lpo_no : req.body.head.lpo_no,
              pos : req.body.head.pos,
              mode_of_supply : req.body.head.mode_of_supply,
              bundles :  req.body.head.bundles,
              grand_amt : req.body.head.grand_amt

            })
            res.json({"success":true,"msg":"Updation Completed"}) 
          }
        }
        else
        {
          res.json({"success":false,"msg":"Only Admin has the permission"}) 
        }
    
  }
  catch (error) {
    console.log('err-log',error);
    log(error,'error-log.log')        
    res.json({"success":false,"err":error,"msg":"Errors on Entry"})     
    
    }

} 



exports._delete_item_from_purchase = async (req, res,next) => {

  try{
    
       if(req.body.user == 'Admin')
        {
         const item = await Hb7_invoice_details.findOne({ where : {id : req.body.idx }})
         var mas_id = item.master_id;
         var index_no = item.index_no; 

         const find2 = await Hb7_invoice_details.findAll({ where : { master_id : mas_id , index_no : {[Op.gt]: index_no }  }}) 
         if(find2)
         {
           
           find2.forEach(async element => {  
                                              const compan_dets = await  element.update({ index_no : element.index_no - 1 })
                                           })


                                           const item_d = await item.destroy()
                                           if(item_d)
                                           {
                                            res.json({"success":true,"msg":"item Removed...."});
                                           }

          }


        
        }
        else
        {
          res.json({"success":false,"msg":"Only Admin user can delete the item..."})  
        }
     }
  catch (error) {
    console.log('err-log',error);
    log(error,'error-log.log')        
    res.json({"success":false,"err":error,"msg":"Errors on Entry"})     
    
    }

}


exports._sales_report_common_ = async (req, res,next) => {

  try{  
          const resu  = await  Hb7_invoice_details.findAll({    include : [{ model:  Hb7_invoice_master , 
            
         include : [{model: Hb7_customers}]  , attributes : ['fy_id']    , where : {  

              status :  { [Op.or]: [1,2]}   , com_id : req.body.com_id , mode : 'IN' , cast : 1 , 
   invoice_date : {[Op.between]:  [req.body.from_date ,
    req.body.to_date]}

               } , required : true   } , { model : Hb7_products , include : [{model : Hb7_units }, {model: Hb7_product_category}] }]     })

               res.json({"success":true,"data":resu,"msg":"ok"})     

    }
    catch (error) {
      console.log('err-log',error);
      log(error,'error-log.log')        
      res.json({"success":false,"err":error,"msg":"Errors on Entry"})     
      
      }

}



exports._gst_report_hsn_ = async (req, res,next) => {

  try{
  
     const idx = await Hb7_invoice_master.findAll({ where :{  status :  { [Op.or]: [1,2]}   , com_id : req.body.com_id , mode : 'IN' , cast : 1 , 
   invoice_date : {[Op.between]:  [req.body.myDate_from.singleDate.jsDate ,
    req.body.myDate_to.singleDate.jsDate]} } , attributes : ['invoice_no'] ,
      
         include : [{ model:  Hb7_invoice_details ,   attributes : ['qty','rate','mrp'], raw: true,
           include: [{ model: Hb7_products    ,        
           
            attributes: ['hsn_code','product_name','tax_rate'],         
          
           }] , 

         

         }]
          
          
          })  

   

     res.json({"success":true,"data":idx}) 
  }
  catch(error) { 
    console.log('err-log',error);
    res.json({"success":false,"data":null}) 
}                     
}


exports._delete_a_reciept_from_invoice = async (req, res) => {

  
  try { 
        if(req.body.role != 'Admin')
        {
          res.json({"success":false,"msg":"No permission for this user"})
        }
        else
        {
          const sdel = await Hb7_trans_master.destroy({ where : {id : req.body.id }})
          res.json({"success":true,"msg":"Reciept Removed...."})
        }
      } catch (error) {
        console.log('err-log',error);
      log(error,'error-log.log')        
      res.json({"success":false,"err":error,"msg":"Errors on Entry"})     
      
      }

}

exports._update_item_on_purchase_update_model_close = async (req, res) => { 
  try { 
       const lis_idx = await Hb7_invoice_details.findByPk(req.body.idx);
                if (lis_idx === null) {
                                         res.json({"success":false,"msg":"Entry not Found"})    
                                       }
                else
                { 
                  
                  const lis_idx_u = await lis_idx.update({
                                                             rate : req.body.rate,
                                                             qty :  req.body.qty,
                                                             tax : req.body.tax_rate  
                                                         })
                   if(lis_idx_u != null)
                   {
                    res.json({"success":true,"msg":"Entry Updated"})  
                   }
                   else
                   {
                    res.json({"success":false,"msg":"Entry not Found"})  
                   }                                      

                   
                } 
      }
      catch (error) {
        console.log('err-log',error);
        log(error,'error-log.log')        
        res.json({"success":false,"err":error,"msg":"Errors on Entry"})     
        
        }
  
  }


exports._add_new_item_to_purchase = async (req, res) => {

 
  try { 
       const find = await Hb7_invoice_details.findOne({ where : { master_id : req.body.master_id , product_id : req.body.product_id  }}) 
       if(find)
       {
        res.json({"success":false,"err":"duplicate item","msg":"item found on "+find.index_no+" position"})  
       }
       else
       {
        const cret = await  Hb7_invoice_details.create({
          master_id : req.body.master_id,
          product_id : req.body.product_id,
          index_no : req.body.index_no,
          tax : req.body.tax_rate,
          rate :  req.body.rate,
          qty :  req.body.qty

                                                        })
                                                        if(cret != null)
                                                        {
                                                               
                                                              res.json({"success":true,"msg":"item added on "+cret.index_no+" position","id":cret.id})  
                                                        }
                                                        else
                                                        {
                                                          res.json({"success":false,"msg":"Errors on Entry"})    
                                                        }
       }

      }

      catch (error) {
        console.log('err-log',error);
        log(error,'error-log.log')        
        res.json({"success":false,"err":error,"msg":"Errors on Entry"})      
        
        }

}


exports._post_debit_note_taxed_edited = async (req, res) => {


  try {
        const mes = await Hb7_invoice_master.findOne({ where : { id : req.body.head.idx  } })
   
      if(mes)
      {
      const mes_u = await mes.update({
                                       ref_invoice_date : req.body.head.ref_invoice_date,
                                       ref_invoice_number : req.body.head.ref_invoice_number 
                                     })

                                     res.json({"success":true,"msg":"updated"})

      }

      else
      {
        res.json({"success":false,"msg":"id not found"})
      }


      } catch (error) {
        console.log('err-log',error);
  log(error,'error-log.log')        
  res.json({"success":false,"err":error,"msg":"Errors on Entry"})   
  }
  };






exports._post_pur_ret = async (req, res) => {

 
    try {
        const result = await Seque.transaction(async (t) => {

             if(  req.body.head.default_invo_number_type == 1)
             {
                       const invo = await Hb7_invoice_master.max('invoice_no', {where: { com_id :  req.body.head.com_id , fy_id : req.body.head.fy_id, mode : { [Op.eq]:'PUR_RET' } , 
                           type : req.body.head.type , cast : req.body.head.cast }})
                          if(isNaN(invo))
                                    {
                                      req.body.head.invoice_no  = 1
                                    }
                                      else
                                      {
                                        req.body.head.invoice_no = invo + 1
                                      }    
             }

             if(  req.body.head.default_invo_number_type == 2)
             {

               if(req.body.head.type == 'B2C')
               {
               
                const invo = await Hb7_invoice_master.max('invoice_no', {where: { com_id :  req.body.head.com_id , fy_id : req.body.head.fy_id, mode : { [Op.eq]:'PUR_RET' } , 
                 cast : req.body.head.cast , type : 'B2C'  }})
                
                if(isNaN(invo))
                {
                  req.body.head.invoice_no  = 1
                }
                else
                {
                  req.body.head.invoice_no = invo + 1
                }
               }
               else {
               
              const invo = await Hb7_invoice_master.max('invoice_no', {where: { com_id :  req.body.head.com_id , fy_id : req.body.head.fy_id, mode : { [Op.eq]:'PUR_RET' } , 
                     cast : req.body.head.cast , type : { [Op.ne]:'B2C' }  }})
                    
                    if(isNaN(invo))
                    {
                      req.body.head.invoice_no  = 1
                    }
                    else
                    {
                      req.body.head.invoice_no = invo + 1
                    }
                  }

             }

     
   
      
          const user = await Hb7_invoice_master.create(req.body.head, { transaction: t });          
          
          for(var i=0;i<req.body.items.length;i++)
            {                
              req.body.items[i].master_id = user.id 
            }
          await Hb7_invoice_details.bulkCreate(req.body.items, { transaction: t });      
          return user;      
        });
      
       res.json({"success":true,"mas_id": result.invoice_no })
      
      } catch (error) {
        console.log('err-log',error);
        log(error,'error-log.log')        
        res.json({"success":false,"err":error})      
      
      }
       
  };

  exports._post_sales_return_taxed = async (req, res) => {
 
    try {
        const result = await Seque.transaction(async (t) => {

           

               if(req.body.head.type == 'B2C')
               {                
                const invo = await Hb7_invoice_master.max('invoice_no', {where: { com_id :  req.body.head.com_id ,fy_id : req.body.head.fy_id, mode : { [Op.eq]:'SR' } , 
                 cast : req.body.head.cast , type : 'B2C'  }})
               
                if(isNaN(invo))
                {
                  req.body.head.invoice_no  = 1
                }
                else
                {
                  req.body.head.invoice_no = invo + 1
                }
               }
               else {
               
              const invo = await Hb7_invoice_master.max('invoice_no', {where: { com_id :  req.body.head.com_id , fy_id : req.body.head.fy_id, mode : { [Op.eq]:'SR' } , 
                     cast : req.body.head.cast , type : { [Op.ne]:'B2C' }  }})
                    
                    if(isNaN(invo))
                    {
                      req.body.head.invoice_no  = 1
                    }
                    else
                    {
                      req.body.head.invoice_no = invo + 1
                    }
                  }

          

     
   
      
          const master = await Hb7_invoice_master.create(req.body.head, { transaction: t });          
          
          for(var i=0;i<req.body.items.length;i++)
            {                
              req.body.items[i].master_id = master.id 
            }
            const slave = await Hb7_invoice_details.bulkCreate(req.body.items, { transaction: t });    
           
           if(slave != null)
           {
           
            
            const serial_no = await Hb7_trans_master.max('serial_no', {where: { com_id :  req.body.head.com_id , type : { [Op.eq]:'DEBIT' }  }})
            if(isNaN(serial_no))
            {
              var serial_no_e  = 1
            }
            else
            {
              var serial_no_e  = serial_no + 1
            }
          
            const tr_master = await Hb7_trans_master.create({
              master_id : master.id,
              is_bulk_pay : false,
              cast : 'SALE_RET',
              type : 'DEBIT',
              mode : 'CASH',
              status : 0,
              serial_no : serial_no_e,
              date :  Seque.fn('NOW'),
              amount : req.body.head.paid_amt,
              ref_no : null,
              com_id : req.body.head.com_id
           }, { transaction: t })
           }
           else
           {
            
           }

            

          return master;      
        });
      
       res.json({"success":true,"mas_id": result.invoice_no })
      
      } catch (error) {
        console.log('err-log',error);
        log(error,'error-log.log')        
        res.json({"success":false,"err":error})      
      
      }
       
  };




exports._post_invo_taxed = async (req, res) => {
 
    try {
        const result = await Seque.transaction(async (t) => {

             if(  req.body.head.default_invo_number_type == 1)
             {
                       const invo = await Hb7_invoice_master.max('invoice_no', {where: { com_id :  req.body.head.com_id , fy_id : req.body.head.fy_id, mode : { [Op.eq]:'IN' } , 
                           type : req.body.head.type , cast : req.body.head.cast }})
                          if(isNaN(invo))
                                    {
                                      req.body.head.invoice_no  = 1
                                    }
                                      else
                                      {
                                        req.body.head.invoice_no = invo + 1
                                      }    
             }

             if(  req.body.head.default_invo_number_type == 2)
             {

               if(req.body.head.type == 'B2C')
               {
                
                const invo = await Hb7_invoice_master.max('invoice_no', {where: { com_id :  req.body.head.com_id , fy_id : req.body.head.fy_id, mode : { [Op.eq]:'IN' } , 
                 cast : req.body.head.cast , type : 'B2C'  }})
               
                if(isNaN(invo))
                {
                  req.body.head.invoice_no  = 1
                }
                else
                {
                  req.body.head.invoice_no = invo + 1
                }
               }
               else {
               
              const invo = await Hb7_invoice_master.max('invoice_no', {where: { com_id :  req.body.head.com_id , fy_id : req.body.head.fy_id, mode : { [Op.eq]:'IN' } , 
                     cast : req.body.head.cast , type : { [Op.ne]:'B2C' }  }})
                    
                    if(isNaN(invo))
                    {
                      req.body.head.invoice_no  = 1
                    }
                    else
                    {
                      req.body.head.invoice_no = invo + 1
                    }
                  }

             }

     
   
      
          const master = await Hb7_invoice_master.create(req.body.head, { transaction: t });          
          
          for(var i=0;i<req.body.items.length;i++)
            {                
              req.body.items[i].master_id = master.id 
            }
            const slave = await Hb7_invoice_details.bulkCreate(req.body.items, { transaction: t });    
           
           if(slave != null)
           {
           
            
            const serial_no = await Hb7_trans_master.max('serial_no', {where: { com_id :  req.body.head.com_id , type : { [Op.eq]:'CREDIT' }  }})
            if(isNaN(serial_no))
            {
              var serial_no_e  = 1
            }
            else
            {
              var serial_no_e  = serial_no + 1
            }
            if(req.body.head.grand_amt < req.body.head.recieved_amt)
            {
              var amt_cre =  req.body.head.grand_amt
            }
            else
            {
              var amt_cre = req.body.head.recieved_amt
            }

            const tr_master = await Hb7_trans_master.create({
              master_id : master.id,
              is_bulk_pay : false,
              cast : 'SALE',
              type : 'CREDIT',
              mode : 'CASH',
              status : 0,
              serial_no : serial_no_e,
              date :  Seque.fn('NOW'),
              amount : amt_cre,
              ref_no : null,
              com_id : req.body.head.com_id
           }, { transaction: t })
           }
           else
           {
            
           }

            

          return master;      
        });
      
       res.json({"success":true,"mas_id": result.invoice_no,"u_id": result.id })
      
      } catch (error) {
        console.log('err-log',error);
        log(error,'error-log.log')        
        res.json({"success":false,"err":error})      
      
      }
       
  };


  


  exports._update_invoice_taxed = async (req, res) => {

    try {

                    const pom = await  Hb7_invoice_master.findByPk(req.body.idx)
                              {
                                if(pom == null)
                                  { 
                                    res.json({"success":false,"msg": "failed" });
                                    return
                                  }
                                  else
                                  {
                                    const pom_u = await pom.update({
                                                                     pos : req.body.pos,
                                                                     lpo_no :  req.body.lpo_no,
                                                                     mode_of_supply : req.body.mode_of_supply,
                                                                     bundles :  req.body.bundles,
                                                                     status : 2
                                                                     })
                                  }

                              }

                        if(req.body.recieved_amt > 0)
                        {
                          const pos1 = await  Hb7_trans_master.create({  master_id : req.body.idx, is_bulk_pay : false, cast : 'SALE',
                                                                        type: 'CREDIT', mode : 'CASH',  status : 1, date : Seque.fn('NOW'),
                                                                        amount : req.body.recieved_amt   })

                          const pos2   =   await  Hb7_invoice_master.findOne({ where : { id : req.body.idx  } })
                          if(pos2 == null)
                          {   res.json({"success":false,"msg": "failed" })  } 
                          else
                          {
                             const pos2_u = await pos2.update({ due_amt : req.body.due_amt, status : 2, grand_amt : req.body.grand_amt,  discount_amt : req.body.discount_amt,
                              payable_amt : req.body.payable_amt, total_taxable : req.body.total_taxable, total_tax_amt : req.body.total_tax_amt    })
                              res.json({"success":true,"msg": "updated" })
                          }                                       
                                                                        

                        }  

                     else {     
                            const pow = await Hb7_invoice_master.findOne({ where : { id : req.body.idx  } })
   
                          if(pow == null)
                          { }
                          else { 
                                  const pow2 = await pow.update({  due_amt : req.body.due_amt, status : 2, grand_amt : req.body.grand_amt,
                                      discount_amt : req.body.discount_amt, payable_amt : req.body.payable_amt, total_taxable : req.body.total_taxable,
                                      total_tax_amt : req.body.total_tax_amt })
                                  if(pow2 == null)
                                  {
                                    res.json({"success":false,"msg": "failed" })                                    
                                  }
                                  else
                                  {
                                    res.json({"success":true,"msg": "updated" })
                                  }
      

                               }


                             }
        }
       catch (error) {
        console.log('err-log',error);
        log(error,'error-log.log')        
        res.json({"success":false,"err":error,"msg":"Errors on Entry"})      
      
      }       
  };

  exports._post_purchase = async (req, res) => {

       try {

      if(  req.body.head.cast == 4)
      {

        const invo = await Hb7_invoice_master.max('invoice_no', {where: { com_id :  req.body.head.com_id , fy_id : req.body.head.fy_id, mode : { [Op.eq]:'PUR' } , 
        cast : req.body.head.cast }})
       if(isNaN(invo))
                 {
                   req.body.head.invoice_no  = 1
                   req.body.head.type = 'B2C';
                 }
                   else
                   {
                     req.body.head.invoice_no = invo + 1
                     req.body.head.type = 'B2C';
                   } 
                   
                   const result = await Seque.transaction(async (t) => {       
      
                    const user = await Hb7_invoice_master.create(req.body.head, { transaction: t });          
                    
                    for(var i=0;i<req.body.items.length;i++)
                      {                
                        req.body.items[i].master_id = user.id 
                      }
                   const slave = await Hb7_invoice_details.bulkCreate(req.body.items, { transaction: t }); 
                   
                   if(slave != null)
                   {
                     
                          const serial_no = await Hb7_trans_master.max('serial_no', {where: { com_id :  req.body.head.com_id , type : { [Op.eq]:'DEBIT' }  }})
                          if(isNaN(serial_no))
                          {
                            var serial_no_e  = 1
                          }
                          else
                          {
                            var serial_no_e  = serial_no + 1
                          }
                          if(req.body.head.grand_amt < req.body.head.recieved_amt)
                          {
                            var amt_cre =  req.body.head.grand_amt
                          }
                          else
                          {
                            var amt_cre = req.body.head.recieved_amt
                          }

                          const tr_master = await Hb7_trans_master.create({
                            master_id : user.id,
                            is_bulk_pay : false,
                            cast : 'PUR',
                            type : 'DEBIT',
                            mode : 'CASH',
                            status : 0,
                            serial_no : serial_no_e,
                            date :  Seque.fn('NOW'),
                            amount : amt_cre,
                            ref_no : null,
                            com_id : req.body.head.com_id
                        }, { transaction: t })
                      }
                      else
                      {
                        
                      }

                    return user;      
                  });
                
                 res.json({"success":true,"mas_id": result.invoice_no,"msg":"Entry Saved" });   
                }

       else
       {
        const invo = await Hb7_invoice_master.max('invoice_no', {where: { com_id :  req.body.head.com_id , fy_id : req.body.head.fy_id, mode : { [Op.eq]:'PUR' } , 
        cast : { [Op.ne]: 4 } }})
       if(isNaN(invo))
                 {
                   req.body.head.invoice_no  = 1
                   req.body.head.type = 'B2B';
                 }
                   else
                   {
                     req.body.head.invoice_no = invo + 1
                     req.body.head.type = 'B2B';
                   }  


                   const result = await Seque.transaction(async (t) => {       
      
                    const user = await Hb7_invoice_master.create(req.body.head, { transaction: t });          
                    
                    for(var i=0;i<req.body.items.length;i++)
                      {                
                        req.body.items[i].master_id = user.id 
                      }
                   const slave = await Hb7_invoice_details.bulkCreate(req.body.items, { transaction: t }); 
                   if(slave != null)
                   {
                     
                    const serial_no = await Hb7_trans_master.max('serial_no', {where: { com_id :  req.body.head.com_id , type : { [Op.eq]:'DEBIT' }  }})
                    if(isNaN(serial_no))
                    {
                      var serial_no_e  = 1
                    }
                    else
                    {
                      var serial_no_e  = serial_no + 1
                    }
                    if(req.body.head.grand_amt < req.body.head.recieved_amt)
                    {
                      var amt_cre =  req.body.head.grand_amt
                    }
                    else
                    {
                      var amt_cre = req.body.head.recieved_amt
                    }

                    const tr_master = await Hb7_trans_master.create({
                      master_id : user.id,
                      is_bulk_pay : false,
                      cast : 'PUR',
                      type : 'DEBIT',
                      mode : 'CASH',
                      status : 0,
                      serial_no : serial_no_e,
                      date :  Seque.fn('NOW'),
                      amount : amt_cre,
                      ref_no : null,
                      com_id : req.body.head.com_id
                  }, { transaction: t })
                   }
                    
                   else
                   {
                    
                   } 
        
 
                    return user;      
                  });
                
                 res.json({"success":true,"mas_id": result.invoice_no,"msg":"Entry Saved" });

       }    
      
      } catch (error) {
        console.log('err-log',error);
        log(error,'error-log.log')        
        res.json({"success":false,"err":error,"msg":"Errors on Entry"})      
      
      }       
  };


