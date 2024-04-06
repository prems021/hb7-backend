

const express = require("express");
const post_router = express.Router();
const Sequelize = require("sequelize");
const log = require("log-to-file");
const sequelize  = require("../configs/dbcon");
const Op = Sequelize.Op;
const Cus_vendor_list = require("../models/customers");
const Hb7_product_category = require("../models/product_category");
const Hb7_units = require("../models/unit");
const Hb7_products = require("../models/product");

const Hb7_invoice_master = require("../models/invoice_master");
const Hb7_invoice_details = require("../models/invoice_details");
const Hb7_company_details = require("../models/company_details");
const Hb7_trans_master =  require("../models/trans_master");

var numberToText = require('number2text');
module.exports = function() {


  post_router.post('/get_figure', (request, response) => {
    // var words = toWords(request.body.number_to_convert);
    var defaultCurrency = numberToText(request.body.num_to_string, '', true);
    // var result = numbered.stringify(request.body.number_to_convert);
    return response.json({ success: true, msg: defaultCurrency });
});





   post_router.post("/update_product", (req, res) => {        
         Hb7_products.findOne({where : {  id : req.body.id }})
          .then(result => {
            if(result)
            {
              result.update(req.body,{ attributes: {exclude : ['id']} }).then(fr => res.json({ success: true , msg : 'Product Upated...' }) )
                .catch(error => console.log(error));
    }
    else
    {
      res.json({ success: false , msg : 'Product ID Not Found...' })
    }
  })

})

post_router.post("/update_company_details/:com_id", (req, res) => {
 
  Hb7_company_details.findOne({  where : { id : req.params.com_id }}).then(com_=>{
    if(com_)
    {
      com_.update(req.body).then(result=>{
        res.json({"success":true,"msg": "updated" })
      })
    }
  })
})


post_router.post("/update_invoice_taxed", (req, res) => {
 

  if(req.body.recieved_amt > 0)
  {

    Hb7_trans_master.create({
      master_id : req.body.idx,
      is_bulk_pay : false,
      cast : 'SALE',
      type: 'CREDIT',
      mode : 'CASH',
      status : 1,
      date : sequelize.fn('NOW'),
      amount : req.body.recieved_amt
  
    }).then(xy=>{

      if(xy)
      {
   
        Hb7_invoice_master.findOne({ where : { id : req.body.idx  } }).then(xyo=>{
   
          if(xyo)
          {
           xyo.update({
             due_amt : req.body.due_amt,
             status : 2,
             grand_amt : req.body.grand_amt,
             discount_amt : req.body.discount_amt,
             payable_amt : req.body.payable_amt,
             total_taxable : req.body.total_taxable,
             total_tax_amt : req.body.total_tax_amt
           }).then(ttt=>{
             if(ttt)
             {
               res.json({"success":true,"msg": "updated" })
             }
             else
             {
               res.json({"success":false,"msg": "failed" })
             }
            })

        }
        else {   res.json({"success":false,"msg": "failed" })  } })
      }
      else{
          res.json({"success":false,"msg": "failed" }) 
      } 
    })

  }
  else{

    
    Hb7_invoice_master.findOne({ where : { id : req.body.idx  } }).then(xyo=>{
   
      if(xyo)
      {
       xyo.update({
         due_amt : req.body.due_amt,
         status : 2,
         grand_amt : req.body.grand_amt,
         discount_amt : req.body.discount_amt,
         payable_amt : req.body.payable_amt,
         total_taxable : req.body.total_taxable,
         total_tax_amt : req.body.total_tax_amt
       }).then(ttt=>{
         if(ttt)
         {
           res.json({"success":true,"msg": "updated" })
         }
         else
         {
           res.json({"success":false,"msg": "failed" })
         }
        })

    }
    else {   res.json({"success":false,"msg": "failed" })  } })

  }

})
 
    





   post_router.post("/update_customer", (req, res) => {
  
    Cus_vendor_list.findOne({ where: {id : req.body.id }}).then(der =>{
      if(der)
       {
      der.update(req.body,{ attributes: {exclude : ['id']} }).then(userss => {
        res.json({"success":true,"msg":"Customer Data Updated"})
        }).catch(err => { 
    log(err,'error-log.log');
    res.json({"success":false,"msg":"Wrong Entry"+ err})
    })
        } 
        else
        {
          res.json({"success":false,"msg":"Wrong Entry"})
        }
  })
})



post_router.post("/add_product_category", (req, res) => {
 
    Hb7_product_category.findOne({where : { category_name : req.body.cat_name , com_id : req.body.com_id }})
    .then(result => {
      if(result)
      {
        res.json({ success: false , msg : 'Category Already Existing' });
      }
      else
      {
        try
        {
          Hb7_product_category.create({  category_name : req.body.cat_name, com_id : req.body.com_id  }).then(fr => res.json({ success: true , msg : 'Category Added to list' }) )
        }
        catch(err){
          console.log('err-log',error);
          log(err,'error-log.log')
        }
      }
    })
   });

   post_router.post("/add_unit", (req, res) => {
 
    Hb7_units.findOne({where : { unit : req.body.unit , com_id : req.body.com_id }})
   .then(result => {
     if(result)
     {
       res.json({ success: false , msg : 'Unit Already Existing' });
     }
     else
     {


      try{
        Hb7_units.create({ unit : req.body.unit,com_id : req.body.com_id }) 
        res.json({ success: true , msg : 'Unit Added to list'})
        }   
        catch(err){
          log(err,'error-log.log')
          res.json({"Error":err}) 
        }         
     }
   })

  });

  post_router.post("/update_item_from_invoice_list", (req, res) => {



    Hb7_invoice_details.findOne({where : { master_id : req.body.invo_master_id , index_no : req.body.index }}).then(item=>{
      if(item)
      {
        item.update({
          qty: req.body.qty,
          rate: req.body.rate,
          value: req.body.value,
          product_description : req.body.product_description
        }).then(result=>{
          if(result)
          {
            res.json({ success: true , msg : 'Item updated' }) 
          }
          else{
            res.json({ success: false , msg : 'Item not updated' }) 
          }
        })
      }
      else{
        res.json({ success: false , msg : 'Item not Found' }) 
      }
    })


  })

  post_router.post("/add_new_item_to_invoice", (req, res) => {

  

    Hb7_invoice_details.create(req.body).then(xy=>{
      if(xy)
      {
        res.json({ success: true , msg : 'Item added',idx:xy.id }) 
      }
      else
      {
        res.json({ success: false , msg : 'Item not added' }) 
      }
    }).catch(err=>{
      res.json({ success: false , msg : 'Item not added restart application',"err":err }) 
    })


  })



  

  



   return post_router;
};