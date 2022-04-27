const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../utils/db');
const bcrypt = require('bcrypt');

class User extends Model {}

User.init({
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
  password: {
    type: DataTypes.STRING,
  }
},
{
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'user',
  hooks: {
    beforeCreate: async (user) => {
      console.log('creating and hashing');
      // encrypted with 10 saltrounds
      user.password = await bcrypt.hash(user.password, 10);
    }
  },
});

User.prototype.validatePassword = async function(password) {
  return await bcrypt.compare(password, this.dataValues.password);
};

module.exports = { User };