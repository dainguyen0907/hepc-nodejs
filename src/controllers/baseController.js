import { createHistory } from "../services/historyService";
import {countUncensorPhotoByDeparmentId} from "../services/photoService";
import {countUncensorArticle} from "../services/articleService";
require('dotenv').config();

const loadMasterPage = async(req, res, page, title, pageData, css, js) => {
    return res.render('masterPage.ejs', {
        title: title,
        page: page,
        user_name: req.user_name,
        user_role: req.user_role,
        user_id: req.user_id,
        pageData: pageData,
        css: css,
        js: js,
        countPhoto: await countUncensorPhotoByDeparmentId(req.id_department),
        countArticle: await countUncensorArticle(req.id_department)
    });
}

const load404page = (req, res) => {
    return res.render('404page.ejs');
}

const createHistoryRecord = async (id, content) => {
    return await createHistory(id, content);
}

const convertName = (key_word) => {
    key_word = key_word.replaceAll(/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/g, 'a');
    key_word = key_word.replaceAll(/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/g, 'e');
    key_word = key_word.replaceAll(/(ì|í|ị|ỉ|ĩ)/g, 'i');
    key_word = key_word.replaceAll(/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/g, 'o');
    key_word = key_word.replaceAll(/(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/g, 'u');
    key_word = key_word.replaceAll(/(ỳ|ý|ỵ|ỷ|ỹ)/g, 'y');
    key_word = key_word.replaceAll(/(đ)/g, 'd');
    key_word = key_word.replaceAll(/(À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ)/g, 'A');
    key_word = key_word.replaceAll(/(È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ)/g, 'E');
    key_word = key_word.replaceAll(/(Ì|Í|Ị|Ỉ|Ĩ)/g, 'I');
    key_word = key_word.replaceAll(/(Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ)/g, 'O');
    key_word = key_word.replaceAll(/(Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ)/g, 'U');
    key_word = key_word.replaceAll(/(Ỳ|Ý|Ỵ|Ỷ|Ỹ)/g, 'Y');
    key_word = key_word.replaceAll(/(Đ)/g, 'D');
    key_word = key_word.replaceAll(/(\“|\”|\‘|\’|\,|\!|\&|\;|\@|\#|\%|\~|\`|\=|\_|\'|\]|\[|\}|\{|\)|\(|\+|\^)/g, '-');
    key_word = key_word.replaceAll(/( )/g, '-');
    key_word = key_word.replaceAll(/(\/)/g, '-');
    return key_word;
}
module.exports = {
    loadMasterPage,
    load404page,
    createHistoryRecord,
    convertName,
};