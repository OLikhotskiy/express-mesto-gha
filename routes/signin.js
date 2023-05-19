const signinRouter = require('express').Router();
const { login } = require('../controllers/users');
const { validSignin } = require('../middlewares/validateUsers');

signinRouter.post('/signin', validSignin, login);
module.exports = signinRouter;
