import videoService from "../services/videoService";
import baseController from "./baseController";
import {checkAccountStatus} from "../middleware/accountStatusMiddleware";
import { validationResult } from "express-validator";

const loadIndexPage=async(req,res)=>{
    let datavideo=await videoService.getAllVideo();
    let page="pages/video_index.ejs";
    let title="Quản lí video quảng cáo";
    let modal={title:"Xóa video",formAction:"video/delete"}
    let pageData=[datavideo,null,modal];
    let css=["https://cdn.datatables.net/v/bs5/dt-1.13.6/datatables.min.css"];
    let js=["https://cdn.datatables.net/v/bs5/jq-3.7.0/dt-1.13.6/datatables.min.js",'/js/initDatatable.js','/js/modal_init.js'];
    return baseController.loadMasterPage(req,res,page,title,pageData,css,js);
}
const loadVideoDetailPage=async(req,res)=>{
    let datavideo=await videoService.findVideoById(req.params.id);
    if(datavideo==null)
    {
        return baseController.load404page(req,res);
    }
    let page="pages/video_detail.ejs";
    let title="Thông tin video";
    let pageData=[datavideo];
    let css=[];
    let js=[];
    return baseController.loadMasterPage(req,res,page,title,pageData,css,js);
}

const createVideo=async(req,res)=>{
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
        return res.redirect("/video");
    }
    let video={id_user:req.user_id,video_name:req.body.video_name,
        video_content:req.body.video_content,video_status:0};
    if(await videoService.checkVideoName(null,video.video_name)){
        req.flash('error',"Tên video đã bị trùng");
        return res.redirect("/video");
    }
    let Qres=await videoService.createVideo(video);
    if(Qres==true)
    {
        req.flash('success',"Đăng tải video thành công");
        return res.redirect("/video");
    }else{
        req.flash('error',Qres);
        return res.redirect("/video");
    }
}
const updateVideo=async(req,res)=>{
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
        return res.redirect("/video/"+id);
    }
    let video={id_user:req.user_id,video_name:req.body.video_name,
        video_content:req.body.video_content,video_status:req.body.video_status};
    if(await videoService.checkVideoName(id,video.video_name)){
        req.flash('error',"Tên video đã bị trùng");
        return res.redirect("/video/"+id);
    }
    let Qres=await videoService.updateVideo(id,video);
    if(Qres==true)
    {
        req.flash('success',"Cập nhật video thành công");
        return res.redirect("/video/"+id);
    }else{
        req.flash('error',Qres);
        return res.redirect("/video/"+id);
    }
}
const deleteVideo=async(req,res)=>{
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
    let Qres=await videoService.deleteVideo(id);
    if(Qres==true)
    {
        req.flash('success',"Xóa video thành công");
        return res.redirect("/video");
    }else{
        req.flash('error',Qres);
        return res.redirect("/video");
    }
}

module.exports={
    loadIndexPage,
    createVideo,
    updateVideo,
    loadVideoDetailPage,
    deleteVideo,
}