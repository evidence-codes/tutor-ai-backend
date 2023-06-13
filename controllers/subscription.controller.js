const stripe = require("stripe");
const User = require("../models/user.model");

const subscriptions = async (req, res) => {
    const { stripeToken, plan } = req.body;

    try {
        // Create a charge using the Stripe API
        const charge = await stripe.charges.create({
            amount: calculatePlanPrice(plan),
            currency: 'usd',
            source: stripeToken,
            description: `Payment for ${plan} plan`,
        });

        // Update the user's payment status and level in the database
        await User.findByIdAndUpdate(req.params.id, {
            level: plan,
            paymentStatus: true,
        });

        res.status(200).json('Payment successful!');
    } catch (err) {
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