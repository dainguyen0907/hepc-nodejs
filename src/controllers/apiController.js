import articleService from "../services/articleService";
import catalogueService from "../services/catalogueService";

const getHomePageArticles = async (req, res) => {
    let article = await articleService.getArticle(1, 8);
    return res.json(article);
}

const getHomePageAnouncements = async (req, res) => {
    let value = Number(req.query.value) || 8;
    let article = await articleService.getArticle(2, value);
    return res.json(article);
}

const getArticleDetail = async (req, res) => {
    let article = await articleService.findArticleByLinkForApi(req.params.link);
    return res.json(article);
}

const getMoreArticle = async (req, res) => {
    let id_article = req.query.id;
    let id_catalogue = req.query.catalogue;
    if (id_article && id_catalogue) {
        let articles = await articleService.getMoreArticle(id_article, id_catalogue);
        return res.json(articles);
    }
    return res.redirect('/*');
}

const getCatalogue = async (req, res) => {
    let id_department = req.query.id_department;
    if (id_department) {
        let department = await catalogueService.findCatalogueByDepartmentId(id_department);
        return res.json(department);
    }
    return res.redirect('/*');
}
const getCatalogueDetail = async (req, res) => {
    let department = await catalogueService.findCatalogueByLink(req.params.link);
    return res.json(department);
}
const getPaginationArticles = async (req, res) => {
    let id_catalogue = req.query.id_catalogue;
    let limit = Number(req.query.limit);
    let offset = Number(req.query.offset);
    
    if (id_catalogue) {
        if (!Number.isNaN(limit) && !Number.isNaN(offset)) {
            let article = await articleService.getArticle(id_catalogue, limit, offset);
            return res.json(article);
        }
        else {
            let article = await articleService.getArticle(id_catalogue);
            return res.json(article);
        }
    }
}


module.exports = {
    getHomePageArticles,
    getHomePageAnouncements,
    getArticleDetail,
    getMoreArticle,
    getCatalogue,
    getCatalogueDetail,
    getPaginationArticles
};