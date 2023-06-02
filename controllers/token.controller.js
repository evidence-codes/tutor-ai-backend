const { BadRequest, ResourceNotFound } = require("../errors/httpErrors");
const OTP = require("../models/otp.model")
const User = require("../models/user.model");
const { signupEmail } = require("../services/email.service");

const verifyOTP = async (req, res) => {
    const { otp } = req.body;

    const otpDoc = await OTP.findOne({ user: req.params.id, otp })

    if (!otpDoc) throw new BadRequest("Wrong Code")

    await otpDoc.deleteOne()
    res.status(200).json({ message: "Successful" })
}

const resendOTP = async (req, res) => {
    const user = await User.findById(req.params.id)

    if (!user) throw new ResourceNotFound('User not found!')

    const latestOTP = await OTP.findOne({ user: user._id }).sort({ createdAt: -1 })

    if (latestOTP) {
        // Generate new OTP
        const newOTP = generateOTP()
        latestOTP.otp = newOTP;
        latestOTP.expiresAt = new Date(new Date().getTime() + 30 * 1000)
        await latestOTP.save();

        await signupEmail(user.email, newOTP)
        res.status(200).json({ message: "Resend OTP successful.." })
    }

    const otp = generateOTP();
    const otpDoc = new OTP({ otp, user: user._id });
    await otpDoc.save()

    await signupEmail(user.email, otp)
    res.status(200).json({ message: "New OTP generated successfully" })
}

function generateOTP() {
    return `${Math.floor(Math.random() * 10)} ${Math.floor(Math.random() * 10)} ${Math.floor(Math.random() * 10)} ${Math.floor(Math.random() * 10)}`
}

module.exports = {
    verifyOTP,
    resendOTP
}