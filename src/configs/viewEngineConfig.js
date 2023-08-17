import express from "express";

/**
 * 
 * @param {*} app :express app
 */
const initViewEngine=(app)=>{

    app.use(express.static('./src/public'));
    app.set('view engine','ejs');
    app.set('views','./src/views');
    
}

export default initViewEngine;