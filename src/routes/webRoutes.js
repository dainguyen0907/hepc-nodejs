import express from "express";
import loginController from "../controllers/loginController"

const routes=express.Router();

/**
 * 
 * @param {*} app : express app
 * @returns 
 */
const initWebRoutes=(app)=>{
    routes.get('/',loginController.loadLoginPage);

    return app.use('/',routes);
}

export default initWebRoutes;