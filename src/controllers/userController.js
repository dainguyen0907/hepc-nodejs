import baseController from "./baseController";
import userService from "../services/userService";
import departmentService from "../services/deparmentService";
import { validationResult } from "express-validator";

require('dotenv').config();

const loadIndexPage=async(req,res)=>{
    let page="pages/user_info";
    let title="Cập nhật thông tin cá nhân";
    let user=await userService.findUserById(req.user_id);
    let Departments= await departmentService.getAllDepartment();
    return baseController.loadMasterPage(req,res,page,title,[user,Departments,"editUser","info/update"]);
}

const updateUserInfor=async(req,res)=>{
    
    let dataUser={};
    dataUser.user_name=req.body.name_user;
    dataUser.user_address=req.body.address_user;
    dataUser.user_gender=req.body.gender_user;
    dataUser.user_dob=req.body.birthday_user;

    let error=validationResult(req);
    if(!error.isEmpty())
    {
        req.flash('error',error.errors[0].msg);
        return res.redirect('/info');
    }
    let Qres=await userService.updateUserInfor(req.user_id,dataUser);
    if(Qres==true)
    {
        req.flash('success','Cập nhật thành công');
        return res.redirect('/info');
    }else{
        req.flash('error',Qres);
        return res.redirect('/info');
    }
}

const loadChangePasswordPage=(req,res)=>{
    let page="pages/user_changePassword";
    let title="Đổi mật khẩu";
    return baseController.loadMasterPage(req,res,page,title);
}

const changePassword=async(req,res)=>{
    let password={};
    password.old=req.body.old_password;
    password.new=req.body.new_password;
    password.re =req.body.re_password;

    let error=validationResult(req);
    if(!error.isEmpty())
    {
        req.flash('error',error.errors[0].msg);
        return res.redirect('/change-password');
    }

    if(password.re!=password.new)
    {
        req.flash('error',"Xác nhận mật khẩu chưa trùng khớp");
        return res.redirect('/change-password');
    }
    
    let Qres=await userService.changePassword(req.user_id,password);
    if(Qres==true){
        req.flash('success',"Cập nhật tài khoản thành công");
        return res.redirect('/change-password');
    }else 
    {
        req.flash('error',Qres);
        return res.redirect('/change-password');
    }
}
module.exports={
    loadIndexPage,
    updateUserInfor,
    loadChangePasswordPage,
    changePassword
};