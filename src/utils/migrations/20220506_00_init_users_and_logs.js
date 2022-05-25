const { DataTypes } = require('sequelize');

module.exports = {
  up: async ({ context: queryInterface }) => {

    await queryInterface.createTable('logs', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      mediaType: {
        type: DataTypes.TEXT
      },
      review: {
        type: DataTypes.TEXT
      },
      date: {
        type: DataTypes.DATE
      }
    });

    await queryInterface.createTable('users', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
    });

    await queryInterface.addColumn('logs', 'user_id', {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'user', key: 'id' },
    });
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable('logs');
    await queryInterface.dropTable('users');
  },
};