const express = require("express");
const router = express.Router();


const get_path = require("../controls/get_path.js");
const post_path = require("../controls/post_path.js");

module.exports = function() {

 // router.get("/trans", get_path._trans);

    
    router.get("/backup", get_path._backup);

    router.get("/all_cus_vendors/:com_id", get_path._all_cus_vendors);
    router.get("/all_assets/:com_id", get_path._all_assets);
    router.get("/get_all_product_category/:com_id", get_path._get_all_product_category);
    router.get("/get_all_units", get_path._get_all_units);
    router.get("/get_company_details/:com_id", get_path._get_company_details);
    router.get("/get_all_invoices/:com_id/:fy_id", get_path._get_all_invoices);
    router.get("/get_all_perfoma_invoices/:com_id/:fy_id", get_path._get_all_perfoma_invoices);
    router.get("/get_all_purchase_returns/:com_id/:fy_id", get_path._get_all_purchase_returns);
    
    router.get("/get_all_purchases/:com_id/:fy_id", get_path._get_all_purchases);
    router.get("/get_a_invoice_detail/:id", get_path._get_a_invoice_detail);
    router.get("/get_all_trans_detail_of_a_invoice/:id", get_path._get_all_trans_detail_of_a_invoice);
    router.get("/get_all_trans_detail_of_a_purchase/:id", get_path._get_all_trans_detail_of_a_purchase);
    router.get("/change_invoice_date/:id/:date", get_path._change_invoice_date);
    router.get("/change_customer_of_invoice/:id/:cus_id/:type", get_path._change_customer_of_invoice);
    router.get("/change_vendor_of_purchase/:id/:cus_id/:type", get_path._change_vendor_of_purchase);
    router.get("/delete_item_from_invoice_list/:id/:master_id/:index_no", get_path._delete_item_from_invoice_list);    
    router.get("/get_logo/:file_name", get_path._get_logo);
    router.get("/get_stock_qty/:pro_id/:com_id", get_path._get_stock_qty);
    router.get("/get_stock_qty_report/:pro_id/:date/:com_id", get_path._get_stock_qty_report);
    router.get("/set_fy_as_default/:id/:com_id", get_path._set_fy_as_default);
    
    
    router.get("/get_all_tran_detail_of_a_invoice_incl_advance/:id", get_path._get_all_tran_detail_of_a_invoice_incl_advance); 
    router.get("/delete_product/:id", get_path._delete_product);

    router.get("/get_fy_list/:com_id", get_path._get_fy_list);
    
    
   
    
    
    
    
    router.post("/add_customer", post_path._add_customer);
    router.post("/post_invo_taxed", post_path._post_invo_taxed);  
    router.post("/post_debit_note_taxed", post_path._post_pur_ret);  
    router.post("/post_debit_note_taxed_edited", post_path._post_debit_note_taxed_edited);      
    router.post("/post_purchase", post_path._post_purchase);
    
    router.post("/update_item_on_purchase_update_model_close", post_path._update_item_on_purchase_update_model_close);
    router.post("/add_new_item_to_purchase", post_path._add_new_item_to_purchase);
    router.post("/update_invoice_taxed", post_path._update_invoice_taxed);
    router.post("/post_sales_return_taxed", post_path._post_sales_return_taxed);
    
    router.post("/delete_a_reciept_from_invoice", post_path._delete_a_reciept_from_invoice);
    router.post("/gst_report_hsn_", post_path._gst_report_hsn_);
    router.post("/sales_report_common_", post_path._sales_report_common_);
    router.post("/delete_item_from_purchase", post_path._delete_item_from_purchase);
    router.post("/update_purchase_taxed", post_path._update_purchase_taxed);
    router.post("/add_new_single_payment", post_path._add_new_single_payment);
    router.post("/add_new_single_reciept", post_path._add_new_single_reciept);    
    router.post("/change_password", post_path._change_password);
    router.post("/add_product", post_path._add_product);
    router.post("/add_new_fy", post_path._add_new_fy);
    
    
    
    router.post("/summary_gst_b2bs", post_path._summary_gst_b2bs);
    router.post("/summary_gst_b2c_small", post_path._summary_gst_b2c_small);
    router.post("/summary_sales_daily_stock", post_path._summary_sales_daily_stock);
    router.post("/summary_sales_all_cash_daily", post_path._summary_sales_all_cash_daily);
    router.post("/summary_sales_hsn_wise_stock", post_path._summary_sales_hsn_wise_stock);
    router.post("/summary_sales_hsn_wise_stock_b2b", post_path._summary_sales_hsn_wise_stock_b2b);
    router.post("/summary_sales_hsn_wise_stock_b2c", post_path._summary_sales_hsn_wise_stock_b2c);
    router.post("/summary_sales_period_stock", post_path._summary_sales_period_stock);
    router.post("/sales_report_sales_to_specific_customer_transaction", post_path._sales_report_sales_to_specific_customer_transaction);
    
    
    
  return router;
};