import express from "express";
import loginController from "../controllers/loginController";
import manageAccountController from "../controllers/manageAccountController";
import jwt from "../middleware/jwtMiddleware";

const routes=express.Router();

/**
 * 
 * @param {*} app : express app
 * @returns 
 */
const initWebRoutes=(app)=>{

    /**
     * Kiểm tra jwt
     */
    const authenization=(req,res,next)=>{
        const token=req.cookies.jwt;
        if(!token)
        {
            req.flash('error','Không tìm thấy thông tin JWT!');
            return res.redirect('/login');
        }
        try{
            const data=jwt.verifyJWT(token);
            req.user_id=data.user_id;
            req.user_name=data.user_name;
            req.user_role=data.user_role;
            return next();
        }catch(e){
            req.flash('error','Phiên đăng nhập đã hết hạn!');
            return res.redirect('/login');
        }
    };
    /**
     * Kiểm tra cho trang login
     */
    const authenizationForLogin=(req,res,next)=>{
        const token=req.cookies.jwt;
        if(token)
        {
            return res.redirect('/abc');
        }
        else
        {
            return next();
        }
    }

    

    routes.get('/',authenizationForLogin,loginController.loadLoginPage);
    routes.post('/login',loginController.login);
    routes.get('/abc',authenization,manageAccountController.loadIndexPage);
    routes.get('/logout',loginController.logout)
    return app.use('/',routes);
}

export default initWebRoutes;