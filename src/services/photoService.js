import db from "../models/models/index";
import {Op} from "sequelize";

const Photo = db.Photo;
const Department=db.Department;
const User=db.User;
Photo.belongsTo(Department,{foreignKey:'id_department'});
Department.hasMany(Photo,{foreignKey:'id'});
Photo.belongsTo(User,{foreignKey:'id_user'});
User.hasMany(Photo,{foreignKey:'id'});
/**
 * Lấy tất cả thông tin phòng ban
 * @returns 
 */
const getAllPhoto = async () => {
    let data = await Photo.findAll({
        raw: true,
        nest: true,
        include:[Department,User],
    });
    return data;
}
module.exports={
    getAllPhoto,
}