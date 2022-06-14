const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../utils/db');

class Log extends Model {}

Log.init({
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
  rating: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  date: {
    type: DataTypes.DATE
  }
},
{
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'log',
});

module.exports = { Log };