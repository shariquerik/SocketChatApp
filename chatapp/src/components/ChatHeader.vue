<template>
    <div class="bg-indigo-700 p-3 px-6">
        <div class="">
            <h1 class="text-2xl text-gray-100 font-semibold ml-2">Live Chat Room</h1>
        </div>
        <div class="flex justify-between items-baseline mt-1 ">
            <h2 class="text-lg font-medium ml-2 text-gray-300">{{ username }}</h2>
            <!-- <h2 class="text-lg font-medium ml-2 text-gray-300">{{ roomid }}</h2> -->
            <h2 class="text-md bg-green-600 rounded-full px-3 py-1 text-white font-semibold">{{ users.filter(item => item.roomid == roomid).length }}
                <span class="text-xs font-bold"> ONLINE</span>
            </h2>
        </div>
    </div>
</template>

<script>
export default {
    name: 'chatheader',
    props: ['username', 'users', 'roomid'],
}
</script>