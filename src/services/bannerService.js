import db from "../models/models/index";
import {Op} from "sequelize";

const Banner = db.Banner;
const User=db.User;
Banner.belongsTo(User, { foreignKey: 'id_user' });
User.hasMany(Banner, { foreignKey: 'id' });
/**
 * Lấy tất cả Banner
 * @returns 
 */
const getAllBanner = async () => {
    let data = await Banner.findAll({
        include:[User],
        raw: true,
        nest: true, 
    });
    return data;
}

const findBannerById=async (id)=>{
    let data=await Banner.findOne({
        where:{
            id:id
        }
    });
    if(data!=null)
    {
        return data.get({plain:true});
    }
    return null;
}

const createBanner=async(banner)=>{
    try{
        await Banner.create(banner);
        return true;
    }catch(e){
        console.log(e);
        return e;
    }
}
const updateBanner=async(id,banner)=>{
    try{
        await Banner.update({
            banner_content:banner.banner_content,
            banner_status:banner.banner_status,
            updateAt:new Date().toLocaleString("vn-VN", { timeZone: "Asia/Ho_Chi_Minh" }),
        },{
            where:{
                id:id
            }
        });
        return true;
    }catch(e){
        return e;
    }
}
const deleteBanner=async(id)=>{
    try{
        await Banner.destroy({
            where:{
                id:id
            }
        });
        return true;
    }catch(e){
        return e;
    }
}

module.exports={
    getAllBanner,
    createBanner,
    updateBanner,
    findBannerById,
    deleteBanner
}