const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'this field is required'],
            trim: true
        },
        email: {
            type: String,
            unique: true,
            required: [true, 'this field is required'],
            trim: true,
            lowercase: true
        },
        password:{
            type:String,
            required:[true, 'this field is required'],
            minlength: [8, 'password must be at least 8 characters long'],
            maxlength: [32, 'password must be at most 32 characters long'],
            select:false
        },
        role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user'
        },
        refreshToken:{
            type:String,
            select:false
        }

    },
    {
        timestamps: true
    }
);


// hash pass
userSchema.pre('save', async function(){
    if(!this.isModified('password')) return;

    this.password = await bcrypt.hash(this.password, 10);
})

// compare
userSchema.methods.comparePassword = async function(userPassword){
    return await bcrypt.compare(userPassword, this.password);
}




const User = mongoose.model('User',userSchema);

module.exports = User;