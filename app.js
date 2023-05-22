const express = require("express");
const app = express()
const dotenv = require("dotenv")
dotenv.config()
const { connectDB } = require('./config/db.config');
const mongoose = require("mongoose");
const auth = require("./routes/auth.routes")

const port = process.env.PORT || 5000
const uri = process.env.MONGO_URI

app.use(express.json())

app.use('/api/auth', auth)

mongoose.connect(uri)
    .then(() => {
        console.log('Database connection successful!')
    }).catch(err => {
        console.log(err)
    })
app.listen(port, async () => {
    console.log(`Server is listening on port ${port}`)
});
