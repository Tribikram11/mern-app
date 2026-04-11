const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'this field is required'],
            trim: true
        },
        email: {
            type: String,
            unique: true,
            required: true,
            trim: true,
            lowercase: true
        },
        age: {
            type: Number,
            min: [0, 'it can not be less than 0'],
            max: [120, 'are you sure']

        },
        role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user'
        },
        isActive: {
            type: Boolean,
            default: true
        },

    },
    {
        timestamps: true
    }
);

const User = mongoose.model('User',userSchema);

module.exports = User;