const mongoose = require("mongoose")

const userSchema = new mongoose.Schema(
    {
        fullname: {
            type: String,
            required: true
        },
        mobile: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        dateOfBirth: {
            type: Date,
            required: true,
            default: Date.now
        },
        password: {
            type: String,
            required: true
        }
    }, { timestamps: true }
)

const User = mongoose.model('User', userSchema);

module.exports = User;