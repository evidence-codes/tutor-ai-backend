const User = require("../models/user.model")

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
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email })
        !user && res.status(400).json('Invalid Email/Password!')

        user.password !== password && res.status(400).json('Invalid Email/Password')

        res.status(200).json(user)
    } catch (err) {
        res.status(500).json(err)
    }
}

module.exports = { register, login }