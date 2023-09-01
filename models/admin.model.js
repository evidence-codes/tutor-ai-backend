const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        mobile: {
            type: String,
            required: true,
            unique: false
        },
        password: {
            type: String,
            required: true
        },
        priviledge: {
            type: String,
            enum: [
                'View Only'
            ],
            default: 'View Only'
        },
        dp: {
            public_id: {
                type: String,
            },
            url: {
                type: String,
            },
        },
    }
);

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
