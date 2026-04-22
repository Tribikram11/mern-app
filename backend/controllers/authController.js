const asyncHandler = require('../utils/asyncHandler')
const AppError = require('../utils/AppError')
const User = require('../model/user')
const { generateAccessToken,
    generateRefreshToken,
    verifyRefreshToken } = require('../utils/tokenUtils')

// register user
const register = asyncHandler(async (req, res) => {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email })

    if (existingUser) {
        throw new AppError('email is already registered', 400)

    }

    const newUser = await User.create({ name, email, password, role })

    const accessToken = generateAccessToken(newUser._id, newUser.role)
    const refreshToken = generateRefreshToken(newUser._id)

    newUser.refreshToken = refreshToken;
    await newUser.save({ validateBeforeSave: false })

    res.status(201).json({
        success: true,
        message: 'registration successful',
        accessToken,
        refreshToken,
        newUser: {
            id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            role: newUser.role
        }

    })

})

// login
const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new AppError('email and password required', 400)
    }

    const user = await User.findOne({ email }).select('+password')

    if (!user) {
        throw new AppError('invalid email or password', 401)
    }

    const checkPassword = await user.comparePassword(password)
    if (!checkPassword) {
        throw new AppError('invalid email or password', 401)
    }

    const accessToken = generateAccessToken(user._id, user.role)
    const refreshToken = generateRefreshToken(user._id)

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false })

    res.status(200).json({
        success: true,
        message: 'Login successful',
        accessToken,
        refreshToken,
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        }

    })
})

// refresh token
const refresh = asyncHandler(async (req, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
        throw new AppError('refresh token required', 400)
    }

    let decoded;
    try {
        decoded = verifyRefreshToken(refreshToken)
    } catch (error) {
        throw new AppError('invalid or exparied refresh token', 401)
    }

    const user = await User.findById(decoded.userId).select('+refreshToken')

    if (!user || user.refreshToken !== refreshToken) {
        throw new AppError('invalid refresh token', 401)
    }

    // issue new token
    const newAccessToken = generateAccessToken(user._id, user.role)
    const newRefreshToken = generateRefreshToken(user._id)

    user.refreshToken = newRefreshToken;
    await user.save({ validateBeforeSave: false })

    res.status(200).json({
        success: true,
        accessToken: newAccessToken,
        refreshToken: newRefreshToken
    })

})


// log out
const logout = asyncHandler(async (req, res) => {
    const { refreshToken } = req.body;

    if (refreshToken) {
        await User.findOneAndUpdate(
            { refreshToken },
            { refreshToken: null }
        )
    }

    res.status(200).json({
        success: true,
        message: 'logged out successfully'
    })
})


// get current user
const getUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.userId)

    if (!user) {
        throw new AppError('user not found', 404);
    }

    res.status(200).json({
        success: true,
        data: user
    })
})

module.exports = {
    register, login, logout, refresh, getUser
}
