const mongoose = require('mongoose');

const unsubscribeSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: false,
    },
    mobile: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: false,
    },
    reason: {
        type: String,
        required: true,
    },
});

const Unsubscribe = mongoose.model('Unsubscribe', unsubscribeSchema);

module.exports = Unsubscribe;
