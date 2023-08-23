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
    if(resdata!=null)
    {
        if(resdata.user_status!=1)
            {
                req.flash('error','Tài khoản này đã bị khóa.'); 
                return res.redirect("/");
            }
        bcrypt.compare(password,resdata.user_password,function(err,result){
            if(result==true)
            {
                let data = { user_id: resdata.id, user_name: resdata.user_name, user_role: resdata.id_role, user_department:resdata.id_department };
                let jwt = jwtMiddleware.createJWT(data);
                res.cookie("jwt", jwt, { httpOnly: true, maxAge: 3600 * 1000 });
                return res.redirect("/home");
            }
            else
            {
                req.flash('error','Mật khẩu chưa chính xác!'); 
                return res.redirect("/");
            }
        });
    }
    else{
        req.flash('error','Không tìm thấy tài khoản!');
        console.log('Sai thông tin đăng nhập');
        return res.redirect("/");
    }
}
const logout=(req,res)=>{
    const token=req.cookies.jwt;
        if(token)
        {
            res.clearCookie('jwt');
        }
        return res.redirect('/');
}
module.exports={
    loadLoginPage,
    login,
    logout,
}