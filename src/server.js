import Express from "express";
import initViewEngine from "./configs/viewEngineConfig";
import initWebRoutes from "./routes/webRoutes";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import session from "express-session";
import flash from "connect-flash";
import initApiRoutes from "./routes/apiRoutes";
require('dotenv').config;

const app=Express();
const PORT=process.env.PORT||8080;
/**
 * Khởi tạo body parser để đọc thông tin method:post
 */
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.use(function(req,res,next){
    res.setHeader('Access-Control-Allow-Origin','http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods','GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers','X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials',true);
    next();
});
/***
 * Khởi tạo session
 */
app.set('trust proxy', 1);
app.use(session({
    secret: process.env.SESSIONKEY,
    resave: true,
    saveUninitialized: true
  }))
/***
 * Khởi tạo flash session
 */
app.use(flash());
app.use(function(req, res, next){
    res.locals.message = req.flash();
    next();
});
/**
 * Khởi tạo cookie Parser lưu JWT
 */
app.use(cookieParser());
/**
 * Khởi tạo view engine
 */
initViewEngine(app);
/**
 * Khởi tạo router
 */
initApiRoutes(app);
initWebRoutes(app);



app.listen(PORT,()=>{
    console.log('Server start in port: '+ PORT);
});