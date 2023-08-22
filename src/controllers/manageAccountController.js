import baseController from "./baseController";
require('dotenv').config();

const loadIndexPage=(req,res)=>{
    let page="pages/account_index";
    return baseController.loadMasterPage(req,res,page);
}

module.exports={
    loadIndexPage,
};