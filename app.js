const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const mongoose = require('mongoose');
const errorMiddlewares = require('./middlewares/error.middleware');
const http = require('http');
const engine = require('consolidate');

const auth = require('./routes/auth.routes');
const token = require('./routes/token.routes');
const user = require('./routes/user.routes');
const chat = require('./routes/chat.routes');
const payment = require('./routes/payment.routes');
const lesson = require('./routes/lesson.routes');
const admin_var = require('./routes/admin_var.routes');
const review = require('./routes/review.routes');
const unsubscribe = require('./routes/unsubscribe.routes');
const pretest = require('./routes/pretest.routes');
const { initialize_data } = require('./initialize_data');

const port = process.env.PORT || 5000;
const uri = process.env.MONGO_URI;

app.engine('ejs', engine.ejs);
app.set('views', './views');
app.set('view engine', 'ejs');

app.use(express.json({ limit: '15mb' }));
app.use(express.urlencoded({ limit: '15mb', extended: true }));
app.use(cors('*'));
app.use(errorMiddlewares.errorHandler);

app.use(express.static('public'));
app.use('/images', express.static('images'));

const server = http.createServer(app);
// const io = new Server(server, {
//     cors: {
//         origin: '*',
//         methods: ['PUT', 'GET', 'POST', 'PATCH', 'DELETE'],
//     },
// });

app.use('/api/auth', auth);
app.use('/api/auth/token', token);
app.use('/api/user', user);
app.use('/api/chat', chat);
app.use('/api/payment', payment);
app.use('/api/lesson', lesson);
app.use('/api/admin-vars', admin_var);
app.use('/api/review', review);
app.use('/api/unsubscribe', unsubscribe);
app.use('/api/pretest', pretest);

app.use('/', (req, res) => {
    res.status(404).json(errorMiddlewares.formatError('Resource Not Found'));
});

mongoose
    .connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        initialize_data();
        server.listen(port, async () => {
            console.log(`Server is listening on port ${port}`);
        });
    })
    .catch(err => {
        console.log('MongoDB Server Error: ', err);
    });
