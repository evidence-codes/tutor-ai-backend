const Admin = require("../models/admin.model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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

const login = async (req, res) => {
    try {
        let user;
        const { email: IncomingEmail, password: IncomingPassword } = req.body;
        user = await User.findOne({ email: IncomingEmail });
        if (!user) throw new ResourceNotFound('Invalid Email/Password ');
        const { password } = user;
        const compare = await bcrypt.compare(IncomingPassword, password);
        if (!compare)
            throw new ResourceNotFound({ message: 'Invalid Email/Password' });
        const payload = {
            id: user._id,
        };
        const accessToken = jwt.sign(payload, process.env.JWT_SEC);
        return res.status(200).json({ user, accessToken });
    } catch (err) {
        res.status(500).json(err?.message || 'An Error Occured!');
    }
};
module.exports = {
    create,
    login
}