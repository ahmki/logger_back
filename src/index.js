const express = require('express');
const cors = require('cors');

const config = require('./utils/config');

const loginRouter = require('./controllers/login');
const userRouter = require('./controllers/users');
const logRouter = require('./controllers/logs');
const movieRouter = require('./controllers/movies');

const db = require('./utils/db');

const app = express();


app.use(cors());
app.use(express.json());

app.get('/ping', (_req, res) => {
  console.log('pinged');
  res.send('pong');
});

app.use('/api/logs', logRouter);
app.use('/api/users', userRouter);
app.use('/api/login', loginRouter);
app.use('/api/movies', movieRouter);

const start = async () => {
  await db.connectToDb();
  app.listen(config.PORT, () => {
    console.log(`Server running on port ${config.PORT}`);
  });
};

start();