const mongoose = require('mongoose');

const defaultAdminData = {
    _id: process.env.ADMIN_ID,
    pricing: [
        {
            id: 1,
            no_of_lessons: 8,
            price: 2,
            plan: 'plan_1',
            thirty_mins: false,
        },
        {
            id: 2,
            no_of_lessons: 24,
            price: 1.7,
            plan: 'plan_2',
            thirty_mins: false,
        },
        {
            id: 3,
            no_of_lessons: 48,
            price: 1.5,
            plan: 'plan_3',
            thirty_mins: false,
        },
        {
            id: 4,
            no_of_lessons: 16,
            price: 0.5,
            plan: 'plan_4',
            thirty_mins: true,
        },
        {
            id: 5,
            no_of_lessons: 24,
            price: 0.4167,
            plan: 'plan_5',
            thirty_mins: true,
        },
        {
            id: 6,
            no_of_lessons: 36,
            price: 0.361,
            plan: 'plan_6',
            thirty_mins: true,
        },
    ],
    mail: 'mailto:info@tutorai-app.com',
    whatsapp: 'https://wa.me/+994702159088',
    instagram: 'https://www.instagram.com',
    facebook: 'https://www.facebook.com',
    twitter: 'https://www.twitter.com',
    website: 'https://www.google.com',
};

const adminSchema = new mongoose.Schema(
    {
        pricing: {
            type: [
                {
                    id: Number,
                    no_of_lessons: Number,
                    price: Number,
                    plan: String,
                    thirty_mins: Boolean,
                },
            ],
            default: [
                {
                    id: 1,
                    no_of_lessons: 8,
                    price: 2,
                    plan: 'plan_1',
                    thirty_mins: false,
                },
                {
                    id: 2,
                    no_of_lessons: 24,
                    price: 1.7,
                    plan: 'plan_2',
                    thirty_mins: false,
                },
                {
                    id: 3,
                    no_of_lessons: 48,
                    price: 1.5,
                    plan: 'plan_3',
                    thirty_mins: false,
                },
                {
                    id: 4,
                    no_of_lessons: 16,
                    price: 0.5,
                    plan: 'plan_4',
                    thirty_mins: true,
                },
                {
                    id: 5,
                    no_of_lessons: 24,
                    price: 0.4167,
                    plan: 'plan_5',
                    thirty_mins: true,
                },
                {
                    id: 6,
                    no_of_lessons: 36,
                    price: 0.361,
                    plan: 'plan_6',
                    thirty_mins: true,
                },
            ],
        },
        mail: {
            type: String,
            default: 'mailto:info@tutorai-app.com',
        },
        whatsapp: {
            type: String,
            default: 'https://wa.me/+994702159088',
        },
        instagram: {
            type: String,
            default: 'https://www.instagram.com',
        },
        facebook: {
            type: String,
            default: 'https://www.facebook.com',
        },
        twitter: {
            type: String,
            default: 'https://www.twitter.com',
        },
        website: {
            type: String,
            default: 'https://www.google.com',
        },
    },
    { timestamps: false },
);

const Admin = mongoose.model('Admin', adminSchema);

module.exports = { Admin, defaultAdminData };
