import articleService from "../services/articleService";

const getHomePageArticles=async(req,res)=>{
    let article=await articleService.getArticle(1,8);
    return res.json(article);
}

const getHomePageAnouncements=async(req,res)=>{
    let article=await articleService.getArticle(2,8);
    return res.json(article);
}

const getArticleDetail=async(req,res)=>{
    let article=await articleService.findArticleByLinkForApi(req.params.link);
    return res.json(article);
}


module.exports={
    getHomePageArticles,
    getHomePageAnouncements,
    getArticleDetail,
};