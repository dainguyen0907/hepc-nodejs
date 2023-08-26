import db from "../models/models/index";
import {Op} from "sequelize";

const Video = db.Video;
const User=db.User;
Video.belongsTo(User, { foreignKey: 'id_user' });
User.hasMany(Video, { foreignKey: 'id' });
/**
 * Lấy tất cả video
 * @returns 
 */
const getAllVideo = async () => {
    let data = await Video.findAll({
        include:[User],
        raw: true,
        nest: true, 
    });
    return data;
}

const findVideoById=async (id)=>{
    let data=await Video.findOne({
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

const checkVideoName=async(id,name)=>{
    let data=null;
    if(id){
        data=await Video.findOne({
            where:{
                id:{[Op.ne]:id},
                video_name:name
            }
        })
    }else{
        data=await Video.findOne({
            where:{
                video_name:name
            }
        })
    }
    if(data)
    {
        return true;
    }else
    {
        return false;
    }
}
const createVideo=async(video)=>{
    try{
        await Video.create(video);
        return true;
    }catch(e){
        return e;
    }
}
const updateVideo=async(id,video)=>{
    try{
        await Video.update({
            video_name:video.video_name,
            video_content:video.video_content,
            video_status:video.video_status,
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
const deleteVideo=async(id)=>{
    try{
        await Video.destroy({
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
    getAllVideo,
    checkVideoName,
    createVideo,
    updateVideo,
    findVideoById,
    deleteVideo
}