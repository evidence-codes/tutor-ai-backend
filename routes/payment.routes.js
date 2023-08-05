const router = require('express').Router();
const {
    stripeIntent,
    paypalIntent,
    paypalCancel,
    paypalSuccess,
} = require('../controllers/payment.controller');
const auth = require('../middlewares/auth.middleware');

router.post('/stripe-intent', auth, stripeIntent);
router.post('/paypal-intent', auth, paypalIntent);
router.get('/paypal-cancel', paypalCancel);
router.get('/paypal-success', paypalSuccess);

module.exports = router;
