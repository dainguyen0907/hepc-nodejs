import db from "../models/models/index";

let Record=db.History;
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