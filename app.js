const express = require("express");
const app = express()
const dotenv = require("dotenv")
const morgan = require("morgan")
dotenv.config()
const { connectDB } = require('./config/db.config');
const mongoose = require("mongoose");
const auth = require("./routes/auth.routes")
const question = require("./routes/question.routes")
const token = require("./routes/token.routes")
const logger = require("./config/winston.config")
const errorMiddlewares = require("./middlewares/error.middleware");


const port = process.env.PORT || 5000
const uri = process.env.MONGO_URI

app.use(morgan("combined", { stream: logger.stream }))
app.use(express.json())
app.use(errorMiddlewares.errorLogger);
app.use(errorMiddlewares.errorHandler);


app.use('/api/auth', auth)
app.use('/api/questions', question)
app.use('/api/token', token)

app.use('/', (req, res) => {
    res.status(404).json(errorMiddlewares.formatError("Resource Not Found"))
})


mongoose.connect(uri)
    .then(() => {
        console.log('Database connection successful!')
    }).catch(err => {
        console.log(err)
    })
app.listen(port, async () => {
    console.log(`Server is listening on port ${port}`)
});
