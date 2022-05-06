const { User } = require('./user');
const { Log } = require('./log');

User.hasMany(Log);
Log.belongsTo(User);

Log.sync();
User.sync();

module.exports = {
  User,
  Log
};
