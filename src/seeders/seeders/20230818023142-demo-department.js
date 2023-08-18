'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('departments', [
      {
        department_name: 'Bộ phận truyền thông',
        department_status:'1'
      },
      {
        department_name: 'Công đoàn',
        department_status:'1'
      },
      {
        department_name: 'Đoàn thanh niên',
        department_status:'1'
      },
      {
        department_name: 'Phòng Tổ chức Hành Chính',
        department_status:'1'
      },
      {
        department_name: 'Phòng Đào tạo',
        department_status:'1'
      },
      {
        department_name: 'Phòng Kế hoạch Tài chính',
        department_status:'1'
      },
      {
        department_name: 'Phòng QLKH - QHQT',
        department_status:'1'
      },
      {
        department_name: 'Phòng Quản lí HSSV',
        department_status:'1'
      },
      {
        department_name: 'Khoa Hệ thống điện',
        department_status:'1'
      },
      {
        department_name: 'Khoa Kỹ thuật cơ sở',
        department_status:'1'
      },

      {
        department_name: 'Khoa Điện công nghiệp',
        department_status:'1'
      },
      {
        department_name: 'Khoa KH Cơ bản - Kinh tế',
        department_status:'1'
      },
      {
        department_name: 'Khoa CN Điện tử - Tự động hóa',
        department_status:'1'
      },
      {
        department_name: 'Khoa Đào tạo nâng cao',
        department_status:'1'
      },
      {
        department_name: 'Trung tâm Ngoại ngữ Tin học',
        department_status:'1'
      },
      {
        department_name: 'Trung tâm Công nghệ Năng lượng',
        department_status:'1'
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
