const User = require("../models/user.model")
const bcrypt = require("bcrypt")
const { ResourceNotFound, BadRequest } = require("../errors/httpErrors")
const { resetPasswordEmail } = require("../services/email.service")

const update = async (req, res) => {

    const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, { new: true })
    res.status(200).json(user)
}

const forgotPassword = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email })

    if (!user) throw new ResourceNotFound('Email does not exist')

    const password = userIdGenerator()
    user.password = password;
    await user.save();

    await resetPasswordEmail(email, password)
    res.status(200).json({ message: "Temp password sent successfully..." })
}

const setPassword = async (req, res) => {
    const { temp, password } = req.body;

    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);

    const user = await User.findById(req.params.id)
    if (!user) throw new ResourceNotFound('User does not exist')

    if (temp !== user.password) throw new BadRequest('Old password does not match')

    user.password = hash;
    await user.save();

    res.status(200).json({ message: "Password changed successfully..." })
}

const userIdGenerator = () => {
    let characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let randomID = '';
    for (let i = 0; i < 7; i++) {
        randomID += characters.charAt(Math.floor(Math.random() * characters.length))
    }
    return randomID;
}

module.exports = { update, forgotPassword, setPassword }