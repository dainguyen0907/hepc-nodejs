import db from "../models/models/index";

let Record=db.History;
/**
 * Tạo record cho mỗi lần chỉnh sửa
 * @param {*} id_user id người chỉnh sửa
 * @param {*} content nội dung chỉnh sửa
 * @returns 
 */
const createHistory = async (id_user,content) => {
    try {
        await Record.create({
            id_user:id_user,
            history_content:content,
        });
        return true;
    } catch (e) {
        console.log(e);
        return e;
    }
}

/***
 * Lấy tất cả thông tin lịch sử chỉnh sửa
 */
const getAllHistoryRecord = async()=>{
    return await Record.findAll({
        raw: true,
        nest: true,
    });
}
module.exports={
    createHistory,
    getAllHistoryRecord
}