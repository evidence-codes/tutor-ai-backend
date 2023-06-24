const router = require('express').Router();
const { verifyOTP, resendOTP } = require('../controllers/token.controller');

router.post('/verify/:id', verifyOTP);

router.post('/resend/:id', resendOTP);

module.exports = router;
