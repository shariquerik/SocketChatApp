<template>
  <div class="container mx-auto flex flex-col h-screen box-border">
    <div class="header">
      <h1 class="text-lg font-semibold">Chat Room</h1>
      <p class="text-sm">Username: {{ username }}</p>
      <p class="text-sm">Online: {{ users.length }}</p>
    </div>
    <ChatRoom class="" v-bind:messages="this.messages" v-on:sendMessage="sendMessage" />
  </div>
</template>

<script>
import io from "socket.io-client";
import ChatRoom from "./components/Room"

export default {
  name: "app",
  components: {
    ChatRoom
  },
  data() {
    return{
      username: "",
      socket: io("http://localhost:3000"),
      messages: [],
      users: []
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
      })
      this.socket.on('userLeft', user => {
        this.users.splice(this.users.indexOf(user), 1);
      })
      this.socket.on('msg', message => {
        this.messages.push(message);
      })
    },

    // send message to server
    sendMessage(message){
      this.socket.emit('msg', message);
    }

  },
  mounted(){
    this.username = prompt("What is your username?", "Anonymous");
    if(!this.username){
      this.username = "Anonymous";
    }

    this.joinServer();
  }
};
</script>

<style>
</style>
