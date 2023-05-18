const signupRouter = require('express').Router();
const { createUser } = require('../controllers/users');

signupRouter.post('/signup', createUser);
module.exports = signupRouter;
