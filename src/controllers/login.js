const express = require('express');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { SECRET } = require('../utils/config');

const router = express.Router();

router.post('/', async (req, res) => {
  const body = req.body;

  const user = await User.findOne({
    where: {
      username: body.username
    }
  });

  if (user) {
    const passwordCorrect = await user.validatePassword(body.password);

    if (passwordCorrect) {
      const userToken = {
        username: user.username,
        id: user.id,
      };

      const token = jwt.sign(userToken, SECRET);

      res.status(200).send({
        token, username: user.username
      });
    }
    else {
      return res.status(401).json({
        error: 'invalid password'
      });
    }
  }
  else {
    return res.status(401).json({
      error: 'invalid username'
    });
  }

});

module.exports = router;