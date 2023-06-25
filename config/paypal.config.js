const paypal = require('paypal-rest-sdk');

paypal.configure({
    mode: 'sandbox', // Set to 'live' for production
    client_id: 'your_paypal_client_id',
    client_secret: 'your_paypal_client_secret',
});

module.exports = paypal;
