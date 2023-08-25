import videoService from "../services/videoService";
import baseController from "./baseController";

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

module.exports={
    loadIndexPage
}