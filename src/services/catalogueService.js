import db from "../models/models/index";
import {Op} from "sequelize";

const Catalogue = db.catalogue;
const Department=db.Department;
Catalogue.belongsTo(Department,{foreignKey:'id_department'});
Department.hasMany(Catalogue,{foreignKey:'id'});
/**
 * Lấy tất cả thông tin phòng ban
 * @returns 
 */
const getAllCatalogue = async () => {
    let data = await Catalogue.findAll({
        raw: true,
        nest: true,
        include:[Department],
    });
    return data;
}

const findCatalogueByDepartmentId=async(department_id)=>{
    let data = await Catalogue.findAll({
        raw: true,
        nest: true,
        where:{
            id_department:department_id
        }
    });
    return data;
}
const checkCatalogueName=async(id,name)=>{
    let data=null;
    if(id){
        data=await Catalogue.findOne({
            where:{
                id:{[Op.ne]:id},
                catalogue_name:name
            }
        })
    }else{
        data=await Catalogue.findOne({
            where:{
                catalogue_name:name
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
const createCatalogue=async(catalogue)=>{
    try{
        await Catalogue.create(catalogue);
        return true;
    }catch(e){
        return e;
    }
}
const updateCatalogue=async(id,catalogue)=>{
    try{
        await Catalogue.update({
           catalogue_name:catalogue.catalogue_name,
           id_department:catalogue.id_department,
           catalogue_link:catalogue.catalogue_link,
           catalogue_status:catalogue.catalogue_status,
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
const deleteCatalogue= async (id)=>{
    try{
        await Catalogue.destroy({
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
    getAllCatalogue,
    checkCatalogueName,
    createCatalogue,
    updateCatalogue,
    deleteCatalogue,
    findCatalogueByDepartmentId
}