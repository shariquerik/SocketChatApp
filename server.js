const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const mongoose = require('mongoose');
const moment = require('moment')
require('dotenv').config();

let users = [];
let messages = [];
// let index = 0; 

mongoose.connect( process.env.MONGODB_URI || process.env.DB_NAME ,{ useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, })
        .then(() => console.log('DB connnection successful!'));

const ChatSchema = new mongoose.Schema({
    username: String,
    msg: String
})

const ChatModel = mongoose.model('chat', ChatSchema);

ChatModel.find((err, docs) => {
    if(err) throw err;
    messages = docs;
})

io.on('connection', socket => {

    // user logged In
    socket.emit('loggedIn', {
        users: users.map(s => s.username), // it creates a new array with only usernames in it.
        messages: messages
    })

    // new user added
    socket.on('newUser', username => {
        console.log(`${username} has joined the room`);
        socket.username = username;
        users.push(socket);
        socket.broadcast.emit('userOnline', socket.username );
    })

    // new msg came
    socket.on('msg', msg => {
        // let message = {
        //     index: index, 
        //     username: socket.username, 
        //     msg: msg,
        //     timestamp: moment().format('LT')
        // }

        // messages.push(message); 
        // io.emit('msg', message); 
        // index++; 

        let message = new ChatModel({
            username: socket.username,
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
        console.log(`${socket.username} has left the room`);
        io.emit('userLeft', socket.username);
        users.splice(users.indexOf(socket), 1);
    })
})

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('./build'));

    app.get('*', function(req, res){
        res.sendFile(__dirname + './build/index.html');
    });
}

http.listen(process.env.PORT || 3000, () => console.log(`Server Connected at port ${process.env.PORT}`));