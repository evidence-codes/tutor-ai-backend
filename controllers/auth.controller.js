const User = require("../models/user.model")
const cloudinary = require("../config/cloudinary.config")

const register = async (req, res) => {
    const { fullname, mobile, email, dateOfBirth, password } = req.body;

    const user = new User({
        fullname,
        mobile,
        email,
        dateOfBirth,
        password
    })

    try {
        const savedUser = await user.save()
        res.status(200).json(savedUser)
    } catch (err) {
        res.status(500).json(err)
    }
}

const login = async (req, res) => {
    let user;
    const unAuthMessage = "Invalid email/password";
    const { email: IncomingEmail, password: IncomingPassword } = req.body;

    try {
        user = await User.findOne({ email: IncomingEmail })
    } catch (err) {
        return res.status(400).json('Could not authenticate User');
    }


    if (!Boolean(user)) return res.status(400).json(unAuthMessage)

    const { password } = user;

    if (!Object.is(IncomingPassword, password)) {
        return res.status(400).json(unAuthMessage);
    }


    // const { password, __v, ...others } = user._doc

    return res.status(200).json(user);
}

module.exports = { register, login }