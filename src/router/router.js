import Vue from 'vue';
import VueRouter from 'vue-router';

import Chat from "@/components/Chat";
import HelloWorld from "@/components/HelloWorld";
import Login from "@/components/login_register/Login";
import Register from "@/components/login_register/Register";
import LoginOrRegister from "@/components/LoginOrRegister";

Vue.use(VueRouter);

const routes = [
    {path:"/foo", component: Register},
    {path: "/user/chat", name:"chat", component: Chat},
    {path: "/", component: LoginOrRegister},
    {path:"/user/login", name:"login", component: LoginOrRegister},
]

const router = new VueRouter({
    model: 'history',
    routes
});

export default router;