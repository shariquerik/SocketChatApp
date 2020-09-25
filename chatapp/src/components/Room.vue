<template>
    <div class="chat-window bg-gray-200 flex flex-col flex-1 overscroll-none">
        <div class="messages flex-1 h-screen overflow-y-scroll">
            <div class="message flex" v-for="message in messages" v-bind:key="message.index">
                <div class="username">{{ message.username }}:</div>
                <div class="message-text">{{ message.msg }}</div>
            </div>
        </div>
        <div class="">
            <form class="flex" :submit="sendMessage">
                <input class="border border-gray-300 flex-1 box-border" type="text" v-model="msg">
                <button class="box-border bg-indigo-400 text-white" v-on:click="sendMessage" v-bind:disabled="!msg">Send</button>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Chatroom',
    props: ['messages'],
    data(){
        return{
            msg: ""
        }
    },
    methods:{
        sendMessage(){
            if(!this.msg){
                alert("Please enter a message");
                return;
            }

            this.$emit('sendMessage', this.msg);
            this.msg = '';
            this.scrollToEnd();
        },
        scrollToEnd() {    	
            var messages = this.$el.querySelector(".messages");
            chatWindow.scrollTop = messages.scrollHeight;
        }
    }
}
</script>

<style scoped>

</style>