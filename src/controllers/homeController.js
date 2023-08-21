import userService from "../services/userService";
require('dotenv').config();

const loadIndexPage=(req,res)=>{
    return res.render('masterPage.ejs',{
        page:"pages/home",
    });
}

module.exports={
    loadIndexPage,
};