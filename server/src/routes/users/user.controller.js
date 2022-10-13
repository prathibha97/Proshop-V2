const asyncHandler = require('express-async-handler');
const generateToken = require('../../services/generateToken')
const User = require('../../models/User')

// @desc   Auth user & get token
// @route  Post /v1/api/Users
// @access Public
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        })
    } else {
        res.status(401)
        throw new Error("Invalid email or password")
    }
})

module.exports = { authUser }