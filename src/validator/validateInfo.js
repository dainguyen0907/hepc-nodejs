import { body } from "express-validator";

const validatorUpdateAccount=()=>{
    return [
        body("name_user","Tên người dùng không được để trống!").trim().not().isEmpty(),
        body("name_user","Tên người dùng không quá 100 ký tự").isLength({max:100}),
        body("address_user","Địa chỉ không quá 500 ký tự").isLength({max:500}),
        body("birthday_user","Ngày sinh không được để trống!").trim().not().isEmpty(),
    ];
}
const validatorCreateAccount=()=>{
    return [
        body("name_user","Tên người dùng không được để trống!").trim().not().isEmpty(),
        body("name_user","Tên người dùng không quá 100 ký tự").isLength({max:100}),
        body("address_user","Địa chỉ không quá 500 ký tự").isLength({max:500}),
        body("birthday_user","Ngày sinh không được để trống!").trim().not().isEmpty(),
        body("user_password","Mật khẩu mới từ 6 đến 50 ký tự").isLength({max:50, min:6}),
    ];
}
const validatorForChangePassword=()=>{
    return [
        body("old_password","Mật khẩu cũ không được để trống!").trim().not().isEmpty(),
        body("new_password","Mật khẩu mới không được để trống!").trim().not().isEmpty(),
        body("new_password","Mật khẩu mới từ 6 đến 50 ký tự").isLength({max:50, min:6}),
        body("re_password","Xác nhận mật khẩu không được để trống!").trim().not().isEmpty(),
    ];
}
const validatorForResetPassword=()=>{
    return [
        body("new_password","Mật khẩu mới không được để trống!").trim().not().isEmpty(),
        body("new_password","Mật khẩu mới từ 6 đến 50 ký tự").isLength({max:50, min:6}),
        body("re_password","Xác nhận mật khẩu không được để trống!").trim().not().isEmpty(),
    ];
}
const validatorForCreateDepartment=()=>{
    return [
        body("department_name","Tên phòng ban không được để trống").trim().not().isEmpty(),
        body("department_name","Tên phòng ban không quá 200 ký tự").isLength({max:200}),
    ]
}
const validatorForCreateVideo=()=>{
    return [
        body("video_name","Tên video không được để trống").trim().not().isEmpty(),
        body("video_name","Tên video không quá 500 ký tự").isLength({max:500}),
        body("video_content","Mã nhúng không được để trống").trim().not().isEmpty(),
    ]
}
const validatorForCreateBanner=()=>{
    return [
        body("banner_content","Đường link banner không được để trống").trim().not().isEmpty(),
    ]
}
module.exports={
    validatorUpdateAccount,
    validatorForChangePassword,
    validatorCreateAccount,
    validatorForResetPassword,
    validatorForCreateDepartment,
    validatorForCreateVideo,
    validatorForCreateBanner
}