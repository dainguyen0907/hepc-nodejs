import db from "../models/models/index";


const Department = db.Department;
const getAllDepartment=()=>{
    let data= Department.findAll({
        raw:true,
        nest: true,
    });
    return data;
}

module.exports={
    getAllDepartment,
}