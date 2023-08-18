import db from "../models/models/index";
import bcrypt from "bcrypt";

const findUserByEmail=async(email)=>{
    let data=[];
    data= await db.User.findOne({
        where:{
            user_email:email
        }
    });
    return data.get({plain:true});
}

module.exports={
    findUserByEmail,
}