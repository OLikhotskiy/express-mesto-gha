const router = require('express').Router();
const usersRouter = require('./users');
const notFoundRouter = require('./notFound');

router.use('/users', usersRouter);
router.use('*', notFoundRouter);

module.exports = router;
