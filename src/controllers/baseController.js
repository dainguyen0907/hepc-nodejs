import {createHistory} from "../services/historyService";
require('dotenv').config();

const loadMasterPage=(req,res,page,title,pageData,css,js)=>{
    return res.render('masterPage.ejs',{
        title:title,
        page:page, 
        user_name:req.user_name,
        user_role:req.user_role,
        user_id:req.user_id,
        pageData:pageData,
        css:css,
        js:js,
    });
}

const load404page=(req,res)=>{
    return res.render('404page.ejs');
}

const createHistoryRecord=async(id,content)=>{
    return await createHistory(id,content);
}


module.exports={
    loadMasterPage,
    load404page,
    createHistoryRecord,
};