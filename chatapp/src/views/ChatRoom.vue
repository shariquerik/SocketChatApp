<template>
  <div class="flex flex-col flex-1 items-end h-screen box-border md:p-4 md:pr-10">
      <ChatHeader class="w-full sm:max-w-md" :username="this.username" :users="this.users" :roomid="this.roomid"/>
      <Messages class="messages h-screen overflow-y-scroll w-full sm:max-w-md" :messages="this.messages" :username="this.username" :roomid="this.roomid"/>
      <Sender class="w-full sm:max-w-md" v-on:sendMessage="sendMessage"/>
  </div>
</template>

<script>
import io from "socket.io-client";
import Messages from "../components/Messages"
import ChatHeader from "../components/ChatHeader"
import Sender from "../components/Sender"

const socketURL =  '/' //process.env.VUE_APP_URL || '/'
export default {
  name: "chatroom",
  components: {
    ChatHeader,
    Messages,
    Sender
  },
  data() {
    return{
      username: '',
      roomid: '',
      socket: io(socketURL),
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
        let user = {
          username: this.username,
          roomid: this.roomid
        }
        this.socket.emit('newUser', user);
      })

      this.listen();
    },

    // listen of user's arrival, departure and msg
    listen(){
      this.socket.on('userOnline', user => {
        this.users.push(user);
        this.joinOrLeft(`${user.username} has joined the room`, user.roomid);
      })
      this.socket.on('userLeft', user => {
        this.users.splice(this.users.indexOf(user), 1);
        this.joinOrLeft(`${user.username} has left the room`, user.roomid);
      })
      this.socket.on('msg', message => {
        this.messages.push(message);
      })
    },

    // send message to server
    sendMessage(message){
      this.socket.emit('msg', message);
    },

    // if user left or join the room push it as a message to display
    joinOrLeft(message, roomid){
      let m = {
        msg: message,
        roomid: roomid,
        flag : 0
      }
      this.messages.push(m)
    }

  },

  mounted(){
    this.username = this.$route.params.username;
    this.roomid = this.$route.params.roomid;
    this.joinServer();
  },

  updated() {
      var messages = this.$el.querySelector(".messages");
      messages.scrollTop = messages.scrollHeight;
  }

};
</script>
