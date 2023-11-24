import express from "express";
import apiController from "../controllers/apiController";

const routes=express.Router();

const initApiRoutes=(app)=>{
    routes.get('/api/hot-articles',apiController.getHomePageArticles);
    routes.get('/api/announcement',apiController.getHomePageAnouncements);
    routes.get('/api/articles',apiController.getPaginationArticles);
    routes.get('/api/moreArticle',apiController.getMoreArticle);
    routes.get('/api/catalogue',apiController.getCatalogue);
    routes.get('/api/catalogue/:link',apiController.getCatalogueDetail);
    routes.get('/api/articles/:link',apiController.getArticleDetail);
    return app.use('/', routes);
}

export default initApiRoutes;