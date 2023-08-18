import Express from "express";
import initViewEngine from "./configs/viewEngineConfig";
import initWebRoutes from "./routes/webRoutes";
import bodyParser from "body-parser";
require('dotenv').config;

const app=Express();
const PORT=process.env.PORT||8080;

app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

initViewEngine(app);

initWebRoutes(app);

app.listen(PORT,()=>{
    console.log('Server start in port: '+ PORT);
});