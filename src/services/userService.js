import db from "../models/models/index";

const User = db.User;
const Role = db.Role;
const Department = db.Department;
User.belongsTo(Role, { foreignKey: 'id_role' });
Role.hasMany(User, { foreignKey: 'id' });
User.belongsTo(Department, { foreignKey: 'id_department' });
Department.hasMany(User, { foreignKey: 'id' });
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

const findUserById = async (id) => {
    let data = null;

    data = await User.findOne({
        include: [Role, Department],
        where: {
            id: id,
        }
    })
    if (data != null) {
        return data.get({ plain: true });
    }
    return null;
}

const updateUserInfor=async(id,dataUser)=>{
    try{

        await User.update({
            id_role:dataUser.id_role,
            id_department:dataUser.id_department,
            user_name:dataUser.user_name,
            user_gender:dataUser.user_gender,
            user_dob:dataUser.user_dob,
            user_address:dataUser.user_address,
            user_status:dataUser.user_status,
            updateAt:new Date().toLocaleString("vn-VN",{timeZone:"Asia/Ho_Chi_Minh"}),
        },{
            where:{ id:id}
        });
        return true;

    }
    catch(e){
        return e;
    }

}

module.exports = {
    findUserByEmail,
    findUserById,
    updateUserInfor,
}