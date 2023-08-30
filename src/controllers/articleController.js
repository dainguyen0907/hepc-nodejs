import catalogueService from "../services/catalogueService";
import departmentService from "../services/deparmentService";
import articleService from "../services/articleService";
import baseController from "./baseController";
import {checkAccountStatus} from "../middleware/accountStatusMiddleware";
import { validationResult } from "express-validator";

const loadCreateArticlePage=async(req,res)=>{
    let catalogue=await catalogueService.findCatalogueByDepartmentId(req.id_department);
    let page="pages/article_create.ejs";
    let title="Tạo bài viết mới";
    let type="create";
    let modal={formAction:"/article/add"};
    let pageData=[type,modal,title,catalogue];
    let css=[];
    let js=["https://cdn.tiny.cloud/1/tb6w7nfpvwqfzg0v9y5bj3i8bx44pbm6u8n8zxfo938jj24u/tinymce/6/tinymce.min.js",'/js/initTinymce.js'];
    return baseController.loadMasterPage(req,res,page,title,pageData,css,js);
}

const loadIndexPage=async(req,res)=>{
    let dataArticle=await articleService.getAllArticle();
    let department=await departmentService.getAllDepartment();
    let page="pages/article_index.ejs";
    let title="Quản lí bài viết";
    let modal={title:"Xóa bài viết",objectName:"bài viết",formAction:"article/delete"}
    let pageData=[dataArticle,department,modal];
    let css=["https://cdn.datatables.net/v/bs5/dt-1.13.6/datatables.min.css"];
    let js=["https://cdn.datatables.net/v/bs5/jq-3.7.0/dt-1.13.6/datatables.min.js",'/js/initDatatable.js','/js/modal_init.js'];
    return baseController.loadMasterPage(req,res,page,title,pageData,css,js);
}

const loadDetailArticlePage=async(req,res)=>{
    let id=req.params.id;
    let dataArticle=await articleService.findArticleById(id);
    if(!dataArticle) return baseController.load404page(req,res);
    if(req.user_role!="1")
    {
        if(!articleService.checkArticleDepend(id,req.id_department)) 
            return baseController.load404page(req,res);
    }
    let catalogue=await catalogueService.findCatalogueByDepartmentId(req.id_department);
    if(req.user_role!="1")
    {
        catalogue=await catalogueService.getAllCatalogue();
    }
    let page="pages/article_create.ejs";
    let title="Cập nhật bài viết mới";
    let type="update";
    let modal={formAction:"/article/update"};
    let pageData=[type,modal,title,catalogue,dataArticle];
    let css=[];
    let js=["https://cdn.tiny.cloud/1/tb6w7nfpvwqfzg0v9y5bj3i8bx44pbm6u8n8zxfo938jj24u/tinymce/6/tinymce.min.js",'/js/initTinymce.js'];
    return baseController.loadMasterPage(req,res,page,title,pageData,css,js);
}

const createArticle=async(req,res)=>{
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
        return res.redirect("back");
    }
    let article_link=baseController.convertName(req.body.article_heading);
    let article={
        id_catalogue:req.body.article_catalogue,
        id_user:req.user_id,
        article_link:article_link,
        article_heading:req.body.article_heading,
        article_summarize:req.body.article_summarize,
        article_content:req.body.article_content,
        article_view:0,
        article_file:req.body.article_file,
        article_image:req.body.article_image,
        article_status:0,
        article_censor:0,
    }
    let Qres=await articleService.createArticle(article);
    if(Qres==true)
    {
        req.flash('success',"Đăng tải bài viết thành công");
        return res.redirect("back");
    }else{
        req.flash('error',Qres);
        return res.redirect("back");
    }
}

module.exports={
    loadCreateArticlePage,
    createArticle,
    loadIndexPage
}