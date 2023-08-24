import db from "../models/models/index";
import bcrypt from "bcrypt";
require('dotenv').config();

/**
 * Liên kết model
 */
const User = db.User;
const Role = db.Role;
const Department = db.Department;
User.belongsTo(Role, { foreignKey: 'id_role' });
Role.hasMany(User, { foreignKey: 'id' });
User.belongsTo(Department, { foreignKey: 'id_department' });
Department.hasMany(User, { foreignKey: 'id' });

/***
 * Tìm tài khoản bằng email
 * Chức năng: Đăng nhập
 */
const findUserByEmail = async (email) => {
    let data = null;
    data = await User.findOne({
        where: {
            user_email: email
        }
    });
    if (data != null) {
        return data.get({ plain: true });
    }
    return null;
}
/***
 * Tìm tài khoản bằng id
 * Chức năng: Cập nhật thông tin tài khoản, đổi mật khẩu
 */
const findUserById = async (id) => {
    let data = null;

    data = await User.findOne({
        where: {
            id: id,
        }
    })
    if (data != null) {
        return data.get({ plain: true });
    }
    return null;
}
/**
 * Cập nhật thông tin tài khoản bằng id
 * @param {*} id id người dùng
 * @param {*} dataUser thông tin cân cập nhật
 * @returns true hoặc lỗi
 */
const updateUserInfor = async (id, dataUser) => {
    try {
        await User.update({
            id_role: dataUser.id_role,
            id_department: dataUser.id_department,
            user_name: dataUser.user_name,
            user_gender: dataUser.user_gender,
            user_dob: dataUser.user_dob,
            user_address: dataUser.user_address,
            user_status: dataUser.user_status,
            updateAt: new Date().toLocaleString("vn-VN", { timeZone: "Asia/Ho_Chi_Minh" }),
        }, {
            where: { id: id }
        });
        return true;

    }
    catch (e) {
        return e;
    }
}
/**
 * Đổi mật khẩu
 * @param {*} id id người dùng
 * @param {*} password Mật khẩu đã nhập (cũ và mới)
 * @returns true hoặc lỗi
 */
const changePassword = async (id, password) => {
    let user = await User.findOne({
        where: {
            id: id
        },
    });

    let match = await bcrypt.compare(password.old, user.user_password);
    if (!match) {
        return "Mật khẩu cũ chưa trùng khớp.";
    } else {
        let hash = await bcrypt.hashSync(password.new, parseInt(process.env.SALTROUND));
        try {
            await User.update({
                user_password: hash
            }, {
                where: { id: id }
            })
        }
        catch (e) {
            return e;
        }
    }
    return true;
}
/**
 * Lấy tất cả account 
 */
const getAllAccount = async () => {
    return await User.findAll({
        raw: true,
        nest: true,
        include: [Role, Department],
    });
}
/**
 * Xóa account
 * @param {*} id id account
 * @returns 
 */
const deleteUserById = async (id) => {
    try {
        await User.destroy({
            where: {
                id: id
            }
        });
        return true;
    } catch (e) {
        return e;
    }
}
const createUser = async (user) => {
    try {
        await User.create(user);
        return true;
    } catch (e) {
        console.log(e);
        return e;
    }
}
const resetPassword = async (id, password) => {
    let user = await User.findOne({
        where: {
            id: id
        },
    });
    let hash = await bcrypt.hashSync(password.new, parseInt(process.env.SALTROUND));
    try {
        await User.update({
            user_password: hash
        }, {
            where: { id: id }
        })
    }
    catch (e) {
        return e;
    }
    return true;
}
module.exports = {
    findUserByEmail,
    findUserById,
    updateUserInfor,
    changePassword,
    getAllAccount,
    deleteUserById,
    createUser,
    resetPassword
}