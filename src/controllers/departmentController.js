import departmentService from "../services/deparmentService";
import baseController from "./baseController";
import {checkAccountStatus} from "../middleware/accountStatusMiddleware";
import { validationResult } from "express-validator";

const loadIndexPage=async(req,res)=>{
    let dataDepartment=await departmentService.getAllDepartment();
    let page="pages/department_index.ejs";
    let title="Quản lí phòng ban";
    let modal={title:"Xóa phòng ban",formAction:"department/delete"}
    let pageData=[dataDepartment,null,modal];
    let css=["https://cdn.datatables.net/v/bs5/dt-1.13.6/datatables.min.css"];
    let js=["https://cdn.datatables.net/v/bs5/jq-3.7.0/dt-1.13.6/datatables.min.js",'/js/initDatatable.js','/js/modal_init.js'];
    return baseController.loadMasterPage(req,res,page,title,pageData,css,js);
}

const createDepartment=async(req,res)=>{
    let accountStatus=await checkAccountStatus(req,res);
    if(!accountStatus){
        const token=req.cookies.jwt;
        if(token)
        {
            await res.clearCookie('jwt');
        }
        return res.redirect('/');
    }
    let error=await validationResult(req);
    if(!error.isEmpty())
    {
        req.flash('error',error.errors[0].msg);
        return res.redirect("/department");
    }
    let department_name=req.body.department_name.trim();
    if(await departmentService.checkDepartmentName(null,department_name))
    {
        req.flash('error',"Tên phòng ban đã tồn tại");
        return res.redirect("/department");
    }
    let department={department_name:department_name,department_status:1};
    let Qres=await departmentService.createDepartment(department);
    if(Qres==true){
        baseController.createHistoryRecord(req.user_id,req.user_name+" đã thêm một phòng ban mới")
        req.flash('success',"Tạo phòng ban thành công");
        return res.redirect("/department");
    }
    else
    {
        req.flash('error',Qres);
        return res.redirect("/department");
    }
}
const updateDepartment=async(req,res)=>{
    let accountStatus=await checkAccountStatus(req,res);
    if(!accountStatus){
        const token=req.cookies.jwt;
        if(token)
        {
            await res.clearCookie('jwt');
        }
        return res.redirect('/');
    }
    let error=await validationResult(req);
    if(!error.isEmpty())
    {
        req.flash('error',error.errors[0].msg);
        return res.redirect("/department");
    }
    let department_name=req.body.department_name.trim();
    let department_id=req.body.id;
    let department_status=req.body.department_status;
    if(await departmentService.checkDepartmentName(department_id,department_name))
    {
        req.flash('error',"Tên phòng ban đã tồn tại");
        return res.redirect("/department");
    }
    let department={department_name:department_name,department_status:department_status};
    let Qres=await departmentService.updateDepartment(department_id,department);
    if(Qres==true){
        baseController.createHistoryRecord(req.user_id,"Phòng ban có id="+department_id+" đã được cập nhật thông tin bởi "+req.user_name);
        req.flash('success',"Cập nhật phòng ban thành công");
        return res.redirect("/department");
    }
    else
    {
        req.flash('error',Qres);
        return res.redirect("/department");
    }
}
const deleteDepartment=async(req,res)=>{
    let accountStatus=await checkAccountStatus(req,res);
    if(!accountStatus){
        const token=req.cookies.jwt;
        if(token)
        {
            await res.clearCookie('jwt');
        }
        return res.redirect('/');
    }
    let id=req.body.id;
    if(id<17)
    {
        req.flash('error',"Không thể xóa phòng ban này");
        return res.redirect("/department");
    }
    let Qres=await departmentService.deleteDepartment(id);
    if(Qres==true){
        baseController.createHistoryRecord(req.user_id,"Phòng ban có id="+id+" đã bị xóa bởi "+req.user_name);
        req.flash('success',"Xóa phòng ban thành công");
        return res.redirect("/department");
    }
    else
    {
        req.flash('error',Qres);
        return res.redirect("/department");
    }

}
module.exports={
    loadIndexPage,
    createDepartment,
    updateDepartment,
    deleteDepartment,
}