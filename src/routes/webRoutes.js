import express from "express";
import loginController from "../controllers/loginController";
import userController from "../controllers/userController";
import manageAccountController from "../controllers/manageAccountController";
import homeController from "../controllers/homeController";
import jwt from "../middleware/jwtMiddleware";
import validator from "../validator/validateInfo";


const routes = express.Router();

/**
 * 
 * @param {*} app : express app
 * @returns 
 */
const initWebRoutes = (app) => {

    /**
     * Kiểm tra jwt
     */
    const authenization = (req, res, next) => {
        const token = req.cookies.jwt;
        if (!token) {
            req.flash('error', 'Hết hạn đăng nhập!');
            return res.redirect('/');
        }
        try {
            const data = jwt.verifyJWT(token);
            req.user_id = data.user_id;
            req.user_name = data.user_name;
            req.user_role = data.user_role;
            return next();
        } catch (e) {
            req.flash('error', 'Lỗi kiểm tra JWT!');
            return res.redirect('/');
        }
    };
    const adminAuthenization=(req,res,next)=>{
        if(req.user_role!=1){
            return res.redirect('/');
        }
        return next();
    }
    /**
     * Kiểm tra cho trang login
     */
    const authenizationForLogin = (req, res, next) => {
        const token = req.cookies.jwt;
        if (token) {
            return res.redirect('/home');
        }
        else {
            return next();
        }
    }
    /***
     * Đăng nhập và đăng xuất
     */
    routes.get('/logout', loginController.logout)
    routes.post('/login', loginController.login);
    routes.get('/', authenizationForLogin, loginController.loadLoginPage);
    /***
     * home page
     */
    routes.get('/home', authenization, homeController.loadIndexPage);
    /**
     * user managemet
     */
    routes.get('/info', authenization, userController.loadIndexPage);
    routes.post('/info/update', [authenization,validator.validatorUpdateAccount()], userController.updateUserInfor);
    routes.get('/change-password', authenization, userController.loadChangePasswordPage);
    routes.post('/change-password', [authenization,validator.validatorForChangePassword()], userController.changePassword);
    /***
     * Account management Page
     */
    routes.get('/account', [authenization,adminAuthenization], manageAccountController.loadIndexPage);
    routes.post('/account/delete', [authenization,adminAuthenization], manageAccountController.deleteUser);
    return app.use('/', routes);
}

export default initWebRoutes;