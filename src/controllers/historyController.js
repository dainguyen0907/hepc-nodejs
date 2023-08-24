import historyService from '../services/historyService';
import baseController from "./baseController";

const loadIndexPage=async(req,res)=>{
    let page="pages/history_index";
    let title="Nhật ký cập nhật";
    let css=["https://cdn.datatables.net/v/bs5/dt-1.13.6/datatables.min.css"];
    let js=["https://cdn.datatables.net/v/bs5/jq-3.7.0/dt-1.13.6/datatables.min.js",'/js/initDatatable.js'];
    let historyRecord=await historyService.getAllHistoryRecord();
    let pageData=[historyRecord];
    return baseController.loadMasterPage(req,res,page,title,pageData,css,js);
}

module.exports={
    loadIndexPage,
}