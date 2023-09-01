const { ResourceNotFound } = require('../errors/httpErrors');
const { AdminVar } = require('../models/admin_var.model');
const ObjectId = require('mongodb').ObjectId;

const setAdminVariables = async (req, res) => {
    try {
        const adminVar = await AdminVar.findById(process.env.ADMIN_VAR_ID);
        if (!adminVar) {
            const adminVarData = new AdminVar({
                _id: ObjectId(process.env.ADMIN_VAR_ID),
                ...req.body,
            });
            adminVarData.save();
            res.status(200).json(adminVarData);
        } else {
            const adminVarData = await AdminVar.findByIdAndUpdate(
                process.env.ADMIN_VAR_ID,
                {
                    $set: req.body,
                },
                { new: true },
            );
            res.status(200).json(adminVarData);
        }
    } catch (err) {
        res.status(500).json(err?.message || 'An Error Occured!');
    }
};

const getAdminVariables = async (req, res) => {
    try {
        const adminVar = await AdminVar.findById(process.env.ADMIN_VAR_ID);
        if (!adminVar) {
            throw new ResourceNotFound('Admin Variables Data Not Found!');
        } else {
            res.status(200).json({
                ...adminVar?._doc,
                stripe_public_key: process.env.STRIPE_PUBLIC_KEY || '',
                flutterwave_public_key:
                    process.env.FLUTTER_WAVE_PUBLIC_KEY || '',
                google_cloud_key: process.env.GOOGLE_CLOUD_KEY || '',
            });
        }
    } catch (err) {
        res.status(500).json(err?.message || 'An Error Occured!');
    }
};

module.exports = { setAdminVariables, getAdminVariables };
