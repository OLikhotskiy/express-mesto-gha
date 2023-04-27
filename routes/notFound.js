const notFoundRouter = require('express').Router();
const { notFound } = require('../utils/handlers');

notFoundRouter.all('/*', notFound);

module.exports = notFoundRouter;
