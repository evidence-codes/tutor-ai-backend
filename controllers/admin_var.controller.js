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
            res.status(200).json(adminVar);
        }
    } catch (err) {
        res.status(500).json(err?.message || 'An Error Occured!');
    }
};

module.exports = { setAdminVariables, getAdminVariables };
