import catalogueService from "../services/catalogueService";
import departmentService from "../services/deparmentService";
import articleService from "../services/articleService";
import baseController from "./baseController";
import { checkAccountStatus } from "../middleware/accountStatusMiddleware";
import { validationResult } from "express-validator";

const loadCreateArticlePage = async (req, res) => {
    let catalogue = await catalogueService.findCatalogueByDepartmentId(req.id_department);
    let page = "pages/article_create.ejs";
    let title = "Tạo bài viết mới";
    let type = "create";
    let modal = { formAction: "/article/add" };
    let pageData = [type, modal, title, catalogue];
    let css = [];
    let js = ["https://cdn.tiny.cloud/1/tb6w7nfpvwqfzg0v9y5bj3i8bx44pbm6u8n8zxfo938jj24u/tinymce/6/tinymce.min.js", '/js/initTinymce.js'];
    return baseController.loadMasterPage(req, res, page, title, pageData, css, js);
}

const loadIndexPage = async (req, res) => {
    let dataArticle = await articleService.getAllArticle();
    let department = await departmentService.getAllDepartment();
    let page = "pages/article_index.ejs";
    let title = "Quản lí bài viết";
    let type ="admin";
    let modal = { title: "Xóa bài viết", objectName: "bài viết", formAction: "/article/delete" }
    let pageData = [dataArticle, department, modal,type];
    let css = ["https://cdn.datatables.net/v/bs5/dt-1.13.6/datatables.min.css"];
    let js = ["https://cdn.datatables.net/v/bs5/jq-3.7.0/dt-1.13.6/datatables.min.js", '/js/initDatatable.js', '/js/modal_init.js','/js/ajax.js'];
    return baseController.loadMasterPage(req, res, page, title, pageData, css, js);
}

const loadArticlePageForCensor = async (req, res) => {
    let dataArticle = await articleService.getAllArticleByDeparmentId(req.id_department);
    let page = "pages/article_index.ejs";
    let title = "Quản lí bài viết";
    let type ="censor";
    let modal = { title: "Xóa bài viết", objectName: "bài viết", formAction: "/article/delete" }
    let pageData = [dataArticle, null, modal,type];
    let css = ["https://cdn.datatables.net/v/bs5/dt-1.13.6/datatables.min.css"];
    let js = ["https://cdn.datatables.net/v/bs5/jq-3.7.0/dt-1.13.6/datatables.min.js", '/js/initDatatable.js', '/js/modal_init.js'];
    return baseController.loadMasterPage(req, res, page, title, pageData, css, js);
}

const loadArticlePageForUncensor = async (req, res) => {
    let dataArticle = await articleService.getAllUncensorArticleByDeparmentId(req.id_department);
    let page = "pages/article_index.ejs";
    let title = "Quản lí bài viết";
    let type ="uncensor";
    let modal = { title: "Xóa bài viết", objectName: "bài viết", formAction: "/article/delete" }
    let pageData = [dataArticle, null, modal,type];
    let css = ["https://cdn.datatables.net/v/bs5/dt-1.13.6/datatables.min.css"];
    let js = ["https://cdn.datatables.net/v/bs5/jq-3.7.0/dt-1.13.6/datatables.min.js", '/js/initDatatable.js', '/js/modal_init.js'];
    return baseController.loadMasterPage(req, res, page, title, pageData, css, js);
}

const loadArticlePageForUser = async (req, res) => {
    let dataArticle = await articleService.getAllArticleByUserId(req.user_id);
    let page = "pages/article_index.ejs";
    let title = "Quản lí bài viết";
    let type ="user";
    let modal = { title: "Xóa bài viết", objectName: "bài viết", formAction: "/article/delete" }
    let pageData = [dataArticle, null, modal,type];
    let css = ["https://cdn.datatables.net/v/bs5/dt-1.13.6/datatables.min.css"];
    let js = ["https://cdn.datatables.net/v/bs5/jq-3.7.0/dt-1.13.6/datatables.min.js", '/js/initDatatable.js', '/js/modal_init.js'];
    return baseController.loadMasterPage(req, res, page, title, pageData, css, js);
}

