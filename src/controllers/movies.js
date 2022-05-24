const express = require('express');
const axios = require('axios');
const { OMDB_API_KEY, OMDB_API_URL } = require('../utils/config');

const router = express.Router();

router.get('/search/:term', async (req, res) => {
  // const searchTermFixed = req.body.searchTerm.replace(/ /g, '+');

  try {
    const result = await axios.get(
      `${OMDB_API_URL}?s=${req.params.term}&apikey=${OMDB_API_KEY}`
    );
    res.send(result.data);
  }
  catch (err) {
    console.log(err);
  }
});

router.get('/:id', async (req, res) => {

  try {
    const result = await axios.get(
      `${OMDB_API_URL}?i=${req.params.id}&apikey=${OMDB_API_KEY}`
    );
    res.send(result.data);
  }
  catch(err) {
    console.log(err);
  }
});

module.exports = router;