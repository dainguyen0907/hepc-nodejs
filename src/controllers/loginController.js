import userService from "../services/userService";
import jwtMiddleware from "../middleware/jwtMiddleware";
import bcrypt from "bcrypt";
require("dotenv").config();

const loadLoginPage=(req,res)=>{
    return res.render('login.ejs');
}

const login=async(req,res)=>{
    let email=req.body.user_email;
    let password=req.body.user_password;
    let resdata=await userService.findUserByEmail(email);
    if(resdata!=[])
    {
        let data={user_id:resdata.id,user_name:resdata.user_name,user_email:resdata.user_email};
        let jwt=jwtMiddleware.createJWT(data);
        console.log(">>JWT:"+jwt);
        return res.redirect(req.get('referer'));
    }
    else{
        console.log('Sai thông tin đăng nhập');
    }
}

module.exports={
    loadLoginPage,
    login,
}