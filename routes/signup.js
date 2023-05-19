const signupRouter = require('express').Router();
const { createUser } = require('../controllers/users');
const { validSignup } = require('../middlewares/validateUsers');

signupRouter.post('/signup', validSignup, createUser);
module.exports = signupRouter;
