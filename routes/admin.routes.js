const router = require('express').Router();
const {
    setAdminVariables,
    getAdminVariables,
} = require('../controllers/admin.controller');

router.post('/set-variables', setAdminVariables);

router.get('/get-variables', getAdminVariables);

module.exports = router;
