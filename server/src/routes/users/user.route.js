const express = require('express');
const {  authUser} = require('./user.controller')

const userRouter = express.Router();


userRouter.post('/login', authUser);


module.exports = { userRouter };