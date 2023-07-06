const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const mongoose = require('mongoose');
const errorMiddlewares = require('./middlewares/error.middleware');
const http = require('http');
const { Server } = require('socket.io');
const engine = require('consolidate');
const openai = require('./config/openai.config');

const auth = require('./routes/auth.routes');
const token = require('./routes/token.routes');
const user = require('./routes/user.routes');
const chat = require('./routes/chat.routes');
const payment = require('./routes/payment.routes');
const lesson = require('./routes/lesson.routes');

const port = process.env.PORT || 5000;
const uri = process.env.MONGO_URI;

app.engine('ejs', engine.ejs);
app.set('views', './views');
app.set('view engine', 'ejs');

app.use(express.json({ limit: '15mb' }));
app.use(express.urlencoded({ limit: '15mb', extended: true }));
app.use(cors('*'));
app.use(errorMiddlewares.errorHandler);

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['PUT', 'GET', 'POST', 'PATCH', 'DELETE'],
    },
});

app.use('/api/auth', auth);
app.use('/api/auth/token', token);
app.use('/api/user', user);
app.use('/api/chat', chat);
app.use('/api/payment', payment);
app.use('/api/lesson', lesson);

app.use('/', (req, res) => {
    res.status(404).json(errorMiddlewares.formatError('Resource Not Found'));
});

io.on('connection', socket => {
    console.log(`User ${socket.id} Connected!`);

    socket.on('conversation', message => {
        socket.emit('conversation', message);
    });

    socket.on('lesson', message => {
        socket.emit('lesson', message);
    });

    socket.on('disconnect', () => {
        console.log(`User ${socket.id} Disconnected!`);
    });
});

mongoose
    .connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        server.listen(port, async () => {
            console.log(`Server is listening on port ${port}`);
        });
    })
    .catch(err => {
        console.log(err);
    });
