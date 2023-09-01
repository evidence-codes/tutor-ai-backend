const router = require('express').Router();
const { create } = require('../models/admin.model');

router.post('/create-admin', create)

module.exports = router;