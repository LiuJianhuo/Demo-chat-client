<template>
<!--  <Chat></Chat>-->
<!--  <div id="app">-->
<!--    <p>-->
<!--      &lt;!&ndash; 使用 router-link 组件来导航. &ndash;&gt;-->
<!--      &lt;!&ndash; 通过传入 `to` 属性指定链接. &ndash;&gt;-->
<!--      &lt;!&ndash; <router-link> 默认会被渲染成一个 `<a>` 标签 &ndash;&gt;-->
<!--      <router-link to="/foo">Go to Foo</router-link>-->
<!--      <router-link to="/bar">Go to Bar</router-link>-->
<!--    </p>-->
<!--    &lt;!&ndash; 路由出口 &ndash;&gt;-->
<!--    &lt;!&ndash; 路由匹配到的组件将渲染在这里 &ndash;&gt;-->
<!--    <router-view></router-view>-->
<!--  </div>-->


<div id="app">
  <router-view></router-view>
<!--  <LoginOrRegister></LoginOrRegister>-->
</div>
</template>

<script>

import SideMenu from "@/components/chat/SideMenu";
import MsgItems from "@/components/chat/MsgItems";
import TopBar from "@/components/chat/TopBar";
import MsgMain from "@/components/chat/MsgMain";
import Test from "@/components/chat/msgmain/contentArea/test";
import Chat from "@/components/Chat";
import LoginOrRegister from "@/components/LoginOrRegister";


export default {
  name: 'app',
  components: {
    LoginOrRegister,
    Chat,
    Test,
    MsgMain,
    TopBar,
    MsgItems,
    SideMenu
  }
}
</script>

<style>
  *{
    margin: 0;
    padding: 0;
  }
  ul, ul li{
    list-style: none;
  }

  .bg-green{
    background-color: #4caf50;
  }

  .bg-organge{
    background-color: #ff9800;
  }

  .bg-red{
    background-color: #f44336;
  }

   /* input 组件 start*/
  .input-group{
    padding:10px 60px;
    margin-bottom: 10px;
  }

  .input-group .input-icon{
    vertical-align: bottom;
    margin-right: 10px;
    font-size: 20px;
    width: 25px;
    display: inline-block;
  }

  .input-group input{
    width: calc(100% - 36px);
    height: 30px;
    border:none;
    border-bottom: 1.5px solid #e0e0e0;
    outline: none;
  }

  .input-group input[type='checkbox']{
    height: 17px;
    width: 17px;
    margin-right: 13px;
  }

  .input-group input:focus{
    border-bottom-color: #6be1ff;
  }

  .input-group.error input:not(:focus){
    border-bottom-color: #f44336;
  }

  .input-group:after{
    content: '';
    clear: both;
  }

  /* common 公共样式 */
  .scroll{
    overflow: auto;
  }
  .scroll::-webkit-scrollbar{
    width: 10px;
    height: 1px;
  }
  .scroll::-webkit-scrollbar-thumb{
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    background: #535353;
  }

  /* input组件 end*/

  body{
    height:100%;
    background-color:gray;
  }

  .circle{
    border-radius: 50%;
  }

  .box{
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
  }

  #app {
    position: absolute;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .leftCnt,.rightCnt {
    position: relative;
    float: left;
    display: inline-block;
  }

  .leftCnt{
    width: 90px;
    height: 100%;
  }

  .rightCnt{
    width: calc(100% - 90px);
    height: 100%;
  }

  .rightCnt .top{
    height: 70px;
    width: 100%;
  }

  .rightCnt .bottom{
    height: calc(100% - 70px);
    width: 100%;
  }
  .rightCnt .bottom > .left, .rightCnt > .bottom >.right{
    height: 100%;
    display: inline-block;
    float: left;
  }
  .rightCnt .bottom >.left{
    width: 20%;
  }

  .rightCnt .bottom > .right{
    width: 80%;
  }

  /* 消息 */
  .msgBox{
    position: relative;
    width: 100%;
    padding: 15px 20px;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
  }

  .msgBox .headImg, .msgBox .content{
    display: inline-block;
  }

  .msgBox .headImg{
    width: 50px;
    height: 50px;
    border-radius: 100%;
    background-color: #418bfa;
  }

  .msgBox .content{
    padding: 10px 9px;
    background-color: lightskyblue;
    border-radius: 5px;
    font-size: 18px;
  }

  .clearfix:after{
    content: ' ';
    display: block;
    clear: both;
  }
</style>
