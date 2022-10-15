const express = require('express');
const { authUser,
    getUserProfile,
    registerUser,
    UpdateUserProfile,
    getUsers
} = require('./user.controller')
const { protect, admin } = require('../../middleware/authMiddleware')

const userRouter = express.Router();

userRouter.route('/').post(registerUser).get(protect, admin, getUsers)
userRouter.post('/login', authUser);
userRouter.route('/profile').get(protect, getUserProfile).put(protect, UpdateUserProfile)


module.exports = { userRouter };