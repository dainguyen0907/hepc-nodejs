import express from "express";
import loginController from "../controllers/loginController";
import userController from "../controllers/userController";
import manageAccountController from "../controllers/manageAccountController";
import homeController from "../controllers/homeController";
import jwt from "../middleware/jwtMiddleware";

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
    routes.post('/info/update', authenization, userController.updateUserInfor);

    return app.use('/', routes);
}

export default initWebRoutes;