const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        fullname: {
            type: String,
            required: true,
        },
        mobile: {
            type: String,
            required: true,
            unique: false,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        dateOfBirth: {
            type: Date,
            required: true,
            default: Date.now,
        },
        level: {
            type: String,
            enum: [
                null,
                'Beginner',
                'Pre-Intermediate',
                'Intermediate',
                'Upper-Intermediate',
                'Confident',
            ],
            default: null,
        },
        interests: {
            type: Array,
        },
        language: {
            type: String,
        },
        study_target: {
            type: Number,
        },
        payment: {
            type: Number,
            default: 0
        },
        lessons: {
            type: Array
        },
        dp: {
            public_id: {
                type: String,
            },
            url: {
                type: String,
            },
        },
        parental_control: {
            type: String
        },
        password: {
            type: String,
        },
        verified: {
            type: Boolean,
            required: true,
            default: false,
        },
    },
    { timestamps: true },
);

const User = mongoose.model('User', userSchema);

module.exports = User;
