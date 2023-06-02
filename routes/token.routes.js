const router = require("express").Router();
const { verifyOTP, resendOTP } = require("../controllers/token.controller")

router.post('/verify', verifyOTP);

router.post('/resend', resendOTP);

module.exports = router;