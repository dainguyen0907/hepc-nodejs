import photoService from "../services/photoService";
import departmentService from "../services/deparmentService";
import baseController from "./baseController";
import {checkAccountStatus} from "../middleware/accountStatusMiddleware";
import { validationResult } from "express-validator";

const loadIndexPage=async(req,res)=>{
    let dataphoto=await photoService.getAllPhoto();
    let department =await departmentService.getAllDepartment();
    let page="pages/photo_index.ejs";
    let title="Quản lí hình ảnh";
    let modal={title:"Xóa hình ảnh",objectName:"hình ảnh",formAction:"/photo/delete"};
    let type="admin";
    let pageData=[dataphoto,department,modal,type];
    let css=["https://cdn.datatables.net/v/bs5/dt-1.13.6/datatables.min.css"];
    let js=["https://cdn.datatables.net/v/bs5/jq-3.7.0/dt-1.13.6/datatables.min.js",'/js/initDatatable.js','/js/modal_init.js'];
    return baseController.loadMasterPage(req,res,page,title,pageData,css,js);
}
const loadUserPhotoPage=async(req,res)=>{
    let dataphoto=await photoService.getAllPhotoByUserId(req.user_id);
    let page="pages/photo_index.ejs";
    let title="Quản lí hình ảnh của tôi";
    let modal={title:"Xóa hình ảnh",objectName:"hình ảnh",formAction:"/user/photo/delete"};
    let type="user";
    let pageData=[dataphoto,null,modal,type];
    let css=["https://cdn.datatables.net/v/bs5/dt-1.13.6/datatables.min.css"];
    let js=["https://cdn.datatables.net/v/bs5/jq-3.7.0/dt-1.13.6/datatables.min.js",'/js/initDatatable.js','/js/modal_init.js'];
    return baseController.loadMasterPage(req,res,page,title,pageData,css,js);
}

const loadCensorPhotoPage=async(req,res)=>{
    let dataphoto=await photoService.getAllPhotoByDepartmentId(req.id_department);
    let page="pages/photo_index.ejs";
    let title="Quản lí hình ảnh của phòng ban";
    let modal={title:"Xóa hình ảnh",objectName:"hình ảnh",formAction:"/photo/delete"};
    let type="censor";
    let pageData=[dataphoto,null,modal,type];
    let css=["https://cdn.datatables.net/v/bs5/dt-1.13.6/datatables.min.css"];
    let js=["https://cdn.datatables.net/v/bs5/jq-3.7.0/dt-1.13.6/datatables.min.js",'/js/initDatatable.js','/js/modal_init.js'];
    return baseController.loadMasterPage(req,res,page,title,pageData,css,js);
}

const createPhoto=async(req,res)=>{
    let accountStatus=await checkAccountStatus(req,res);
    if(!accountStatus)
    {
        const token=req.cookies.jwt;
        if(token)
        {
            await res.clearCookie('jwt');
        }
        return res.redirect('/');
    }
    let error=validationResult(req);
    if(!error.isEmpty())
    {
        req.flash('error',error.errors[0].msg);
        return res.redirect('/user/photo');
    }
    let dataPhoto={
        id_user:req.user_id,
        id_department:req.id_department,
        photo_content:req.body.photo_content,
        photo_status:0,
        photo_censor:0,
    };
    let Qres=await photoService.createPhoto(dataPhoto);
    if(Qres==true)
    {
        baseController.createHistoryRecord(req.user_id,req.user_name+" đã đăng một ảnh mới");
        req.flash('success','Đăng ảnh thành công');
        return res.redirect('/user/photo'); 
    }else{
        req.flash('error',Qres);
        return res.redirect('/user/photo');
    }
}

const updatePhoto=async(req,res)=>{
    let accountStatus=await checkAccountStatus(req,res);
    if(!accountStatus)
    {
        const token=req.cookies.jwt;
        if(token)
        {
            await res.clearCookie('jwt');
        }
        return res.redirect('/');
    }
    let error=validationResult(req);
    if(!error.isEmpty())
    {
        req.flash('error',error.errors[0].msg);
        return res.redirect(req.get('refresh'));
    }
    let id=req.body.id;
    let dataPhoto={
        photo_content:req.body.photo_content,
        photo_status:req.body.photo_status,
        photo_censor:req.body.photo_censor,
    };
    if(req.body.photo_department)
    dataPhoto.id_department=req.body.photo_department;
    let Qres=await photoService.updatePhoto(id,dataPhoto);
    if(Qres==true)
    {
        baseController.createHistoryRecord(req.user_id,"Ảnh có id="+id+" đã được cập nhật thông tin bởi "+req.user_name);
        req.flash('success','Đăng ảnh thành công');
        return res.redirect(req.get('refresh')); 
    }else{
        req.flash('error',Qres);
        return res.redirect(req.get('refresh'));
    }
}

const deletePhotoByUser=async(req,res)=>{
    let accountStatus=await checkAccountStatus(req,res);
    if(!accountStatus)
    {
        const token=req.cookies.jwt;
        if(token)
        {
            await res.clearCookie('jwt');
        }
        return res.redirect('/');
    }
    let id=req.body.id;
    if(await photoService.checkCensorPhoto(id))
    {
        req.flash('error','Không thể xóa ảnh đã được duyệt');
        return res.redirect('/user/photo');
    }
    let Qres=await photoService.deletePhoto(id);
    if(Qres==true)
    {
        baseController.createHistoryRecord(req.user_id,"Hình ảnh có id="+id+" đã bị xóa bởi "+req.user_name);
        req.flash('success','Xóa ảnh thành công');
        return res.redirect('/user/photo'); 
    }else{
        req.flash('error',Qres);
        return res.redirect('/user/photo');
    }
}

const deletePhotoByCensor=async(req,res)=>{
    let accountStatus=await checkAccountStatus(req,res);
    if(!accountStatus)
    {
        const token=req.cookies.jwt;
        if(token)
        {
            await res.clearCookie('jwt');
        }
        return res.redirect('/');
    }
    let id=req.body.id;
    let Qres=await photoService.deletePhoto(id);
    if(Qres==true)
    {
        baseController.createHistoryRecord(req.user_id,"Hình ảnh có id="+id+" đã bị xóa bởi "+req.user_name);
        req.flash('success','Xóa ảnh thành công');
        return res.redirect('/photo'); 
    }else{
        req.flash('error',Qres);
        return res.redirect('/photo');
    }
}
module.exports={
    loadIndexPage,
    loadUserPhotoPage,
    loadCensorPhotoPage,
    createPhoto,
    updatePhoto,
    deletePhotoByUser,
    deletePhotoByCensor
}