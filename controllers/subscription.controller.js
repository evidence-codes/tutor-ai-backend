require("dotenv").config();
const { SECRET_KEY } = process.env;
const stripe = require("stripe")(SECRET_KEY)
const User = require("../models/user.model");
const paypal = require("../config/paypal.config");

const subscriptions = async (req, res) => {
    const { token, plan } = req.body;

    try {
        const charge = await stripe.charges.create({
            amount: calculatePlanPrice(plan),
            currency: 'usd',
            source: token,
            description: `Payment for ${plan} plan`,
        });

        // Update the user's payment status and level in the database
        await User.findByIdAndUpdate(req.user.id, {
            level: plan,
            paymentStatus: true,
        });

        res.status(200).json('Payment successful!');
    } catch (err) {
        res.status(500).json('Payment failed!');
    }
}

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
        const payment = await paypal.payment.create(createPayment);

        // Redirect the user to PayPal for payment approval
        res.status(200).json(payment.links.find(link => link.rel === 'approval_url').href);
    } catch (error) {
        // Handle error response
        res.status(500).json('Payment failed!');
    }
}

const paypalCallback = async (req, res) => {
    const { paymentId, PayerID } = req.query;

    const executePayment = {
        payer_id: PayerID,
    };

    try {
        const paymentExecution = await paypal.payment.execute(paymentId, executePayment);

        // Update the user's payment status and level in the database
        await User.findByIdAndUpdate(req.user._id, {
            paymentStatus: true,
            level: paymentExecution.transactions[0].description,
        });

        // Payment successful, handle success response
        res.status(200).json('Payment successful!');
    } catch (error) {
        // Handle error response
        res.status(500).json('Payment failed!');
    }
}

function calculatePlanPrice(plan) {
    // Set the prices for each plan
    const planPrices = {
        Beginner: 10,
        Elementary: 20,
        Intermediary: 30,
        UpperIntermediary: 40,
        Confident: 50,
    };

    // Retrieve the price for the selected plan
    const price = planPrices[plan];


    if (price) {
        return price * 100; // Convert to the smallest currency unit (in cents)
    } else {
        throw new Error('Invalid plan selection');
    }
}

module.exports = { subscriptions, paypalOption, paypalCallback }