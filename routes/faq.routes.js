const router = require('express').Router();
const { getFAQs } = require('../controllers/faq.controller');

router.get('/get-faqs', getFAQs);

module.exports = router;
