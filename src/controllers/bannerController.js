import bannerService from "../services/bannerService";
import baseController from "./baseController";
import {checkAccountStatus} from "../middleware/accountStatusMiddleware";
import { validationResult } from "express-validator";

const loadIndexPage=async(req,res)=>{
    let databanner=await bannerService.getAllBanner();
    let page="pages/banner_index.ejs";
    let title="Quản lí banner quảng cáo";
    let modal={title:"Xóa banner",objectName:"banner",formAction:"banner/delete"}
    let pageData=[databanner,null,modal];
    let css=["https://cdn.datatables.net/v/bs5/dt-1.13.6/datatables.min.css"];
    let js=["https://cdn.datatables.net/v/bs5/jq-3.7.0/dt-1.13.6/datatables.min.js",'/js/initDatatable.js','/js/modal_init.js'];
    return baseController.loadMasterPage(req,res,page,title,pageData,css,js);
}

const createBanner=async(req,res)=>{
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
        return res.redirect("/banner");
    }
    let banner={id_user:req.user_id,banner_content:req.body.banner_content,banner_status:0};
    let Qres=await bannerService.createBanner(banner);
    if(Qres==true)
    {
        baseController.createHistoryRecord(req.user_id,req.user_name+" đã thêm một banner mới");
        req.flash('success',"Đăng tải banner thành công");
        return res.redirect("/banner");
    }else{
        req.flash('error',Qres);
        return res.redirect("/banner");
    }
}
const updateBanner=async(req,res)=>{
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
    let error= validationResult(req);
    if(!error.isEmpty())
    {
        req.flash('error',error.errors[0].msg);
        return res.redirect("/Banner");
    }
    let Banner={id_user:req.user_id,banner_content:req.body.banner_content,banner_status:req.body.banner_status};
    let Qres=await bannerService.updateBanner(id,Banner);
    if(Qres==true)
    {
        baseController.createHistoryRecord(req.user_id,"Banner có id="+id+" đã được cập nhật thông tin bởi "+req.user_name);
        req.flash('success',"Cập nhật Banner thành công");
        return res.redirect("/Banner");
    }else{
        req.flash('error',Qres);
        return res.redirect("/Banner");
    }
}
const deleteBanner=async(req,res)=>{
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
    let Qres=await bannerService.deleteBanner(id);
    if(Qres==true)
    {
        baseController.createHistoryRecord(req.user_id,"Banner có id="+id+" đã bị xóa bởi "+req.user_name);
        req.flash('success',"Xóa Banner thành công");
        return res.redirect("/banner");
    }else{
        req.flash('error',Qres);
        return res.redirect("/banner");
    }
}
module.exports={
    loadIndexPage,
    createBanner,
    updateBanner,
    deleteBanner
}