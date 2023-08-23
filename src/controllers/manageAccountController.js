import baseController from "./baseController";
import userService from "../services/userService";
import {checkAccountStatus} from "../middleware/accountStatusMiddleware";
require('dotenv').config();

const loadIndexPage=async(req,res)=>{
    let page="pages/account_index";
    let title="Quản lí tài khoản";
    let css=["https://cdn.datatables.net/v/bs5/dt-1.13.6/datatables.min.css"];
    let js=["https://cdn.datatables.net/v/bs5/jq-3.7.0/dt-1.13.6/datatables.min.js",'/js/initDatatable.js','/js/modal_initDelete.js'];
    let dataAccount=await userService.getAllAccount();
    let modalProperties={title:"Xóa tài khoản",objectName:"người dùng",formAction:"/account/delete"}
    let pageData=[dataAccount,null,modalProperties];
    return baseController.loadMasterPage(req,res,page,title,pageData,css,js);
}

const deleteUser=async(req,res)=>{
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
    if(id==1){
        req.flash('error',"Không thể xóa tài khoản này!");
        return res.redirect('/account');
    }
    let result=await userService.deleteUserById(id);
    if(result==true)
    {
        req.flash('success','Xóa tài khoản thành công');
        return res.redirect('/account');
    }else{
        req.flash('error',result);
        return res.redirect('/account');
    }
}

module.exports={
    loadIndexPage,
    deleteUser
};