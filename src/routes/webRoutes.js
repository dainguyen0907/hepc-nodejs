import express from "express";
import loginController from "../controllers/loginController";
import userController from "../controllers/userController";
import manageAccountController from "../controllers/manageAccountController";
import homeController from "../controllers/homeController";
import historyController from "../controllers/historyController";
import jwt from "../middleware/jwtMiddleware";
import validator from "../validator/validateInfo";
import deparmentController from "../controllers/departmentController";
import videoController from "../controllers/videoController";


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
    routes.get('/account/:id', [authenization,adminAuthenization], manageAccountController.loadUserDetail);
    routes.get('/account-add', [authenization,adminAuthenization], manageAccountController.loadCreateUser);
    routes.post('/account-add', [authenization,adminAuthenization, validator.validatorCreateAccount()], manageAccountController.createUser);
    routes.post('/reset-password', [authenization,adminAuthenization, validator.validatorForResetPassword()], manageAccountController.resetPassword);
    routes.post('/account/update', [authenization,adminAuthenization,validator.validatorUpdateAccount()], manageAccountController.updateUser);
    routes.post('/account/delete', [authenization,adminAuthenization], manageAccountController.deleteUser);

    /***
     * History Page
     */
    routes.get('/history', [authenization,adminAuthenization], historyController.loadIndexPage);

    /***
     * Department management Page
     */
    routes.get('/department',[authenization,adminAuthenization], deparmentController.loadIndexPage);
    routes.post('/department/add',[authenization,adminAuthenization,validator.validatorForCreateDepartment()], deparmentController.createDepartment);
    routes.post('/department/update',[authenization,adminAuthenization,validator.validatorForCreateDepartment()], deparmentController.updateDepartment);
    routes.post('/department/delete',[authenization,adminAuthenization], deparmentController.deleteDepartment);

    /***
     * Video management Page
     */
    routes.get('/video',[authenization,adminAuthenization], videoController.loadIndexPage);
    routes.get('/video/:id',[authenization,adminAuthenization], videoController.loadVideoDetailPage);
    routes.post('/video/add',[authenization,adminAuthenization], videoController.createVideo);
    routes.post('/video/delete',[authenization,adminAuthenization], videoController.deleteVideo);
    routes.post('/video/update',[authenization,adminAuthenization], videoController.updateVideo);
    /***
     * Set 404 page
     */
    routes.get('*',function(req,res){
        res.render('404page.ejs');
    })
    return app.use('/', routes);
}

export default initWebRoutes;