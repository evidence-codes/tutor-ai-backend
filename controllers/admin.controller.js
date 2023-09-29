const Admin = require('../models/admin.model');
const User = require('../models/user.model');
const Review = require('../models/review.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {
    ResourceNotFound,
    Unauthorized,
    Forbidden,
} = require('../errors/httpErrors');
const cloudinary = require('../config/cloudinary.config');
const axios = require('axios');
const ObjectId = require('mongodb').ObjectId;
const pagination_indexer = require('../utils/Pagination_Indexer');
const { application } = require('express');

const create = async (req, res) => {
    try {
        const { name, email, mobile, password, privilege, dp } = req.body;

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
            privilege,
            dp: {
                public_id: result.public_id,
                url: result.secure_url,
            },
        });

        const savedAdmin = await admin.save();
        res.status(200).json(savedAdmin);
    } catch (err) {
        res.status(500).json(err?.message || 'An Error Occured!');
    }
};

const login = async (req, res) => {
    try {
        let user;
        const { email: IncomingEmail, password: IncomingPassword } = req.body;
        user = await Admin.findOne({ email: IncomingEmail });
        if (!user) throw new ResourceNotFound('Invalid Email/Password!');
        const { password } = user;
        const compare = await bcrypt.compare(IncomingPassword, password);
        if (!compare)
            throw new ResourceNotFound({
                message: 'Invalid Email/Password',
            });
        const payload = {
            id: user._id,
        };
        if (!user.status) throw new Unauthorized('Account Disabled!');
        const accessToken = jwt.sign(payload, process.env.JWT_SEC);
        return res.status(200).json({ user, accessToken });
    } catch (err) {
        res.status(500).json(err?.message || 'An Error Occured!');
    }
};

const getAllAdmins = async (req, res) => {
    try {
        const adminInfo = await Admin.find();
        res.status(200).json({ adminInfo });
    } catch (err) {
        res.status(500).json(err?.message || 'An Error Occured!');
    }
};

const toggleAdminStatus = async (req, res) => {
    try {
        const admin_id = req.body.admin_id;
        const admin_status = req.body.admin_status || false;

        if (!admin_id) throw new ResourceNotFound('Invalid Admin ID!');

        await Admin.findByIdAndUpdate(admin_id, {
            status: admin_status,
        });
        res.status(200).json({ message: 'Updated!' });
    } catch (err) {
        res.status(500).json(err?.message || 'An Error Occured!');
    }
};

const deleteAdmins = async (req, res) => {
    const admins = req.body.admins;

    try {
        if (admins?.length <= 0) throw new Forbidden('Admin List Empty!');
        const objectIdsToDelete = admins.map(id => new ObjectId(id));
        await Admin.deleteMany({ _id: { $in: objectIdsToDelete } });

        res.status(200).json({ message: 'Admins deleted!' });
    } catch (err) {
        res.status(500).json(err?.message || 'An Error Occured!');
    }
};

const getAllDashboardInfo = async (req, res) => {
    try {
        const noOfUsers = await User.countDocuments();
        const noOfSubscribers = await User.countDocuments({
            payment: { $gt: 0 },
        });
        const noOfAdmins = await Admin.countDocuments();
        const recentReviews = await Review.find()
            .sort({ createdAt: -1 })
            .limit(5);

        res.status(200).json({
            noOfUsers,
            noOfSubscribers,
            noOfAdmins,
            recentReviews,
        });
    } catch (err) {
        res.status(500).json(err?.message || 'An Error Occured!');
    }
};

const getAllReviews = async (req, res) => {
    try {
        const pagination_index = req.query.pagination_index;
        const query_f_i = pagination_indexer(pagination_index, 50)?.first_index;
        const query_l_i = pagination_indexer(pagination_index, 50)?.last_index;

        const reviews = await Review.find()
            .sort({ createdAt: -1 })
            .skip(query_f_i)
            .limit(query_l_i);

        res.status(200).json(reviews);
    } catch (err) {
        res.status(500).json(err?.message || 'An Error Occured!');
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();

        res.status(200).json(users);
    } catch (err) {
        res.status(500).json(err?.message || 'An Error Occured!');
    }
};

const newSignup = async (req, res) => {
    try {
        const users = await User.find({ payment: 0 });
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json(err?.message || 'An Error Occured!');
    }
};

const subscribers = async (req, res) => {
    try {
        const subscribers = await User.find().where('payment').gt(0).exec();
        res.status(200).json(subscribers);
    } catch (err) {
        res.status(500).json(err?.message || 'An Error Occured!');
    }
};

const listInvoice = async (req, res) => {
    const accessToken = await getAccessToken();
    try {
        const invoices = await axios.get(
            'https://api-m.sandbox.paypal.com/v2/invoicing/invoices?total_required=true',
            {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
            },
        );
        res.status(200).json(invoices.data);
    } catch (err) {
        res.status(500).json(err?.message || 'An Error Occured!');
    }
};

const sendInvoice = async (req, res) => {
    const { invoice_id } = req.body;
    const accessToken = await getAccessToken();
    try {
        const sent = await axios.post(
            `https://api-m.sandbox.paypal.com/v2/invoicing/invoices/${invoice_id}/send`,
            {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                    'PayPal-Request-Id': `${process.env}`
                }
            }
        );
        res.status(200).json(sent.data);
    } catch (err) {
        res.status(500).json(err?.message);
    }
};

const getAccessToken = async () => {
    const authHeader = Buffer.from(
        `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`,
    ).toString('base64');
    const response = await axios.post(
        'https://api-m.sandbox.paypal.com/v1/oauth2/token',
        'grant_type=client_credentials',
        {
            headers: {
                Authorization: `Basic ${authHeader}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        },
    );

    return response.data.access_token;
};

module.exports = {
    create,
    login,
    getAllUsers,
    newSignup,
    subscribers,
    listInvoice,
    sendInvoice,
    getAllAdmins,
    toggleAdminStatus,
    deleteAdmins,
    getAllDashboardInfo,
    getAllReviews,
};
