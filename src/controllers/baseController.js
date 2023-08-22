require('dotenv').config();

const loadMasterPage=(req,res,page,pageData)=>{
    return res.render('masterPage.ejs',{
        page:page, 
        user_name:req.user_name,
        user_role:req.user_role,
        user_id:req.user_id,
        pageData:pageData,
    });
}
const changeInfoUser=(req,res)=>{
    
}

module.exports={
    loadMasterPage,
};