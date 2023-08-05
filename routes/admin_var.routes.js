const router = require('express').Router();
const {
    setAdminVariables,
    getAdminVariables,
} = require('../controllers/admin_var.controller');

router.post('/set-variables', setAdminVariables);

router.get('/get-variables', getAdminVariables);

module.exports = router;
