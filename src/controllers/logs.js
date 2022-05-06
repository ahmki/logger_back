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
    return res.status(400).json({ error: 'couldnt insert into database!' });
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

router.delete('/:id', findLogByPk, async (req, res) => {
  if (req.entry) {
    await req.entry.destroy();
    res.status(204).end();
  }
  else {
    res.status(404).json({ error: 'invalid id' });
  }
});

router.put('/:id', findLogByPk, async (req, res) => {
  if (req.entry) {
    req.entry.review = req.body.review;

    await req.entry.save();
    res.json(req.entry);
  }
  else {
    res.status(404).json({ error: 'invalid id' });
  }
});

module.exports = router;