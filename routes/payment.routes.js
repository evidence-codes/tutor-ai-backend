const router = require('express').Router();
const {
    paymentIntent,
    subscriptions,
    paypalOption,
    paypalCallback,
} = require('../controllers/subscription.controller');
const auth = require('../middlewares/auth.middleware');

router.post('/payment-intent', auth, paymentIntent);

router.post('/cards', auth, subscriptions);

router.post('/paypal-payment', auth, paypalOption);

router.get('/paypal-callback', auth, paypalCallback);

module.exports = router;
