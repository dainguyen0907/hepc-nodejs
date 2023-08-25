import db from "../models/models/index";

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

module.exports={
    getAllVideo,
}