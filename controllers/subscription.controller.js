require('dotenv').config();
const { SECRET_KEY } = process.env;
const stripe = require('stripe')(SECRET_KEY);
const User = require('../models/user.model');
const paypal = require('../config/paypal.config');

const paymentIntent = async (req, res) => {
    const { plan } = req.body;

    try {
        const payment_intent = await stripe.paymentIntents.create({
            amount: calculatePlanPrice(plan),
            currency: 'usd',
            automatic_payment_methods: {
                enabled: true,
            },
        });

        res.status(200).json(payment_intent?.client_secret);
    } catch (err) {
        res.status(500).json(err?.message || 'An Error Occured!');
    }
};

const subscriptions = async (req, res) => {
    const { token, plan } = req.body;

    try {
        const charge = await stripe.charges.create({
            amount: calculatePlanPrice(plan),
            currency: 'usd',
            source: token,
            description: `Payment for ${plan} plan`,
        });
        console.log(charge);

        // Update the user's payment status and level in the database
        await User.findByIdAndUpdate(req.user.id, {
            paymentStatus: true,
        });

        res.status(200).json('Payment successful!');
    } catch (err) {
        res.status(500).json(err?.message || 'An Error Occured!');
    }
};

const paypalOption = async (req, res) => {
    const { amount, currency, description } = req.body;

    const createPayment = {
        intent: 'sale',
        payer: {
            payment_method: 'paypal',
        },
        redirect_urls: {
            return_url: 'http://your-website.com/success', // Redirect URL after successful payment
            cancel_url: 'http://your-website.com/cancel', // Redirect URL if the payment is canceled
        },
        transactions: [
            {
                amount: {
                    total: amount,
                    currency: currency,
                },
                description: description,
            },
        ],
    };

    try {
        const payment = paypal.payment.create(createPayment);

        // Redirect the user to PayPal for payment approval
        res.status(200).json(
            payment.links.find(link => link.rel === 'approval_url').href,
        );
    } catch (error) {
        // Handle error response
        res.status(500).json(err?.message || 'An Error Occured!');
    }
};

const paypalCallback = async (req, res) => {
    const { paymentId, PayerID } = req.query;

    const executePayment = {
        payer_id: PayerID,
    };

    try {
        const paymentExecution = paypal.payment.execute(
            paymentId,
            executePayment,
        );

        // Update the user's payment status and level in the database
        await User.findByIdAndUpdate(req.user._id, {
            paymentStatus: true,
        });

        // Payment successful, handle success response
        res.status(200).json('Payment successful!');
    } catch (error) {
        // Handle error response
        res.status(500).json(err?.message || 'An Error Occured!');
    }
};

function calculatePlanPrice(plan) {
    const planPrices = {
        plan_1: 16,
        plan_2: 40.8,
        plan_3: 72,
    };

    const price = planPrices[plan];
    if (price) {
        return Math.floor(price * 100);
    } else {
        throw new Error('Invalid plan selection');
    }
}

module.exports = { paymentIntent, subscriptions, paypalOption, paypalCallback };