const loadDetailArticlePage = async (req, res) => {
    let id = req.params.id;
    let dataArticle = await articleService.findArticleById(id);
    if (!dataArticle) return baseController.load404page(req, res);
    if (req.user_role != "1") {
        if (await articleService.checkArticleDepend(id, req.id_department, null)==false&& await articleService.checkArticleDepend(id,null,id.user_id)==false)
            return baseController.load404page(req, res);
    }
    let catalogue = await catalogueService.findCatalogueByDepartmentId(req.id_department);
    if (req.user_role == "1") {
        catalogue = await catalogueService.getAllCatalogue();
    }
    let page = "pages/article_create.ejs";
    let title = "Cập nhật bài viết mới";
    let type = "update";
    let modal = { formAction: "/article/update" };
    let pageData = [type, modal, title, catalogue, dataArticle];
    let css = [];
    let js = ["https://cdn.tiny.cloud/1/tb6w7nfpvwqfzg0v9y5bj3i8bx44pbm6u8n8zxfo938jj24u/tinymce/6/tinymce.min.js", '/js/initTinymce.js'];
    return baseController.loadMasterPage(req, res, page, title, pageData, css, js);
}

const createArticle = async (req, res) => {
    let accountStatus = await checkAccountStatus(req, res);
    if (!accountStatus) {
        const token = req.cookies.jwt;
        if (token) {
            await res.clearCookie('jwt');
        }
        return res.redirect('/');
    }
    let error = validationResult(req);
    if (!error.isEmpty()) {
        req.flash('error', error.errors[0].msg);
        return res.redirect("back");
    }
    let article_link = baseController.convertName(req.body.article_heading);
    let article = {
        id_catalogue: req.body.article_catalogue,
        id_user: req.user_id,
        article_link: article_link,
        article_heading: req.body.article_heading,
        article_summarize: req.body.article_summarize,
        article_content: req.body.article_content,
        article_view: 0,
        article_file: req.body.article_file,
        article_image: req.body.article_image,
        article_status: 0,
        article_censor: 0,
    }
    let Qres = await articleService.createArticle(article);
    if (Qres == true) {
        req.flash('success', "Đăng tải bài viết thành công");
        return res.redirect("back");
    } else {
        req.flash('error', Qres);
        return res.redirect("back");
    }
}

const censorArticle =async (req,res)=>{
    let accountStatus = await checkAccountStatus(req, res);
    if (!accountStatus) {
        const token = req.cookies.jwt;
        if (token) {
            await res.clearCookie('jwt');
        }
        return res.redirect('/');
    }
    let id = req.body.id;
    if (req.user_role == "2" && await articleService.checkArticleDepend(id, req.id_department, null)==false) {
        req.flash('error','Bài viết này không thuộc phòng ban của bạn');
        return res.redirect("back");
    }
    let article = {
        article_status: req.body.article_censor,
        article_censor: 1,
    }
    let Qres = await articleService.updateArticle(id,article);
    if (Qres == true) {
        req.flash('success', "Duyệt bài viết thành công");
        return res.redirect("back");
    } else {
        req.flash('error', Qres);
        return res.redirect("back");
    }

}

const updateArticle = async (req, res) => {
    let accountStatus = await checkAccountStatus(req, res);
    if (!accountStatus) {
        const token = req.cookies.jwt;
        if (token) {
            await res.clearCookie('jwt');
        }
        return res.redirect('/');
    }
    let error = validationResult(req);
    if (!error.isEmpty()) {
        req.flash('error', error.errors[0].msg);
        return res.redirect("back");
    }
    let id = req.body.id;
    if (req.user_role == "2" && await articleService.checkArticleDepend(id, req.id_department, null)==false) {
        req.flash('error','Bài viết này không thuộc phòng ban của bạn');
        return res.redirect("back");
    }
    if (req.user_role == "3" && await articleService.checkArticleDepend(id, null, req.user_id)==false) {
        req.flash('error','Bài viết này không phải của bạn');
        return res.redirect("back");
    }
    let article_link = baseController.convertName(req.body.article_heading.trim());
    let article = {
        id_catalogue: req.body.article_catalogue,
        article_link: article_link,
        article_heading: req.body.article_heading,
        article_summarize: req.body.article_summarize,
        article_content: req.body.article_content,
        article_view: req.body.article_view,
        article_file: req.body.article_file,
        article_image: req.body.article_image,
        article_status: 0,
        article_censor: 0,
    }
    let Qres = await articleService.updateArticle(id,article);
    if (Qres == true) {
        req.flash('success', "Cập nhật bài viết thành công");
        return res.redirect("back");
    } else {
        req.flash('error', Qres);
        return res.redirect("back");
    }
}

