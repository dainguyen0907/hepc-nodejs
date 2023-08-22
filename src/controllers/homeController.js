import userService from "../services/userService";
import baseController from "./baseController";
require('dotenv').config();

const loadIndexPage=(req,res)=>{
    let page="pages/home"
    return baseController.loadMasterPage(req,res,page);
}

module.exports={
    loadIndexPage,
};