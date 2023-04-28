const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/index');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: '644ae59a90530f991401950f',
  };

  next();
});

app.use('/', router);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
