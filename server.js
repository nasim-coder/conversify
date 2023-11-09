const express = require('express');
const app = express();
const PORT = process.env.PORT || 3333;
const db = require('./models/index');
const allRoute = require('./route/index');
const socketIO = require('socket.io');
const io = socketIO(app);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', allRoute);

// db.sequelize
//   .sync({ alter: true })
//   .then(() => {
//     console.log("db altered successfully");
//   })
//   .catch((err) => {
//     console.log("err//or", err); 
//   });
// Socket.io logic
io.on('connection', (socket) => {
    console.log('A user connected');

    // Handle real-time events here
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg); // Broadcast the message to all connected clients
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

app.listen(PORT, () => console.log(`server is running on PORT: ${PORT}`));