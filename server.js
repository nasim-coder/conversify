const express = require('express');
const http = require('http'); // Import the http module
const app = express();
const server = http.createServer(app); // Create an http.Server instance
const PORT = process.env.PORT || 3333;
const db = require('./models/index');
const allRoute = require('./route/index');
const socketIO = require('socket.io');
const io = socketIO(server); // Pass the http.Server instance to socket.io

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', allRoute);

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

server.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`));
