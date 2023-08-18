import jwt from "jsonwebtoken";
require('dotenv').config();

const createJWT = (payload) => {
    let key= process.env.JWTPKEY;
    let token=null;
    try{
        token = jwt.sign(payload,key,{ expiresIn: '1h' });
    }catch(err){
        console.log(err);
    }
    return token;
}

const verifyJWT=(token)=>{
    let key=process.env.JWTPKEY;
    let decode=null;
    jwt.verify(token,key,function(err,decoded){
        if(err){
            console.log(err);
            return null;
        }
        return decoded;
    }); 
}

module.exports={
    createJWT,
    verifyJWT
}

