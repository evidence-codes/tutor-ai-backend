const mongoose = require("mongoose")
require("dotenv").config()

const uri = process.env.MONGO_URI

const connectDB = () => {
    mongoose.connect(uri)
        .then(console.log('Connected to DB Successfully'))
}

module.exports = { connectDB };