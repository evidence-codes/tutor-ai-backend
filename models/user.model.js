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
            required: true
        },
        dateOfBirth: {
            type: Date,
            required: true,
            default: new Date(Date.now()).setFullYear(
                new Date().getFullYear() - 15,
            ),
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
        initialLevel: {
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
            default: 0,
        },
        lessons: {
            type: [
                {
                    id: {
                        type: Number,
                    },
                    score: {
                        type: Number,
                    },
                },
            ],
            default: [
                { id: 101, score: null },
                { id: 201, score: null },
                { id: 301, score: null },
                { id: 401, score: null },
                { id: 501, score: null },
            ],
        },
        exams: {
            type: [
                {
                    level: {
                        type: String,
                        enum: [
                            'Beginner',
                            'Pre-Intermediate',
                            'Intermediate',
                            'Upper-Intermediate',
                            'Confident',
                        ],
                    },
                    score: {
                        type: Number,
                    },
                },
            ],
            default: [
                { level: 'Beginner', score: null },
                { level: 'Pre-Intermediate', score: null },
                { level: 'Intermediate', score: null },
                { level: 'Upper-Intermediate', score: null },
                { level: 'Confident', score: null },
            ],
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
            type: String,
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
