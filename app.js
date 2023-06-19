const express = require("express");
const app = express()
const dotenv = require("dotenv")
dotenv.config()
const cors = require("cors")
const mongoose = require("mongoose");
const auth = require("./routes/auth.routes")
const question = require("./routes/question.routes")
const token = require("./routes/token.routes")
const user = require("./routes/user.routes")
const chat = require("./routes/chat.routes")
const payment = require("./routes/payment.routes")
const errorMiddlewares = require("./middlewares/error.middleware");

const port = process.env.PORT || 5000
const uri = process.env.MONGO_URI

app.use(express.json({ limit: '15mb' }));
app.use(express.urlencoded({ limit: '15mb', extended: true }));
app.use(cors('*'));
app.use(errorMiddlewares.errorHandler);


app.use('/api/auth', auth)
app.use('/api/questions', question)
app.use('/api/auth/token', token)
app.use('/api/user', user)
app.use('/api/chat', chat)
app.use('/api/payment', payment)

app.use('/', (req, res) => {
    res.status(404).json(errorMiddlewares.formatError("Resource Not Found"))
})

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('Database connection successful!')
    }).catch(err => {
        console.log(err)
    });

app.listen(port, async () => {
    console.log(`Server is listening on port ${port}`)
});
