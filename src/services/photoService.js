import db from "../models/models/index";
import { Op } from "sequelize";

const Photo = db.Photo;
const Department = db.Department;
const User = db.User;
Photo.belongsTo(Department, { foreignKey: 'id_department' });
Department.hasMany(Photo, { foreignKey: 'id' });
Photo.belongsTo(User, { foreignKey: 'id_user' });
User.hasMany(Photo, { foreignKey: 'id' });
/**
 * Lấy tất cả thông tin ảnh
 * @returns 
 */
const getAllPhoto = async () => {
    let data = await Photo.findAll({
        raw: true,
        nest: true,
        include: [Department, User],
    });
    return data;
}

const getAllPhotoByUserId = async (user_id) => {
    let data = await Photo.findAll({
        raw: true,
        nest: true,
        include: [Department,
            {
                model: User,
                where: { id: user_id }
            }],
    });
    return data;
}

const getAllPhotoByDepartmentId = async (department_id) => {
    let data = await Photo.findAll({
        raw: true,
        nest: true,
        include: [User,
            {
                model: Department,
                where: { id: department_id }
            }],
    });
    return data;
}

const getAllUncensorPhotoByDepartmentId = async (department_id) => {
    let data = await Photo.findAll({
        raw: true,
        nest: true,
        include: [User,
            {
                model: Department,
                where: { id: department_id }
            }],
        where:{
            photo_censor:0
        }
    });
    return data;
}

const createPhoto = async (photo) => {
    try {
        Photo.create({
            id_user: photo.id_user,
            id_department: photo.id_department,
            photo_content: photo.photo_content,
            photo_status: photo.photo_status,
            photo_censor: photo.photo_censor,
        });
        return true;
    }
    catch (e) {
        return e;
    }
}

const deletePhoto = async (id) => {
    try {
        await Photo.destroy({
            where: {
                id: id
            }
        });
        return true;
    }
    catch (e) {
        return e;
    }
}
const checkCensorPhoto = async (id) => {
    let photo = await Photo.findOne({
        where: {
            id: id
        }
    });
    if (!photo) {
        return false;
    }
    if (photo.photo_censor == 1) {
        return true;
    }
    return false;
}

const updatePhoto = async (id, photo) => {
    try {
        await Photo.update({
            id_department: photo.id_department,
            photo_content: photo.photo_content,
            photo_status: photo.photo_status,
            photo_censor: photo.photo_censor,
        }, {
            where: {
                id: id
            }
        })
        return true;
    } catch (e) {
        return e;
    }
}

const checkPhotoDependent = async (photo_id, user_id, deparment_id) => {
    let data = await Photo.findOne({
        where: {
            id: photo_id
        }
    });
    if (!data) {
        return false;
    }
    if (data.id_user == user_id|| data.id_department==deparment_id) {
        return true;
    }
    return false;
}
const countUncensorPhotoByDeparmentId=async(deparment_id)=>{
    let countData = await Photo.count({
        where:{
            id_department:deparment_id,
            photo_censor:0
        }
    });
    return countData;
}
module.exports = {
    getAllPhoto,
    getAllPhotoByUserId,
    getAllPhotoByDepartmentId,
    getAllUncensorPhotoByDepartmentId,
    createPhoto,
    deletePhoto,
    checkCensorPhoto,
    updatePhoto,
    checkPhotoDependent,
    countUncensorPhotoByDeparmentId,
}