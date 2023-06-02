const User = require("../models/user.model")
const cloudinary = require("../config/cloudinary.config");
const { ResourceNotFound, BadRequest } = require("../errors/httpErrors");


const register = async (req, res) => {
    const { fullname, mobile, email, dateOfBirth, dp, password } = req.body;

    const result = await cloudinary.uploader.upload(dp, {
        folder: "profile_pics"
    })

    const user = new User({
        fullname,
        mobile,
        email,
        dateOfBirth,
        dp: {
            public_id: result.public_id,
            url: result.secure_url
        },
        password
    })

    const savedUser = await user.save()
    res.status(200).json(savedUser)
}

const login = async (req, res) => {
    let user;
    const unAuthMessage = "Invalid email/password";
    const { email: IncomingEmail, password: IncomingPassword } = req.body;


    user = await User.findOne({ email: IncomingEmail })

    if (!user) throw new ResourceNotFound("Invalid Email/Password ");

    const { password } = user;

    if (!Object.is(IncomingPassword, password)) throw new BadRequest(unAuthMessage);


    // const { password, __v, ...others } = user._doc

    return res.status(200).json(user);
}

module.exports = { register, login }