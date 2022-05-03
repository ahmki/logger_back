/* eslint-disable no-undef */
const dotenv = require('dotenv');

dotenv.config();

const SECRET = process.env.SECRET;
const PORT = process.env.PORT;
const DATABASE_URL = process.env.DATABASE_URL;

const OMDB_API_URL = process.env.OMDB_API_URL;
const OMDB_API_KEY = process.env.OMDB_API_KEY;

module.exports = {
  SECRET,
  PORT,
  DATABASE_URL,
  OMDB_API_KEY,
  OMDB_API_URL
};