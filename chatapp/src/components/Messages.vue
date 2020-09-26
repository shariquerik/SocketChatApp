<template>
    <div class="chat-window bg-indigo-100">
        <div class="flex message relative" :class="{ 'justify-end' : username === message.username }" v-for="message in messages" v-bind:key="message.index">
            <div class="m-2 p-2 rounded-lg mx-3" :class="{ 'bg-indigo-600' : username === message.username, ' bg-indigo-500' : username !== message.username }">
                <div class="flex flex-wrap w-full">
                    <div class="w-full font-bold tracking-wider text-orange-400 -mt-1" :class="{ 'hidden' : username === message.username }"> {{ message.username }}</div>
                    <div class="flex justify-between w-full items-baseline ">
                        <div class="text-md text-gray-100 leading-tight">{{ message.msg }}</div>
                        <div class="font-normal text-gray-300 text-xs ml-2"> {{ message.timestamp }} </div>
                    </div>
                    
                </div>
                <div class="absolute mt-2 top-0" :class="{ 'triangle-topleft right-0 mr-1' : username === message.username, 'triangle-topright left-0 ml-1' :  username !== message.username}" ></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Chatroom',
    props: ['messages', 'username']
}
</script>
