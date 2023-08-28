import photoService from "../services/photoService";
import baseController from "./baseController";
import {checkAccountStatus} from "../middleware/accountStatusMiddleware";
import { validationResult } from "express-validator";

const loadIndexPage=async(req,res)=>{
    let dataphoto=await photoService.getAllPhoto();
    let page="pages/photo_index.ejs";
    let title="Quản lí hình ảnh";
    let modal={title:"Xóa hình ảnh",objectName:"hình ảnh",formAction:"photo/delete"}
    let pageData=[dataphoto,null,modal];
    let css=["https://cdn.datatables.net/v/bs5/dt-1.13.6/datatables.min.css"];
    let js=["https://cdn.datatables.net/v/bs5/jq-3.7.0/dt-1.13.6/datatables.min.js",'/js/initDatatable.js','/js/modal_init.js'];
    return baseController.loadMasterPage(req,res,page,title,pageData,css,js);
}

module.exports={
    loadIndexPage
}