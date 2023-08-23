import userService from "../services/userService";

const checkAccountStatus= async(req,res)=>{
    let user=await userService.findUserById(req.user_id);
    if(user==null||user.user_status!=1)
    {
        return false;
    }
    return true;
}

module.exports={ checkAccountStatus};