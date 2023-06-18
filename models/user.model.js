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
            unique: false
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
        level: {
            type: String,
            enum: [null, 'Beginner', 'Elementary', 'Intermediary', 'UpperIntermediary', 'Confident'],
            default: null
        },
        interests: {
            type: Array
        },
        language: {
            type: String
        },
        paymentStatus: {
            type: Boolean,
            default: false
        },
        dp: {
            public_id: {
                type: String
            },
            url: {
                type: String
            }
        },
        password: {
            type: String
        },
        verified: {
            type: Boolean,
            required: true,
            default: false
        }
    }, { timestamps: true }
)

const User = mongoose.model('User', userSchema);

module.exports = User;