import baseController from "./baseController";
import userService from "../services/userService";
import departmentService from "../services/deparmentService";
import {checkAccountStatus} from "../middleware/accountStatusMiddleware";
import{validationResult} from "express-validator";
import bcrypt from "bcrypt";
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

const loadUserDetail = async(req,res)=>{
    let id_user=req.params.id;
    let user=await userService.findUserById(id_user);
    if(user==null)
    {
        return baseController.load404page(req,res);
    }
    let page="pages/user_info";
    let title="Thông tin tài khoản";
    let Departments= await departmentService.getAllDepartment();
    let pageData=[user,Departments,"editAccount","update"];
    return baseController.loadMasterPage(req,res,page,title,pageData);
}

const loadCreateUser = async(req,res)=>{
    let page="pages/user_info";
    let title="Tạo tài khoản";
    let Departments= await departmentService.getAllDepartment();
    let pageData=[{},Departments,"createAccount",""];
    return baseController.loadMasterPage(req,res,page,title,pageData);
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
const updateUser=async(req,res)=>{
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
    let dataUser={};
    dataUser.user_name=req.body.name_user;
    dataUser.user_address=req.body.address_user;
    dataUser.user_gender=req.body.gender_user;
    dataUser.user_dob=req.body.birthday_user;
    dataUser.user_status=req.body.status_user;
    dataUser.id_role=req.body.user_role;
    dataUser.id_department=req.body.user_department;

    let error=validationResult(req);
    if(!error.isEmpty())
    {
        req.flash('error',error.errors[0].msg);
        return res.redirect(req.get('referer'));
    }
    let Qres=await userService.updateUserInfor(req.body.user_id,dataUser);
    if(Qres==true)
    {
        req.flash('success','Cập nhật thành công');
        return res.redirect(req.get('referer'));
    }else{
        req.flash('error',Qres);
        return res.redirect(req.get('referer'));
    }

}
const createUser=async(req,res)=>{
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
    let user=await userService.findUserByEmail(req.body.email_user);
    if(user){
        req.flash('error','Email đã tồn tại');
        return res.redirect(req.get('referer'));
    };
    let dataUser={};
    dataUser.user_email=req.body.email_user;
    dataUser.user_name=req.body.name_user;
    dataUser.user_address=req.body.address_user;
    dataUser.user_gender=req.body.gender_user;
    dataUser.user_dob=req.body.birthday_user;
    dataUser.user_status=req.body.status_user;
    dataUser.id_role=req.body.user_role;
    dataUser.id_department=req.body.user_department;
    dataUser.user_password= await bcrypt.hashSync(req.body.user_password,parseInt(process.env.SALTROUND));

    let error=validationResult(req);
    if(!error.isEmpty())
    {
        req.flash('error',error.errors[0].msg);
        return res.redirect(req.get('referer'));
    }
    let Qres=await userService.createUser(dataUser);
    if(Qres==true)
    {
        req.flash('success','Thêm tài khoản thành công');
        return res.redirect('account');
    }else{
        req.flash('error',Qres);
        return res.redirect(req.get('referer'));
    }
}
const resetPassword=async(req,res)=>{
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

    let password={};
    password.new=req.body.new_password;
    password.re =req.body.re_password;
    if(password.new!=password.re)
    {
        req.flash('error',"Xác nhận mật khẩu không trùng khớp");
        return res.redirect("account");
    }

    let error=validationResult(req);
    if(!error.isEmpty())
    {
        req.flash('error',error.errors[0].msg);
        return res.redirect("account");
    }
    
    let Qres=await userService.resetPassword(req.body.id,password);
    if(Qres==true){
        req.flash('success',"Reset mật khẩu thành công");
        return res.redirect("account");
    }else 
    {
        req.flash('error',Qres);
        return res.redirect("account");
    }
}
module.exports={
    loadIndexPage,
    deleteUser,
    loadUserDetail,
    updateUser,
    loadCreateUser,
    createUser,
    resetPassword
};