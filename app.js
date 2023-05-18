const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const errorsCelebrate = require('celebrate').errors;
const { ERROR_SERVER } = require('./utils/constants');
const errorHandlers = require('./utils/handlers');
const router = require('./routes/index');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(express.json());
app.use(cookieParser());
app.use(errorsCelebrate());
app.use(errorHandlers);
app.use('/', router);

app.use((err, req, res, next) => {
  const { statusCode = ERROR_SERVER, message } = err;
  res.status(statusCode).send({ message: statusCode === ERROR_SERVER ? 'Ошибка сервера' : message });
  next();
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
