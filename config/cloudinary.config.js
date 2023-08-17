const cloudinary = require('cloudinary').v2;
require('dotenv').config();

cloudinary.config({
    CLOUDINARY_NAME: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API,
    api_secret: process.env.CLOUDINARY_SECRET,
    secure: true,
});

module.exports = cloudinary;
