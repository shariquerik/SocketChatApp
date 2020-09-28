<template>
  <div class="home block mt-10 sm:flex">
    <div class="m-2 p-4">
      <div class="text-indigo-400 font-semibold text-3xl mb-4">Welcome to my Live Chat Room App.</div>
      <div class="text-indigo-200 break-words text-lg">This app is made using Socket.io, Vuejs, Expressjs, Nodejs and MongoDB. Enter your name in 'USERNAME' and create or join room by entering room id in 'ROOMID'. Enjoy chating!!!</div>
    </div>
    <div class="p-5 m-5 bg-indigo-200 rounded-lg">
      <div class="text-xl mb-2 font-bold text-indigo-600">Live Chat Room</div>
      <form :action="'/#/chatroom/' + this.username">
        <div class="flex flex-col mb-2">
          <label for="username" class="font-bold text-indigo-600 text-xs">USERNAME<span class="text-red-600">*</span></label>
          <input class="rounded-lg focus:outline-none px-3 py-1" type="text" id="username" v-model="username" required placeholder="Enter your name">
        </div>
        <div class="flex flex-col mb-4">
          <label for="roomid" class="font-bold text-indigo-600 text-xs">ROOMID<span class="text-red-600">*</span></label>
          <input class="rounded-lg focus:outline-none px-3 py-1" type="text" id="roomid" v-model="roomid" required placeholder="Enter room id or create one">
        </div>
        <a type="submit" :href="'/#/chatroom/' + this.username + '/' + this.roomid" class="bg-indigo-500 rounded-lg text-white px-2 py-1 w-full text-center">Enter Room</a>
      </form>
    </div>
  </div>
</template>

<script>

export default {
  name: "home",
  components: {
  },
  data() {
    return{
      username: '',
      roomid: ''
    }
  }
};
</script>
