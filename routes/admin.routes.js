const router = require('express').Router();
const { create, login } = require('../controllers/admin.controller');

router.post('/create-admin', create)

router.post('/admin-login', login)

module.exports = router;