const deleteArticle=async(req,res)=>{
    let accountStatus = await checkAccountStatus(req, res);
    if (!accountStatus) {
        const token = req.cookies.jwt;
        if (token) {
            await res.clearCookie('jwt');
        }
        return res.redirect('/');
    }
    let id=req.body.id;
    if(req.user_role=="3"){
        if (await articleService.checkArticleDepend(id, null, req.user_id)==false) {
            req.flash('error','Bài viết này không phải của bạn');
            return res.redirect("back");
        }
        if(await articleService.checkArticleCensor()){
            req.flash('error','Không thể xóa bài viết đã duyệt');
            return res.redirect("back");
        }
    }
    if(req.user_role=="2"){
        if (await articleService.checkArticleDepend(id, req.id_department, null)==false) {
            req.flash('error','Bài viết này không thuộc phòng ban');
            return res.redirect("back");
        }
    }
    let Qres = await articleService.deleteArticle(id);
    if (Qres == true) {
        req.flash('success', "Xóa bài viết thành công");
        return res.redirect("back");
    } else {
        req.flash('error', Qres);
        return res.redirect("back");
    }

}

const getDataTableFromSelectedBox=async(req,res)=>{
    let id_department=req.body.department_id;
    let article= await articleService.findArticleByDepartmentId(id_department);
    let stringData="<thead class='table-primary'><tr><th>ID</th><th>Chuyên mục</th><th>Tựa đề</th><th>Tác giả</th><th>Lượt xem</th><th>Trạng thái</th><th>Tình trạng</th><th>Cập nhật lần cuối</th><tbody>";    
    article.forEach((a,index)=> {
        stringData+="<tr><td>"+a.id+"</td><td>"+a.catalogue.catalogue_name+"</td><td>"+a.article_heading+"</td><td>"+a.User.user_name+
        "</td><td>"+a.article_view+"</td>";
        if(a.article_status==1)
        {
            stringData+="<td class='text-success'>Đang sử dụng</td>";
        }else{
            stringData+="<td class='text-danger'>Vô hiệu hóa</td>";
        }
        if(a.article_censor==1)
        {
            stringData+="<td class='text-success'>Đã duyệt</td>";
        }else{
            stringData+="<td class='text-danger'>Chưa duyệt</td>";
        }
        stringData+="<td>"+a.updatedAt.getDate()+"/"+ a.updatedAt.getMonth()+"/"+ a.updatedAt.getFullYear()+" "+ 
        a.updatedAt.getHours()+":"+ a.updatedAt.getMinutes()+":"+ a.updatedAt.getSeconds()+"</td><td>"+
        `<a class='btn btn-success text-white mb-2' title='Cập nhật bài viết' onclick="window.open('/article/`+a.id+`','update','width=1000,height=500')"><i class='fas fa-edit'></i></a><a class='btn btn-danger text-white mb-2' title='Xóa bài viết' data-bs-toggle='modal' data-bs-target='#deleteModal'data-id='`+
        a.id+"'><i class='fas fa-trash'></i></a>";
        if(a.article_censor!=1)
        {
            stringData+="<a class='btn btn-primary text-white mb-2' title='Duyệt bài viết' data-bs-toggle='modal' data-bs-target='#censorArticleModal' data-id='"+a.id+"'><i class='fas fa-check'></i></a>";
        }
        stringData+="</td></tr>";
    });
    stringData+="</tbody>";
    return res.send({"strData":stringData});
}

module.exports = {
    loadCreateArticlePage,
    loadArticlePageForCensor,
    loadArticlePageForUncensor,
    loadArticlePageForUser,
    createArticle,
    loadIndexPage,
    loadDetailArticlePage,
    updateArticle,
    deleteArticle,
    censorArticle,
    getDataTableFromSelectedBox,
}