const jwt = require('jsonwebtoken');
const { Log } = require('../models');
const { SECRET } = require('./config');

const tokenExtractor = (req, res, next) => {
  const auth = req.get('authorization');

  if (auth && auth.toLowerCase().startsWith('bearer ')) {
    try {
      console.log(auth.substring(7));
      req.decodedToken = jwt.verify(auth.substring(7), SECRET);
    }
    catch(err) {
      return res.status(401).json({ error: 'invalid token' });
    }
  }
  else {
    return res.status(401).json({ error: 'token missing' });
  }
  next();
};

const findLogByPk = async (req, res, next) => {
  req.entry = await Log.findByPk(req.params.id);
  next();
};


module.exports = {
  tokenExtractor,
  findLogByPk,
};