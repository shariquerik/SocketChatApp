const app = require('express')();
const http = require('http').Server(app);
const io = require("socket.io")(http);
require('dotenv').config();

let users = [];
let messages = [];
let index = 0;

io.on('connection', socket => {

    // user logged In
    socket.emit('loggedIn', {
        users: users.map(s => s.username),
        messages: messages
    })

    // new user added
    socket.on('newUser', username => {
        console.log(`${username} has joined the room`);
        socket.username = username;
        users.push(socket);

        io.emit('userOnline', socket.username );
    })

    // new msg came
    socket.on('msg', msg => {
        let message = {
            index: index,
            username: socket.username,
            msg: msg
        }
        messages.push(message);
        io.emit('msg', message);
        index++;
    })

    // user left
    socket.on('disconnect', () => {
        console.log(`${socket.username} has left the room`);
        io.emit('userLeft', socket.username);
        users.splice(users.indexOf(socket), 1);
    })
})

http.listen(process.env.PORT, () => console.log(`Server Connected at port ${process.env.PORT}`));