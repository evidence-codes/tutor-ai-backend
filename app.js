const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const mongoose = require("mongoose");
const errorMiddlewares = require("./middlewares/error.middleware");
const http = require('http');
const { Server } = require('socket.io');
const openai = require("./config/openai.config");

const auth = require("./routes/auth.routes");
const question = require("./routes/question.routes");
const token = require("./routes/token.routes");
const user = require("./routes/user.routes");
const chat = require("./routes/chat.routes");
const payment = require("./routes/payment.routes");


const port = process.env.PORT || 5000
const uri = process.env.MONGO_URI

app.use(express.json({ limit: '15mb' }));
app.use(express.urlencoded({ limit: '15mb', extended: true }));
app.use(cors('*'));
app.use(errorMiddlewares.errorHandler);

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["PUT", "GET", "POST", "PATCH", "DELETE"]
  },
});
 

app.use('/api/auth', auth)
app.use('/api/questions', question)
app.use('/api/auth/token', token)
app.use('/api/user', user)
app.use('/api/chat', chat)
app.use('/api/payment', payment)

app.use('/', (req, res) => {
    res.status(404).json(errorMiddlewares.formatError("Resource Not Found"))
})

// Handle socket.io connections
io.on('connection', (socket) => {
  console.log('New User Connected:' + socket.id);

  // Handle incoming chat messages
  socket.on('chatMessage', (message) => {
    
    // Generate a response using GPT-3.5
    // openai.createChatCompletion({
    //     model: "gpt-3.5-turbo",
    //     messages: [{role: 'user', content:message}]
    // })
    //   .then((response) => {
    //     const reply = response.choices[0].text.trim();
    //     console.log('Generated reply:', reply);

    // Emit the generated response back to the client
    //     socket.emit('chatMessage', reply);
    //   })
    //   .catch((error) => {
    //     console.error('GPT-3.5 API error:', error);
    // Handle error response if needed
    //   });
    
    setTimeout(() => {
      socket.emit('chatMessage', message)
    }, [800])
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected'+ socket.id);
  });
});

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('Database connection successful!')
    }).catch(err => {
        console.log(err)
    });

server.listen(port, async () => {
    console.log(`Server is listening on port ${port}`)
});
