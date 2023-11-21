import articleService from "../services/articleService";

const getHomePageArticles=async(req,res)=>{
    let article=await articleService.getArticle(1,8);
    return res.json(article);
}

const getHomePageAnouncements=async(req,res)=>{
    let value=Number(req.query.value)||8;
    let article=await articleService.getArticle(2,value);
    return res.json(article);
}

const getArticleDetail=async(req,res)=>{
    let article=await articleService.findArticleByLinkForApi(req.params.link);
    return res.json(article);
}

const getMoreArticle=async(req,res)=>{
    let id_article=req.query.id;
    let id_catalogue=req.query.catalogue;
    if(id_article&&id_catalogue)
    {
        let articles= await articleService.getMoreArticle(id_article,id_catalogue);
        return res.json(articles);
    }
    return res.redirect('/*');
}


module.exports={
    getHomePageArticles,
    getHomePageAnouncements,
    getArticleDetail,
    getMoreArticle,
};