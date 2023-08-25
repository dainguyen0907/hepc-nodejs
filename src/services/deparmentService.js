import db from "../models/models/index";
import {Op} from "sequelize";

const Department = db.Department;
/**
 * Lấy tất cả thông tin phòng ban
 * @returns 
 */
const getAllDepartment = async () => {
    let data = await Department.findAll({
        raw: true,
        nest: true,
    });
    return data;
}
/**
 * Kiểm tra tên phòng ban
 * @param {*} id id phòng (nếu có) dùng cho update
 * @param {*} name  Tên phòng ban
 * @returns 
 */
const checkDepartmentName = async (id, name) => {
    let dataDepartment = null;
    if (id) {
        dataDepartment =await Department.findOne({
            where: {
                id:{[Op.ne]:id},
                department_name: name
            }
        });
    } else {
        dataDepartment =await Department.findOne({
            where: {
                department_name: name
            }
        });
    }
    if(dataDepartment!=null)
    {
        return true;
    }
    return false;
}
/**
 * Tạo phòng ban mới
 * @param {*} department object phòng ban
 * @returns 
 */
const createDepartment=async(department)=>{
    try{
        await Department.create(department);
        return true;
    }catch(e){
        return e;
    }
}
/**
 * Cập nhật thông tin phòng ban
 * @param {*} id id phòng ban
 * @param {*} department object phòng ban mới
 * @returns 
 */
const updateDepartment=async(id,department)=>{
    try{
        await Department.update({
                department_name:department.department_name,
                department_status:department.department_status,
                updateAt: new Date().toLocaleString("vn-VN", { timeZone: "Asia/Ho_Chi_Minh" }),
            },{
                where:{id:id}
            }
        )
        return true;
    }catch(e){
        return e;
    }
}
/**
 * Xóa phòng ban
 * @param {*} id id phòng ban
 * @returns 
 */
const deleteDepartment=async(id)=>{
    try{
        await Department.destroy({
            where:{
                id:id
            }
        });
        return true;
    }catch(e){
        return e;
    }
}
module.exports = {
    getAllDepartment,
    checkDepartmentName,
    createDepartment,
    updateDepartment,
    deleteDepartment,
}