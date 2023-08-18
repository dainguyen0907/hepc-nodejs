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
    await queryInterface.bulkInsert('Users', [
      {
        id_department: '1',
        id_role: '1',
        user_email: 'dainq.hepc@gmail.com',
        user_password: '123456',
        user_name: "Nguyễn Quốc Đại",
        user_gender: '1',
        user_dob: '09/07/1998',
        user_address:'',
        user_status: '1'
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
