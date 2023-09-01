const Admin = require("../models/admin.model");
const bcrypt = require('bcrypt');
const { ResourceNotFound, BadRequest } = require('../errors/httpErrors');
const cloudinary = require('../config/cloudinary.config');

const create = async (req, res) => {
    try {
        const { name, email, mobile, password, priviledge, dp } = req.body;

        const result = await cloudinary.uploader.upload(dp, {
            folder: 'profile_pics',
        });

        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(password, salt);

        const admin = new Admin({
            name,
            email,
            mobile,
            password: hash,
            priviledge,
            dp: {
                public_id: result.public_id,
                url: result.secure_url,
            }
        });

        const savedAdmin = await admin.save()
        res.status(200).json(savedAdmin)
    } catch (err) {
        res.status(500).json(err)
    }
}

module.exports = {
    create
}