const { User } = require('./user');
const { Log } = require('./log');

User.hasMany(Log);
Log.belongsTo(User);

Log.sync({ alter: true });
User.sync({ alter: true });

module.exports = {
  User,
  Log
};
