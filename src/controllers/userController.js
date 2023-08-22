import baseController from "./baseController";
import userService from "../services/userService";
require('dotenv').config();

const loadIndexPage=async(req,res)=>{
    let page="pages/account_info";
    let user=await userService.findUserById(req.user_id);
    return baseController.loadMasterPage(req,res,page,user);
}

const updateUserInfor=async(req,res)=>{
    let dataUser={};
    dataUser.user_name=req.body.name_user;
    dataUser.user_address=req.body.address_user;
    dataUser.user_gender=req.body.gender_user;
    dataUser.user_dob=req.body.birthday_user;
    let Qres=await userService.updateUserInfor(req.user_id,dataUser);
    if(res)
    {
        req.flash('success','Cập nhật thành công');
        return res.redirect('/info');
    }else{
        req.flash('err',Qres);
        return res.redirect('/info');
    }
}

module.exports={
    loadIndexPage,
    updateUserInfor
};