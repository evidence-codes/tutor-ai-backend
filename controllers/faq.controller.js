const { ResourceNotFound } = require('../errors/httpErrors');
const { FAQ } = require('../models/faq.model');

const getFAQs = async (req, res) => {
    try {
        const faqs = await FAQ.find();
        if (!faqs) {
            throw new ResourceNotFound('FAQs Data Not Found!');
        } else {
            res.status(200).json(faqs);
        }
    } catch (err) {
        res.status(500).json(err?.message || 'An Error Occured!');
    }
};

module.exports = { getFAQs };
