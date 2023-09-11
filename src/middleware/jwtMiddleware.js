import jwt from "jsonwebtoken";
require('dotenv').config();

const createJWT = (payload) => {
    let key= process.env.JWTPKEY;
    let token=null;
    try{
        token = jwt.sign(payload,key,{ expiresIn: '2h' });
    }catch(err){
        console.log(err);
    }
    return token;
}

const verifyJWT=(token)=>{
    let key=process.env.JWTPKEY;
    let strDecoded=null;
    jwt.verify(token,key,function(err,decoded){
        if(err){
            console.log(err);
            return null;
        }
        strDecoded=decoded;
    }); 
    return strDecoded;
}

module.exports={
    createJWT,
    verifyJWT
}

