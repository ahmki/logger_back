const { DataTypes } = require('sequelize');

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.addColumn('logs', 'rating', {
      type: DataTypes.INTEGER,
      allowNull: true,
      default: false
    });
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.removeColumn('logs', 'rating');
  }
};