'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Contacts',
      'userId',
      {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Users',
          },
          key: 'id'
        },
        allowNull: true,
      });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropColumn('userId');
  }
};