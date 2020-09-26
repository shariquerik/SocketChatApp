<template>
    <div>
        <form class="flex bg-indigo-200" :submit="sendMessage">
            <input placeholder="Type a message" class="flex-1 rounded-full py-1 pl-4 m-2 focus:outline-none focus:bg-gray-100" type="text" v-model="msg">
            <button class="bg-indigo-400 rounded-full text-white p-2 mr-2 my-2" v-on:click="sendMessage" :disabled="!msg">
                <svg width="20" height="18" viewBox="0 0 17 20">
                    <g fill="none" fill-rule="evenodd">
                        <path d="M-2-3h24v24H-2z"/>
                        <path class="fill-current text-gray-100" d="M1.4 17.4l17.45-7.48a1 1 0 000-1.84L1.4.6a.993.993 0 00-1.39.91L0 6.12c0 .5.37.93.87.99L15 9 .87 10.88c-.5.07-.87.5-.87 1l.01 4.61c0 .71.73 1.2 1.39.91z" />
                    </g>
                </svg>
            </button>
        </form>
    </div>
</template>

<script>
export default {
    name: 'sender',
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
        }
    }
}
</script>