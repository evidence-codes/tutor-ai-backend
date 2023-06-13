const router = require("express").Router();
const { subscriptions, paypalOption, paypalCallback } = require("../controllers/subscription.controller")
const auth = require("../middlewares/auth.middleware")

router.post('/cards', auth, subscriptions)

router.post('/paypal-payment', auth, paypalOption)

router.get('/paypal-callback', auth, paypalCallback)

module.exports = router;