import Express from "express";
import initViewEngine from "./configs/viewEngineConfig";
import initWebRoutes from "./routes/webRoutes";
require('dotenv').config;

const app=Express();
const PORT=process.env.PORT||8080;

initViewEngine(app);

initWebRoutes(app);

app.listen(PORT,()=>{
    console.log('Server start in port: '+ PORT);
});