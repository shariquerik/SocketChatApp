import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import ChatRoom from "../views/ChatRoom.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/chatroom/:username/:roomid",
    name: "chatroom",
    component: ChatRoom
  }
];

const router = new VueRouter({
  // mode: "history",
  // base: process.env.BASE_URL,
  routes
});

export default router;
