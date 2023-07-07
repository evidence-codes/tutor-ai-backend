const User = require('../models/user.model');
const OTP = require('../models/otp.model');
const cloudinary = require('../config/cloudinary.config');
const {
    ResourceNotFound,
    BadRequest,
    BaseError,
} = require('../errors/httpErrors');
const { signupEmail } = require('../services/email.service');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    try {
        const { fullname, mobile, email, dateOfBirth, dp, parental_control } =
            req.body;

        const result = await cloudinary.uploader.upload(dp, {
            folder: 'profile_pics',
        });

        const user = new User({
            fullname,
            mobile,
            email,
            dateOfBirth,
            dp: {
                public_id: result.public_id,
                url: result.secure_url,
            },
        });

        const age = calculateAge(dateOfBirth);

        if (age <= 15) {
            user.parental_control = generateOTP();
        }

        const exists = await User.findOne({ email })
        if (exists.verified === true) {
            throw new BadRequest('User has already registered!')
        }

        const savedUser = await user.save();

        function calculateAge(dateOfBirth) {
            const today = new Date();
            const birthDate = new Date(dateOfBirth);

            let age = today.getFullYear() - birthDate.getFullYear();

            const hasBirthdayPassed =
                today.getMonth() < birthDate.getMonth() ||
                (today.getMonth() === birthDate.getMonth() &&
                    today.getDate() < birthDate.getDate());

            if (hasBirthdayPassed) {
                age--;
            }

            return age;
        }

        // Generate OTP
        const otp = String(generateOTP());
        const otpDoc = new OTP({ otp, user: user._id });
        await otpDoc.save();

        await signupEmail(email, otp);

        res.status(200).json(savedUser);
    } catch (err) {
        res.status(500).json(err?.message || 'An Error Occured!');
    }
};

const password = async (req, res) => {
    try {
        const { password } = req.body;

        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(password, salt);

        const user = await User.findById(req.params.id);

        if (!user) throw new ResourceNotFound('User account not found');

        if (!user.verified) throw new BadRequest('User not verified');

        user.password = hash;
        await user.save();

        const payload = {
            id: user._id,
        };

        const accessToken = jwt.sign(payload, process.env.JWT_SEC);

        res.status(200).json({
            message: 'Password added successfully...',
            password: hash,
            accessToken,
        });
    } catch (err) {
        res.status(500).json(err?.message || 'An Error Occured!');
    }
};

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

const generateOTP = () => {
    return `${Math.floor(Math.random() * 10)} ${Math.floor(
        Math.random() * 10,
    )} ${Math.floor(Math.random() * 10)} ${Math.floor(Math.random() * 10)}`;
};

module.exports = { register, login, password };
