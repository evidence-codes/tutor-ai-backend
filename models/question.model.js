const mongoose = require("mongoose")

const questionSchema = new mongoose.Schema(
    {
        question: {
            type: String,
            required: true
        },
        option_a: {
            type: String,
            required: true
        },
        option_b: {
            type: String,
            required: true
        },
        option_c: {
            type: String,
            required: true
        },
        option_d: {
            type: String,
            required: true
        },
        option_e: {
            type: String
        },
        answer: {
            type: String,
            required: true
        }
    }, { timestamps: true }
)

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;