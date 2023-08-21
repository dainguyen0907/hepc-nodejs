import userService from "../services/userService";
require('dotenv').config();

const loadIndexPage=(req,res)=>{
    return res.render('masterPage.ejs');
}

module.exports={
    loadIndexPage,
};