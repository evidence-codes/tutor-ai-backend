const Question = require('../models/question.model');

const question = async (req, res) => {
    const {
        question,
        option_a,
        option_b,
        option_c,
        option_d,
        option_e,
        answer,
    } = req.body;

    const data = new Question({
        question,
        option_a,
        option_b,
        option_c,
        option_d,
        option_e,
        answer,
    });

    try {
        const saved = await data.save();
        res.status(200).json(saved);
    } catch (err) {
        res.status(500).json(err);
    }
};

module.exports = question;
