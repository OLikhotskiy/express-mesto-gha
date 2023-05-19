const router = require('express').Router();
const usersRouter = require('./users');
const cardsRouter = require('./cards');
const signinRouter = require('./signin');
const signupRouter = require('./signup');
const auth = require('../middlewares/auth');
const NotFound = require('../errors/NotFound');

router.use('/', signinRouter);
router.use('/', signupRouter);

router.use('/users', auth, usersRouter);
router.use('/cards', auth, cardsRouter);
router.use('*', (req, res, next) => {
  next(new NotFound('Cтраница не найдена'));
});

module.exports = router;
