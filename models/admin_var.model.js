const mongoose = require('mongoose');

const defaultAdminVarData = {
    _id: process.env.ADMIN_VAR_ID,
    pricing: [
        {
            id: 1,
            no_of_lessons: 8,
            price: 2,
            plan: 'plan_1',
            thirty_mins: false,
            discount: 0,
        },
        {
            id: 2,
            no_of_lessons: 24,
            price: 1.7,
            plan: 'plan_2',
            thirty_mins: false,
            discount: 0,
        },
        {
            id: 3,
            no_of_lessons: 48,
            price: 1.5,
            plan: 'plan_3',
            thirty_mins: false,
            discount: 0,
        },
        {
            id: 4,
            no_of_lessons: 16,
            price: 0.5,
            plan: 'plan_4',
            thirty_mins: true,
            discount: 0,
        },
        {
            id: 5,
            no_of_lessons: 24,
            price: 0.4167,
            plan: 'plan_5',
            thirty_mins: true,
            discount: 0,
        },
        {
            id: 6,
            no_of_lessons: 36,
            price: 0.361,
            plan: 'plan_6',
            thirty_mins: true,
            discount: 0,
        },
    ],
    mail: 'mailto:info@tutorai-app.com',
    whatsapp: 'https://wa.me/+994702159088',
    instagram: 'https://www.instagram.com',
    facebook: 'https://www.facebook.com',
    twitter: 'https://www.twitter.com',
    website: 'https://www.google.com',
    enable_paypal: true,
    enable_stripe: false,
    enable_flutterwave: false,
};

const adminVarSchema = new mongoose.Schema(
    {
        pricing: {
            type: [
                {
                    id: Number,
                    no_of_lessons: Number,
                    price: Number,
                    plan: String,
                    thirty_mins: Boolean,
                    discount: Number,
                },
            ],
            default: defaultAdminVarData.pricing,
        },
        mail: {
            type: String,
            default: defaultAdminVarData.mail,
        },
        whatsapp: {
            type: String,
            default: defaultAdminVarData.whatsapp,
        },
        instagram: {
            type: String,
            default: defaultAdminVarData.instagram,
        },
        facebook: {
            type: String,
            default: defaultAdminVarData.facebook,
        },
        twitter: {
            type: String,
            default: defaultAdminVarData.twitter,
        },
        website: {
            type: String,
            default: defaultAdminVarData.website,
        },
        enable_paypal: {
            type: Boolean,
            default: defaultAdminVarData.enable_paypal,
        },
        enable_stripe: {
            type: Boolean,
            default: defaultAdminVarData.enable_stripe,
        },
        enable_flutterwave: {
            type: Boolean,
            default: defaultAdminVarData.enable_flutterwave,
        },
    },
    { timestamps: false },
);

const AdminVar = mongoose.model('AdminVar', adminVarSchema);

module.exports = { AdminVar, defaultAdminVarData };
