const loadLoginPage=(req,res)=>{
    return res.render('login.ejs');
}

module.exports={
    loadLoginPage,
}