const router = require('express').Router();
const usersRouter = require('./users');
const cardsRouter = require('./cards');
const notFoundRouter = require('./notFound');

router.use('/users', usersRouter);
router.use('/cards', cardsRouter);
router.use('*', notFoundRouter);

module.exports = router;
