import db from "../models/models/index";
import { Op } from "sequelize";

const Article = db.Article;
const Catalogue = db.catalogue;
const User = db.User;
Article.belongsTo(Catalogue, { foreignKey: 'id_catalogue' });
Catalogue.hasMany(Article, { foreignKey: 'id' });
Article.belongsTo(User, { foreignKey: 'id_user' });
User.hasMany(Article, { foreignKey: 'id' });

const createArticle = async (article) => {
    try {
        await Article.create(article);
        return true;
    } catch (e) {
        return e;
    }
}

const getAllArticle = async () => {
    return await Article.findAll({
        include: [Catalogue, User],
        raw: true,
        nest: true,
    });
}

const findArticleById = async (article_id) => {
    let article = await Article.findOne({
        where: {
            id: id
        },

    })
    if (!article) {
        return article.get({ plain: true });
    }
    return null;
}

const checkArticleDepend = async (article_id, department_id) => {
    let article = await findArticleById(article_id);
    if (!article) return false;
    if (await Catalogue.findOne({ where: { id: article.id_catalogue, id_department: department_id } })) {
        return true;
    }
    return false;
}

module.exports = {
    createArticle,
    getAllArticle,
    checkArticleDepend,
    findArticleById
}