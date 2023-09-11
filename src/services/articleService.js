import db from "../models/models/index";
import { Op } from "sequelize";

const Article = db.Article;
const Catalogue = db.catalogue;
const User = db.User;
const Department=db.Department;
Article.belongsTo(Catalogue, { foreignKey: 'id_catalogue' });
Catalogue.hasMany(Article, { foreignKey: 'id' });
Article.belongsTo(User, { foreignKey: 'id_user' });
User.hasMany(Article, { foreignKey: 'id' });
Catalogue.belongsTo(Department,{foreignKey:'id_department'});
Department.hasMany(Catalogue,{foreignKey:'id'});

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

const getAllArticleByDeparmentId = async (department_id) => {
    return await Article.findAll({
        include: [{
            model:Catalogue,
            where:{
                id_department:department_id
            }
        }, User],
        raw: true,
        nest: true,
    });
}

const getAllUncensorArticleByDeparmentId = async (department_id) => {
    return await Article.findAll({
        include: [{
            model:Catalogue,
            where:{
                id_department:department_id
            }
        }, User],
        where:{
            article_censor:0,
        },
        raw: true,
        nest: true,
    });
}

const getAllArticleByUserId = async (user_id) => {
    return await Article.findAll({
        include: [{
            model:User,
            where:{
                id:user_id
            }
        }, Catalogue],
        raw: true,
        nest: true,
    });
}

const findArticleById = async (article_id) => {
    let article = await Article.findOne({
        where: {
            id: article_id
        },

    })
    if (article) {
        return article.get({ plain: true });
    }
    return null;
}


const checkArticleDepend = async (article_id, department_id, user_id) => {
    let article = await findArticleById(article_id);
    if (!article) return false;
    if (department_id && !user_id) {
        if (await Catalogue.findOne({ where: { id: article.id_catalogue, id_department: department_id } })) {
            return true;
        }
    }
    if (user_id && !department_id) {
        if (article.id_user == user_id) {
            return true;
        }
    }
    return false;
}

const checkArticleCensor =async (article_id)=>{
    let article = await findArticleById(article_id);
    if (!article) return false;
    if(article.article_censor==1){
        return true;
    }
    return false;
}

const updateArticle=async(id,article)=>{
    try{
        await Article.update({
            id_catalogue: article.id_catalogue,
            article_link: article.article_link,
            article_heading: article.article_heading,
            article_summarize: article.article_summarize,
            article_content: article.article_content,
            article_view: article.article_view,
            article_file: article.article_file,
            article_image: article.article_image,
            article_status: article.article_status,
            article_censor: article.article_censor,
            updateAt: new Date().toLocaleString("vn-VN", { timeZone: "Asia/Ho_Chi_Minh" }),
        },{where:{
                id:id
            }});
        return true;
    }catch(e){
        return e;
    }
}


const deleteArticle=async (id)=>{
    try{
        await Article.destroy({
            where:{
                id:id
            }
        });
        return true;
    }catch(e){
        return e;
    }
}

const countUncensorArticle=async (department_id)=>{
    let countData = await Article.count({
        include:[{
            model:Catalogue,
            where:{
                id_department:department_id,
            }
        }],
        where:{
            article_censor:0,
        }
    });
    return countData;
}

const findArticleByDepartmentId=async(department_id)=>{
    if(department_id==-1)
    {
        return await Article.findAll({
            include:[Catalogue,User],
            raw: true,
            nest: true,
        })
    }
    return await Article.findAll({
        include:[{
            model:Catalogue,
            where:{
                id_department:department_id
            }
        },User],
        raw: true,
        nest: true,
    })
}

module.exports = {
    createArticle,
    getAllArticle,
    getAllArticleByDeparmentId,
    getAllUncensorArticleByDeparmentId,
    getAllArticleByUserId,
    checkArticleDepend,
    checkArticleCensor,
    findArticleById,
    updateArticle,
    deleteArticle,
    countUncensorArticle,
    findArticleByDepartmentId,
}