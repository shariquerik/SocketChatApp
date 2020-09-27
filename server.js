const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const mongoose = require('mongoose');
const moment = require('moment')
require('dotenv').config();

let users = [];
let messages = [];

mongoose.connect( process.env.DB_NAME ,{ useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, })
        .then(() => console.log('DB connnection successful!'));

// Schema Creation
const ChatSchema = new mongoose.Schema({
    username: String,
    roomid: String,
    msg: String,
    timestamp: String
})

// Model creation
const ChatModel = mongoose.model('chat', ChatSchema);
ChatModel.find((err, docs) => {
    if(err) throw err;
    messages = docs;
})

io.on('connection', socket => {

    // user logged In
    socket.emit('loggedIn', {
        users: users.map(s => {
            return {username: s.username, roomid: s.roomid}
        }), // it creates a new array with only usernames in it.
        messages: messages
    })

    // new user added
    socket.on('newUser', user => {
        console.log(`${user.username} has joined room ${user.roomid}`);
        socket.username = user.username;
        socket.roomid = user.roomid;
        users.push(socket);
        const soc = {
            username: socket.username,
            roomid: socket.roomid
        }
        socket.broadcast.emit('userOnline', soc );
    })

    // new msg came
    socket.on('msg', msg => {

        let message = new ChatModel({
            username: socket.username,
            roomid: socket.roomid,
            msg:msg,
            timestamp: moment().format('LT')
        })

        message.save((err, doc) => {
            if(err) throw err;
            messages.push(doc);
            io.emit('msg', doc);
        })
        
    })

    // user left
    socket.on('disconnect', () => {
        console.log(`${socket.username} has left room ${socket.roomid}`);
        const soc = {
            username: socket.username,
            roomid: socket.roomid
        }
        io.emit('userLeft', soc);
        users.splice(users.indexOf(socket), 1);
    })
})

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('./build'));

    app.get('*', function(req, res){
        res.sendFile(__dirname + './chatapp/dist/index.html');
    });
}

http.listen(process.env.PORT || 3000, () => console.log(`Server Connected at port ${process.env.PORT}`));