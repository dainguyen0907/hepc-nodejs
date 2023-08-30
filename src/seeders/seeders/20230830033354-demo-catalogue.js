'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Catalogues', [
    {
      id_department:1,
      catalogue_name: 'Tin tức HEPC',
      catalogue_status:'1'
    },
    {
      id_department:1,
      catalogue_name: 'Thông báo HEPC',
      catalogue_status:'1'
    },
    {
      id_department:2,
      catalogue_name: 'Giới thiệu công đoàn',
      catalogue_status:'1'
    },
    {
      id_department:2,
      catalogue_name: 'Tin tức công đoàn',
      catalogue_status:'1'
    },
    {
      id_department:3,
      catalogue_name: 'Giới thiệu đoàn thanh niên',
      catalogue_status:'1'
    },
    {
      id_department:3,
      catalogue_name: 'Tin tức đoàn thanh niên',
      catalogue_status:'1'
    },
    {
      id_department:4,
      catalogue_name: 'Giới thiệu phòng Tổ chức',
      catalogue_status:'1'
    },
    {
      id_department:4,
      catalogue_name: 'Tin tức phòng tổ chức',
      catalogue_status:'1'
    },
    {
      id_department:5,
      catalogue_name: 'Giới thiệu phòng Đào tạo',
      catalogue_status:'1'
    },
    {
      id_department:5,
      catalogue_name: 'Tin tức phòng đào tạo',
      catalogue_status:'1'
    },
    {
      id_department:6,
      catalogue_name: 'Giới thiệu phòng Kế hoạch Tài chính',
      catalogue_status:'1'
    },
    {
      id_department:6,
      catalogue_name: 'Tin tức phòng KHTC',
      catalogue_status:'1'
    },
    {
      id_department:7,
      catalogue_name: 'Giới thiệu phòng QLKH_QHQT',
      catalogue_status:'1'
    },
    {
      id_department:7,
      catalogue_name: 'Tin tức phòng QLKH_QHQT',
      catalogue_status:'1'
    },
    {
      id_department:8,
      catalogue_name: 'Giới thiệu phòng QLHSSV',
      catalogue_status:'1'
    },
    {
      id_department:8,
      catalogue_name: 'Tin tức phòng QLHSSV',
      catalogue_status:'1'
    },
    {
      id_department:9,
      catalogue_name: 'Giới thiệu Khoa Hệ thống điện',
      catalogue_status:'1'
    },
    {
      id_department:9,
      catalogue_name: 'Tin tức khoa HTĐ',
      catalogue_status:'1'
    },
    {
      id_department:10,
      catalogue_name: 'Giới thiệu Khoa Kỹ thuật cơ sở',
      catalogue_status:'1'
    },
    {
      id_department:10,
      catalogue_name: 'Tin tức khoa KTCS',
      catalogue_status:'1'
    },
    {
      id_department:11,
      catalogue_name: 'Giới thiệu Khoa Điện công nghiệp',
      catalogue_status:'1'
    },
    {
      id_department:11,
      catalogue_name: 'Tin tức khoa ĐCN',
      catalogue_status:'1'
    },
    {
      id_department:12,
      catalogue_name: 'Giới thiệu Khoa KH cơ bản - kinh tế',
      catalogue_status:'1'
    },
    {
      id_department:12,
      catalogue_name: 'Tin tức khoa KHCB-KT',
      catalogue_status:'1'
    },
    {
      id_department:13,
      catalogue_name: 'Giới thiệu Khoa CN điện tử - Tự động hóa',
      catalogue_status:'1'
    },
    {
      id_department:13,
      catalogue_name: 'Tin tức khoa CNĐT-TĐH',
      catalogue_status:'1'
    },
    {
      id_department:14,
      catalogue_name: 'Giới thiệu Khoa Đào tạo nâng cao',
      catalogue_status:'1'
    },
    {
      id_department:14,
      catalogue_name: 'Tin tức khoa ĐTNC',
      catalogue_status:'1'
    },
    {
      id_department:15,
      catalogue_name: 'Giới thiệu Trung tâm ngoại ngữ tin học',
      catalogue_status:'1'
    },
    {
      id_department:15,
      catalogue_name:'Tin tức TT NNTH',
      catalogue_status:'1'
    },
    {
      id_department:16,
      catalogue_name: 'Giới thiệu Trung tâm công nghệ năng lượng',
      catalogue_status:'1'
    },
    {
      id_department:16,
      catalogue_name: 'Tin tức TT CNNL',
      catalogue_status:'1'
    },
  ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
