const User = require("../models/user.model");
const OTP = require("../models/otp.model");
const cloudinary = require("../config/cloudinary.config");
const { ResourceNotFound, BadRequest } = require("../errors/httpErrors");
const { signupEmail } = require("../services/email.service")


const register = async (req, res) => {
    const { fullname, mobile, email, dateOfBirth, dp } = req.body;

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
        }
    })

    const savedUser = await user.save()

    // Generate OTP
    const otp = generateOTP();
    const otpDoc = new OTP({ otp, user: user._id });
    await otpDoc.save()

    await signupEmail(email, otp)

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

function generateOTP() {
    return `${Math.floor(Math.random() * 10)} ${Math.floor(Math.random() * 10)} ${Math.floor(Math.random() * 10)} ${Math.floor(Math.random() * 10)}`
}

module.exports = { register, login }