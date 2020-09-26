<template>
  <div class="container mx-auto md:flex md:justify-around ">
    <div class="p-4 py-20 md:flex-1 hidden">
      <div class="text-indigo-400 font-semibold text-3xl mb-4">Welcome to my Live Chat App.</div>
      <div class="text-indigo-200 break-words text-lg">This app is made using Socket.io, Vuejs, Expressjs and Nodejs. I will be implementing Mongodb to store the data also in upcoming updates. Enjoy chating!!!</div>
    </div>
    <div class="flex flex-col flex-1 items-end h-screen box-border md:p-4 md:pr-10">
      <ChatHeader class="w-full sm:max-w-md" :username="this.username" :users="this.users" />
      <Messages class="messages h-screen overflow-y-scroll w-full sm:max-w-md" :messages="this.messages" :username="this.username"/>
      <Sender class="w-full sm:max-w-md" v-on:sendMessage="sendMessage"/>
    </div>
  </div>
</template>

<script>
import io from "socket.io-client";
import Messages from "./components/Messages"
import ChatHeader from "./components/ChatHeader"
import Sender from "./components/Sender"

const socketURL = "http://localhost:3000"
export default {
  name: "app",
  components: {
    ChatHeader,
    Messages,
    Sender
  },
  data() {
    return{
      username: "",
      socket: io(socketURL),
      messages: [],
      users: [],
      index: 0
    };
  },

  methods: {
    // User joined server
    joinServer(){
      this.socket.on('loggedIn', data => {
        this.messages = data.messages;
        this.users = data.users;
        this.socket.emit('newUser', this.username);
      })

      this.listen();
    },

    // listen of user arrival, departure and msg
    listen(){
      this.socket.on('userOnline', user => {
        this.users.push(user);
        this.joinOrLeft(`${user} has joined the room`);
      })
      this.socket.on('userLeft', user => {
        this.users.splice(this.users.indexOf(user), 1);
        this.joinOrLeft(`${user} has left the room`);
      })
      this.socket.on('msg', message => {
        this.messages.push(message);
      })
    },

    // send message to server
    sendMessage(message){
      this.socket.emit('msg', message);
    },

    joinOrLeft(message){
      let m = {
        msg: message,
        flag : 0
      }
      this.messages.push(m)
    }

  },

  mounted(){
    this.username = prompt("What is your username?", "Anonymous");
    if(!this.username){
      this.username = "Anonymous";
    }
    this.joinServer();
  },

  updated: function () {
      var messages = this.$el.querySelector(".messages");
      messages.scrollTop = messages.scrollHeight;
  }

};
</script>

<style>
</style>
