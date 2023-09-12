const mongoose = require('mongoose');

const defaultAdminVarData = {
    _id: process.env.ADMIN_VAR_ID,
    mail: 'mailto:info@tutorai-app.com',
    whatsapp: 'https://wa.me/+994702159088',
    instagram: 'https://www.instagram.com',
    facebook: 'https://www.facebook.com',
    twitter: 'https://www.twitter.com',
    website: 'https://www.google.com',
    enable_paypal: true,
    enable_stripe: false,
    enable_flutterwave: false,
    price_for_plan_conversion: 0.5,
};

const adminVarSchema = new mongoose.Schema(
    {
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
        price_for_plan_conversion: {
            type: Number,
            default: defaultAdminVarData.price_for_plan_conversion,
        },
    },
    { timestamps: false },
);

const AdminVar = mongoose.model('AdminVar', adminVarSchema);

module.exports = { AdminVar, defaultAdminVarData };
