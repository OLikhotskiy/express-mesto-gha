const signinRouter = require('express').Router();
const { login } = require('../controllers/users');

signinRouter.post('/signin', login);
module.exports = signinRouter;
