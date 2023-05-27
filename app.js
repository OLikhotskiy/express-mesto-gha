require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const errorsCelebrate = require('celebrate').errors;
const errorHandlers = require('./utils/handlers');
const router = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const cors = require('./middlewares/cors');

const { PORT = 3000 } = process.env;
mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

const app = express();

app.use(cors);
app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(requestLogger);
app.use('/', router);
app.use(errorLogger);
app.use(errorsCelebrate());
app.use(errorHandlers);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
