import db from "../models/models/index";


const findUserByEmail=async(email)=>{
    let data=null;
    data= await db.User.findOne({
        where:{
            user_email:email
        }
    });
    if(data!=null)
    {
        return data.get({plain:true});
    }
    return null;
}

module.exports={
    findUserByEmail,
}