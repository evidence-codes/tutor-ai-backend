const router = require("express").Router();
const { subscriptions } = require("../controllers/subscription.controller")

router.post('/payment/:id', subscriptions)

module.exports = router;