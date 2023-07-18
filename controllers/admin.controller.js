const { ResourceNotFound } = require('../errors/httpErrors');
const { Admin } = require('../models/admin.model');
const ObjectId = require('mongodb').ObjectId;

const setAdminVariables = async (req, res) => {
    try {
        const admin = await Admin.findById(process.env.ADMIN_ID);
        if (!admin) {
            const admin_data = new Admin({
                _id: ObjectId(process.env.ADMIN_ID),
                ...req.body,
            });
            admin_data.save();
            res.status(200).json(admin_data);
        } else {
            const admin_data = await Admin.findByIdAndUpdate(
                process.env.ADMIN_ID,
                {
                    $set: req.body,
                },
                { new: true },
            );
            res.status(200).json(admin_data);
        }
    } catch (err) {
        res.status(500).json(err?.message || 'An Error Occured!');
    }
};

const getAdminVariables = async (req, res) => {
    try {
        const admin = await Admin.findById(process.env.ADMIN_ID);
        if (!admin) {
            throw new ResourceNotFound('Admin Data Not Found!');
        } else {
            res.status(200).json(admin);
        }
    } catch (err) {
        res.status(500).json(err?.message || 'An Error Occured!');
    }
};

module.exports = { setAdminVariables, getAdminVariables };
