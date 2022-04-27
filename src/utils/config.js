/* eslint-disable no-undef */
const dotenv = require('dotenv');

dotenv.config();

const SECRET = process.env.SECRET;
const PORT = process.env.PORT;
const DATABASE_URL = process.env.DATABASE_URL;

module.exports = { SECRET, PORT, DATABASE_URL };