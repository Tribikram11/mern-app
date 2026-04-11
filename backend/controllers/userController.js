const User = require("../model/user");
const AppError = require("../utils/AppError");
const asyncHandler = require("../utils/asyncHandler")

// read with filter
const readWithFilter = asyncHandler(async (req, res) => {

    const users = await User.find({ isActive: true })

    if (users.length === 0) {
        throw new AppError('no active users found', 404)
    }

    res.status(200).json({
        success: true,
        data: users,
        count: users.length
    })

})

// read by id
const readById = asyncHandler(async (req, res) => {

    const user = await User.findById(req.params.id)

    if (!user) {
        throw new AppError("user not found", 404)
    }
    res.status(200).json({
        success: true,
        data: user
    })
})

// // create user
const createUser = asyncHandler(async (req, res) => {

    const { name, email, age, role } = req.body;

    const newUser = await User.create({ name, email, age, role });
    res.status(201).json({
        success: true,
        message: "new user created",
        data: newUser
    })


})

const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            returnDocument: 'after',
            runValidators: true
        });

    if (!user) {
        throw new AppError("user not found", 404)
    }

    res.status(200).json({
        success: true,
        data: user
    })

})

const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
        throw new AppError('User not found', 404);
    }

    res.status(200).json({
        success: true,
        message: 'User deleted successfully'
    });
});


module.exports = { createUser, readById, readWithFilter, updateUser, deleteUser }