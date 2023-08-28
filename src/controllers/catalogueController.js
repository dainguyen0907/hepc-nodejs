import CatalogueService from "../services/catalogueService";
import DeparmentService from "../services/deparmentService";
import baseController from "./baseController";
import {checkAccountStatus} from "../middleware/accountStatusMiddleware";
import { validationResult } from "express-validator";

const loadIndexPage=async(req,res)=>{
    let dataCatalogue=await CatalogueService.getAllCatalogue();
    let allDepartment=await DeparmentService.getAllDepartment();
    let page="pages/catalogue_index.ejs";
    let title="Quản lí chuyên mục";
    let modal={title:"Xóa chuyên mục",objectName:"chuyên mục",formAction:"catalogue/delete"}
    let pageData=[dataCatalogue,allDepartment,modal];
    let css=["https://cdn.datatables.net/v/bs5/dt-1.13.6/datatables.min.css"];
    let js=["https://cdn.datatables.net/v/bs5/jq-3.7.0/dt-1.13.6/datatables.min.js",'/js/initDatatable.js','/js/modal_init.js'];
    return baseController.loadMasterPage(req,res,page,title,pageData,css,js);
}

const createCatalogue=async(req,res)=>{
    let accountStatus=await checkAccountStatus(req,res);
    if(!accountStatus){
        const token=req.cookies.jwt;
        if(token)
        {
            await res.clearCookie('jwt');
        }
        return res.redirect('/');
    }
    let error= validationResult(req);
    if(!error.isEmpty())
    {
        req.flash('error',error.errors[0].msg);
        return res.redirect("/catalogue");
    }
    let catalogue={id_user:req.user_id,id_department:req.body.catalogue_department,catalogue_name:req.body.catalogue_name,
        catalogue_link:baseController.convertName(req.body.catalogue_name),catalogue_status:1};
    if(await CatalogueService.checkCatalogueName(null,catalogue.catalogue_name.trim())){
        req.flash('error',"Tên chuyên mục đã bị trùng");
        return res.redirect("/catalogue");
    }
    let Qres=await CatalogueService.createCatalogue(catalogue);
    if(Qres==true)
    {
        baseController.createHistoryRecord(req.user_id,req.user_name+" đã thêm một chuyên mục mới");
        req.flash('success',"Tạo chuyên mục thành công");
        return res.redirect("/catalogue");
    }else{
        req.flash('error',Qres);
        return res.redirect("/catalogue");
    }
}
const updateCatalogue=async(req,res)=>{
    let accountStatus=await checkAccountStatus(req,res);
    if(!accountStatus){
        const token=req.cookies.jwt;
        if(token)
        {
            await res.clearCookie('jwt');
        }
        return res.redirect('/');
    }
    let id=req.body.id;
    let catalogue={id_department:req.body.catalogue_department,catalogue_name:req.body.catalogue_name,
        catalogue_status:req.body.catalogue_status,catalogue_link:baseController.convertName(req.body.catalogue_name)};
    let error= validationResult(req);
    if(!error.isEmpty())
    {
        req.flash('error',error.errors[0].msg);
        return res.redirect("/catalogue");
    }
    if(await CatalogueService.checkCatalogueName(id,catalogue.catalogue_name.trim())){
        req.flash('error',"Tên chuyên mục đã bị trùng");
        return res.redirect("/catalogue");
    }
    let Qres=await CatalogueService.updateCatalogue(id,catalogue);
    if(Qres==true)
    {
        baseController.createHistoryRecord(req.user_id,"Chuyên mục có id="+id+" đã được cập nhật thông tin bởi "+req.user_name);
        req.flash('success',"Cập nhật chuyên mục thành công");
        return res.redirect("/catalogue");
    }else{
        req.flash('error',Qres);
        return res.redirect("/catalogue");
    }
}
const deleteCatalogue=async(req,res)=>{
    let accountStatus=await checkAccountStatus(req,res);
    if(!accountStatus){
        const token=req.cookies.jwt;
        if(token)
        {
            await res.clearCookie('jwt');
        }
        return res.redirect('/');
    }
    let id=req.body.id; 
    let Qres=await CatalogueService.deleteCatalogue(id);
    if(Qres==true)
    {
        baseController.createHistoryRecord(req.user_id,"Chuyên mục có id="+id+" đã bị xóa bởi "+req.user_name);
        req.flash('success',"Xóa chuyên mục thành công");
        return res.redirect("/catalogue");
    }else{
        req.flash('error',Qres);
        return res.redirect("/catalogue");
    }
}
module.exports={
    loadIndexPage,
    createCatalogue,
    updateCatalogue,
    deleteCatalogue,
}