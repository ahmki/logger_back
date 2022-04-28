const express = require('express');
const { User, Log } = require('../models');

const router = express.Router();

router.get('/', async (_req, res) => {
  console.log('get users');
  const users = await User.findAll({
    include: {
      model: Log,
      attributes: { exclude: ['userId'] }
    }
  });
  res.json(users);
});

router.get('/:id', async (req, res) => {
  const user = await User.findByPk(req.params.id, {
    attributes: {
      exclude: ['password']
    },
    include: {
      model: Log,
      attributes: { exclude: ['userId'] }
    },
  });

  if(user) {
    res.json(user);
  }
  else {
    res.status(404).json({ error: 'invalid user id' });
  }
});

router.post('/', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (error) {
    res.status(400).json({ error });
  }
});
module.exports = router;