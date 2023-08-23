import { body } from "express-validator";

const validatorUpdateAccount=()=>{
    return [
        body("name_user","Tên người dùng không được để trống!").not().isEmpty(),
        body("name_user","Tên người dùng không quá 100 ký tự").isLength({max:100}),
        body("address_user","Địa chỉ không quá 500 ký tự").isLength({max:500}),
        body("birthday_user","Ngày sinh không được để trống!").not().isEmpty(),
    ];
}
const validatorForChangePassword=()=>{
    return [
        body("old_password","Mật khẩu cũ không được để trống!").not().isEmpty(),
        body("new_password","Mật khẩu mới không được để trống!").not().isEmpty(),
        body("new_password","Mật khẩu mới từ 6 đến 50 ký tự").isLength({max:50, min:6}),
        body("re_password","Xác nhận mật khẩu không được để trống!").not().isEmpty(),
    ];
}
module.exports={
    validatorUpdateAccount,
    validatorForChangePassword,
}