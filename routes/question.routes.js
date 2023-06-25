const router = require('express').Router();
const question = require('../controllers/question.controller');

router.post('/add-questions', question);

module.exports = router;
