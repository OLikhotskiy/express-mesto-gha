require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const errorsCelebrate = require('celebrate').errors;
const errorHandlers = require('./utils/handlers');
const router = require('./routes/index');

const { PORT = 3000 } = process.env;
mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use('/', router);
app.use(errorsCelebrate());
app.use(errorHandlers);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
