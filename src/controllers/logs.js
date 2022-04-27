const express = require('express');
const { Log, User } = require('../models');
const { tokenExtractor, findLogByPk } = require('../utils/middleware');

const router = express.Router();

router.get('/', async (req, res) => {
  const logs = await Log.findAll({
    attributes: { exclude: ['userId'] },
    include: {
      model: User,
      attributes: ['username']
    }
  });
  res.json(logs);
});

router.post('/', tokenExtractor, async (req, res) => {
  try {
    const user = await User.findByPk(req.decodedToken.id);
    const log = await Log.create({ ...req.body, userId: user.id, date: new Date() } );
    res.json(log);
  }
  catch(err) {
    return res.status(400).json({ error: 'invalid token' });
  }
});

router.get('/:id', findLogByPk, async (req, res) => {
  if (req.entry) {
    res.json(req.entry);
  }
  else {
    res.status(404).json({ error: 'invalid id' });
  }
});

module.exports = router;