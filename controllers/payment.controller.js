require('dotenv').config();
const { SECRET_KEY } = process.env;
const stripe = require('stripe')(SECRET_KEY);
const User = require('../models/user.model');
const { Admin } = require('../models/admin.model');
const paypal = require('../config/paypal.config');

const stripeIntent = async (req, res) => {
    const { userPlan } = req.body;

    try {
        const user_plan = await calculatePlanPrice(userPlan);
        const generate_payment_intent = async ({ user, customer }) => {
            const payment_intent = await stripe.paymentIntents.create({
                amount: user_plan?.stripe,
                currency: 'usd',
                automatic_payment_methods: {
                    enabled: true,
                },
                customer: customer?.id,
                metadata: {
                    customerName: user?.fullname,
                    customerEmail: user?.email,
                },
                description: `$${user_plan?.raw} paid by ${user?.fullname} for ${user_plan?.no_of_lessons} TutorAI Lessons.`,
            });
            res.status(200).json(payment_intent?.client_secret);
        };

        const user = await User.findById(req.user.id);
        if (!user) throw new ResourceNotFound('User account not found');

        const existingCustomers = await stripe.customers.list({
            email: user?.email,
        });

        if (existingCustomers.data.length > 0) {
            const customer = existingCustomers.data[0];
            generate_payment_intent({ user: user, customer: customer });
        } else {
            const customer = await stripe.customers.create({
                name: user?.fullname,
                email: user?.email,
            });
            generate_payment_intent({ user: user, customer: customer });
        }
    } catch (err) {
        res.status(500).json(err?.message || 'An Error Occured!');
    }
};

const paypalIntent = async (req, res) => {
    const { userPlan } = req.body;

    const server_url = `${req.protocol}://${req.get('host')}`;
    try {
        const user_plan = await calculatePlanPrice(userPlan);

        const user = await User.findById(req.user.id);
        if (!user) throw new ResourceNotFound('User account not found');

        const create_payment_json = {
            intent: 'sale',
            payer: {
                payment_method: 'paypal',
            },
            redirect_urls: {
                return_url: `${server_url}/api/payment/paypal-success`,
                cancel_url: `${server_url}/api/payment/paypal-cancel`,
            },
            transactions: [
                {
                    item_list: {
                        items: [
                            {
                                name: `TutorAI ${user_plan?.no_of_lessons} Lessons Plan.`,
                                sku: `TutorAI ${user_plan?.no_of_lessons} Lessons Plan.`,
                                price: user_plan?.raw,
                                currency: 'USD',
                                quantity: 1,
                            },
                        ],
                    },
                    amount: {
                        currency: 'USD',
                        total: user_plan?.raw,
                    },
                    description: `$${user_plan?.raw} paid by ${user?.fullname} for ${user_plan?.no_of_lessons} TutorAI Lessons.`,
                },
            ],
        };

        paypal.payment.create(create_payment_json, (error, payment) => {
            if (error) {
                console.log(error);
                res.status(500).json(
                    error?.response?.message || 'An Error Occured',
                );
            } else {
                res.status(200).json(
                    payment.links.find(link => link.rel === 'approval_url')
                        .href,
                );
            }
        });
    } catch (err) {
        res.status(500).json(err?.message || 'An Error Occured!');
    }
};

const paypalSuccess = async (req, res) => {
    const payerID = req.query?.PayerID;
    const paymentId = req.query?.paymentId;

    const executePayment = {
        payer_id: payerID,
    };

    try {
        paypal.payment.execute(paymentId, executePayment, (error, payment) => {
            if (error) {
                res.status(500).json(
                    error?.response?.message || 'An Error Occured',
                );
            } else {
                res.render('PaypalSuccess');
            }
        });
    } catch (error) {
        res.status(500).json(err?.message || 'An Error Occured!');
    }
};

const paypalCancel = (req, res) => {
    res.render('PaypalCancel');
};

const calculatePlanPrice = async plan => {
    const admin = await Admin.findById(process.env.ADMIN_ID);
    if (!admin) throw new Error('Invalid plan selection');

    function convertToPlanPrices(pricingData) {
        const planPrices = {};
        pricingData.forEach(plan => {
            const totalPrice = plan.no_of_lessons * plan.price;
            planPrices[plan.plan] = totalPrice;
        });
        return planPrices;
    }
    function convertToNoOfLessons(pricingData) {
        const planLesson = {};
        pricingData.forEach(plan => {
            planLesson[plan.plan] = plan.no_of_lessons;
        });
        return planLesson;
    }

    const pricing = admin.pricing;

    const planPrices = convertToPlanPrices([...pricing]);
    const noOfLessons = convertToNoOfLessons([...pricing]);

    const price = planPrices[plan];

    if (price) {
        return {
            stripe: Math.floor(price * 100),
            raw: price.toFixed(2),
            no_of_lessons: noOfLessons[plan],
        };
    } else {
        throw new Error('Invalid plan selection');
    }
};

module.exports = { stripeIntent, paypalIntent, paypalCancel, paypalSuccess };
