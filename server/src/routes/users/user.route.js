const express = require('express');
const { authUser, getUserProfile, registerUser } = require('./user.controller')
const protect = require('../../middleware/authMiddleware')

const userRouter = express.Router();

userRouter.route('/').post(registerUser)
userRouter.post('/login', authUser);
userRouter.route('/profile').get(protect, getUserProfile)


module.exports = { userRouter };