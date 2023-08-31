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
import bannerController from "../controllers/bannerController";
import photoController from "../controllers/photoController";
import catalogueController from "../controllers/catalogueController";
import articleController from "../controllers/articleController";
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
            req.id_department = data.user_department;
            return next();
        } catch (e) {
            req.flash('error', e);
            return res.redirect('/');
        }
    };
    const adminAuthenization=(req,res,next)=>{
        if(req.user_role!=1){
            return res.redirect('/');
        }
        return next();
    }
    const censorAuthenization=(req,res,next)=>{
        if(req.user_role!=1&&req.user_role!=2){
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
    routes.post('/video/add',[authenization,adminAuthenization,validator.validatorForCreateVideo()], videoController.createVideo);
    routes.post('/video/delete',[authenization,adminAuthenization], videoController.deleteVideo);
    routes.post('/video/update',[authenization,adminAuthenization,validator.validatorForCreateVideo()], videoController.updateVideo);

     /***
     * Banner management Page
     */
     routes.get('/banner',[authenization,adminAuthenization], bannerController.loadIndexPage);
     routes.post('/banner/add',[authenization,adminAuthenization,validator.validatorForCreateBanner()], bannerController.createBanner);
     routes.post('/banner/delete',[authenization,adminAuthenization], bannerController.deleteBanner);
     routes.post('/banner/update',[authenization,adminAuthenization,validator.validatorForCreateBanner()], bannerController.updateBanner);

      /***
     * Photo management Page
     */
      routes.get('/photo',[authenization,adminAuthenization], photoController.loadIndexPage);
      routes.post('/photo/delete',[authenization,censorAuthenization], photoController.deletePhotoByCensor);
      routes.post('/photo/update',[authenization,censorAuthenization], photoController.updatePhoto);
      routes.get('/user/photo',[authenization], photoController.loadUserPhotoPage);
      routes.post('/user/photo/add',[authenization,validator.validatorForCreatePhoto()], photoController.createPhoto);
      routes.post('/user/photo/delete',[authenization], photoController.deletePhotoByUser);
      routes.get('/censor/photo',[authenization,censorAuthenization], photoController.loadCensorPhotoPage);
      routes.get('/uncensor/photo',[authenization], photoController.loadUncensorPhotoPage);
     /***
     * Catalogue management Page
     */
    routes.get('/catalogue',[authenization,adminAuthenization], catalogueController.loadIndexPage);
    routes.post('/catalogue/add',[authenization,adminAuthenization,validator.validatorForCreateCatalogue()], catalogueController.createCatalogue);
    routes.post('/catalogue/delete',[authenization,adminAuthenization], catalogueController.deleteCatalogue);
    routes.post('/catalogue/update',[authenization,adminAuthenization,validator.validatorForCreateCatalogue()], catalogueController.updateCatalogue);
     /***
     * Catalogue management Page
     */
     routes.get('/user/article/add',[authenization], articleController.loadCreateArticlePage);
     routes.post('/article/add',[authenization], articleController.createArticle);
     routes.get('/article',[authenization,adminAuthenization], articleController.loadIndexPage);
     routes.get('/censor/article',[authenization,censorAuthenization], articleController.loadArticlePageForCensor);
     routes.post('/article/censor',[authenization,censorAuthenization], articleController.censorArticle);
     routes.get('/uncensor/article',[authenization,censorAuthenization], articleController.loadArticlePageForUncensor);
     routes.get('/user/article',[authenization], articleController.loadArticlePageForUser);
     routes.get('/article/:id',[authenization], articleController.loadDetailArticlePage);
     routes.post('/article/update',[authenization], articleController.updateArticle);
     routes.post('/article/delete',[authenization], articleController.deleteArticle);
    /***
     * Set 404 page
     */
    routes.get('*',function(req,res){
        res.render('404page.ejs');
    })
    return app.use('/', routes);
}

export default initWebRoutes;