const User = require("../models/user.model")
const bcrypt = require("bcrypt")
const { ResourceNotFound, BadRequest } = require("../errors/httpErrors")
const cloudinary = require("../config/cloudinary.config");
const { resetPasswordEmail } = require("../services/email.service")

const update = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true })
        res.status(200).json(user)
    } catch (err) {
        res.status(500).json(err)
    }

}

const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email })

        if (!user) throw new ResourceNotFound('Email does not exist')

        const password = userIdGenerator()
        user.password = password;
        await user.save();

        await resetPasswordEmail(email, password)
        res.status(200).json({ message: "Temp password sent successfully..." })
    } catch (err) {
        res.status(500).json(err)
    }

}

const setPassword = async (req, res) => {
    try {
        const { temp, password } = req.body;

        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(password, salt);

        const user = await User.findById(req.params.id)
        if (!user) throw new ResourceNotFound('User does not exist')

        if (temp !== user.password) throw new BadRequest('Old password does not match')

        user.password = hash;
        await user.save();

        res.status(200).json({ message: "Password changed successfully...", password: hash })
    } catch (err) {
        res.status(500).json(err)
    }

}

const changePassword = async (req, res) => {
    try {
        const { old, password } = req.body;

        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(password, salt);

        const user = await User.findById(req.params.id)
        if (!user) throw new ResourceNotFound('User does not exist')

        // if (temp !== user.password) throw new BadRequest('Old password does not match')
        const compare = await bcrypt.compare(old, user.password)
        if (!compare) throw new BadRequest('Old password does not match!')

        user.password = hash;
        await user.save();

        res.status(200).json({ message: "Password changed successfully...", password: hash })
    } catch (err) {
        res.status(500).json(err)
    }

}

const setLanguage = async (req, res) => {
    try {
        const { language, study_target, interests } = req.body;

        const user = await User.findById(req.params.id);
        if (!user) throw new ResourceNotFound('User does not exist');

        user.language = language;
        user.study_target = study_target;
        user.interests = interests;

        await user.save();

        res.status(200).json({ message: "User Language and interests added successfully" })
    } catch (err) {
        res.status(500).json(err)
    }

}

const changeDp = async (req, res) => {
    try {
        const {dp } = req.body;
        const user = await User.findById(req.params.id);
        if (!user) throw new ResourceNotFound('User does not exist');
         const result = await cloudinary.uploader.upload(dp, {
            folder: "profile_pics",
            public_id: user.dp.public_id
        })
        user.dp = {
                public_id: result.public_id,
                url: result.secure_url
            }
            await user.save()
            res.status(200).json({ message: "User picture updated successfully!", dp_url: result.secure_url })
    } catch (err) {
        res.status(500).json(err)
    }
}

const userIdGenerator = () => {
    let characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let randomID = '';
    for (let i = 0; i < 7; i++) {
        randomID += characters.charAt(Math.floor(Math.random() * characters.length))
    }
    return randomID;
}

module.exports = { update, forgotPassword, setPassword, changePassword, setLanguage, changeDp }