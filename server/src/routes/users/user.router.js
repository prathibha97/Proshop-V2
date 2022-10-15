const express = require('express');
const {
    authUser,
    getUserProfile,
    registerUser,
    updateUserProfile,
    getUsers,
    deleteUser,
    getUserById,
    updateUser
} = require('./user.controller')
const { protect, admin } = require('../../middleware/authMiddleware')

const userRouter = express.Router();

userRouter.route('/').post(registerUser).get(protect, admin, getUsers)

userRouter.post('/login', authUser);
userRouter
    .route('/profile')
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile)

userRouter
    .route('/:id')
    .delete(protect, admin, deleteUser)
    .get(protect, admin, getUserById)
    .put(protect, admin, updateUser)


module.exports = { userRouter };