<template>
    <div id="chat">
        <!-- left -->
        <ul>
            <li><button v-on:click="socketClient.socket.close(3000, '关闭')">断开连接</button></li>
            <li><button v-on:click="socketClient.reconnect()">重新连接</button></li>
        </ul>

        <div class="leftCnt">
            <SideMenu v-bind:activedMenuBtn="activedMenuBtn" v-bind:user="user"
                v-bind:toReadMsg="toReadMsg"></SideMenu>
        </div>

        <!--右侧 right -->
        <div class="rightCnt">
            <!--右侧容器中的 top -->
            <div class="top">
                <div class="readystate red">{{readyStateMsg}}</div>
                <TopBar></TopBar>
            </div>
            <!--右侧容器中底部-->
            <div class="bottom">
                <!-- 右侧容器中底部中的左侧 -->
                <div class="left">
                    <MsgItems v-bind:msgItems="msgItems" v-on:activeRoom="activeRoom" v-bind:activedMenuBtn="activedMenuBtn" v-on:changeContactMain="changeContactMain"></MsgItems>
                </div>
                <!-- 右侧容器中底部中的右侧 -->
                <div class="right">
                    <MsgMain v-if="activedMain === 'msg'" v-bind:activedRoom="activedRoom" v-bind:msgContents="msgContents" v-on:sendMsg="sendMsg"></MsgMain>
                    <ContactMain v-if="activedMain==='contact'"
                                 v-bind:activedOper="activedContactOper"
                                 v-bind:socket="socketClient ? socketClient.socket : null"
                                 v-bind:msgObj="contactMsgObj"></ContactMain>
                    <OtherMain v-else=""> </OtherMain>
                </div>
            </div>

        </div>

    </div>
</template>

<script>
    import SideMenu from "@/components/chat/SideMenu";
    import MsgItems from "@/components/chat/MsgItems";
    import TopBar from "@/components/chat/TopBar";
    import MsgMain from "@/components/chat/MsgMain";
    import Test from "@/components/chat/msgmain/contentArea/test";
    import OtherMain from "@/components/chat/msgmain/otherMain";
    import ContactMain from "@/components/chat/contact/ContactMain";

    import MsgService from "@/service/MsgService";

    import MenuBtn from "@/entity/MenuBtn";
    import Operation from "@/entity/Operation";
    import UserService from "@/service/UserService";
    import SocketClient from "@/service/SocketClient";
    import Msg from "@/service/Msg";
    import Cookies from "js-cookies"

    var msgItems = MsgService.fetchMsgItems();
    var activedRoom = null;
    //const userId = "u" + Math.ceil(Math.random() * 20000);

    export default {
        name: "Chat",
        components:{
            OtherMain,
            Test,
            MsgMain,
            TopBar,
            MsgItems,
            SideMenu,
            ContactMain
        },
        data: function () {
            return {
                websocket:{
                    path:"ws://localhost:3000/chat",
                    socket:null
                },
                msgItems :msgItems,
                activedRoom: activedRoom,
                readyStateMsg:"",
                msgContents: null,
                user: {

                },
                activedMenuBtn:{
                    id : MenuBtn.CONTACTS
                },
                activedContactOper: {//被激活的联系人操作
                    id: null
                },
                activedMain: "contact",
                socketClient: null,
                newRequestAddFriends:[],
                toReadMsg: {
                    contactMsgCount: 0,
                    msgMsgCount:0,
                },
                toReadMsgCount: 0,
                contactMsgObj: 0,
            }
        },
        mounted: function(){
            //初始化
            this.init();
        },
        methods: {

            init: function(){
              //初始化链接服务端websocket
                var socket = this.websocket.socket;
                var userId = this.user.userId;
                if(WebSocket&&!socket){
                    this.readyStateMsg = "连接中...";
                    var socketClient = new SocketClient(this.websocket.path + "?access_token=" + UserService.getAccessToken());

                    socketClient.onopen = this.socketOpen;
                    socketClient.onerror = this.socketError;
                    socketClient.onmessage = this.socketGetMessage;
                    socketClient.onclose = this.socketClose;
                    socketClient.connect();
                    this.socketClient = socketClient;

                }else{
                    this.readyStateMsg = "您的浏览器不支持socket通信!";
                }
            },
            socketOpen: function(){
                this.readyStateMsg = "连接成功";
            },
            socketError: function(){
                this.readyStateMsg = "连接失败";
            },
            socketGetMessage: function(msg){
                //console.log(msg.data);
                var msgObj = JSON.parse(msg.data);
                if(msgObj.msgType === Msg.Type.LOGIN_USER_INF){
                    if(msgObj.isSuccess){
                        this.user = msgObj.user;
                        // if(!Cookies.hasItem("access_token")){
                        //     Cookies.setItem("access_token", msgObj.user.accessToken);
                        // }

                        Cookies.setItem("access_token", msgObj.user.accessToken);
                        var token = UserService.getAccessToken();
                        alert(token)
                    }else{
                        this.readyStateMsg = msgObj.reason;
                    }
                }else if(msgObj.msgType === Msg.Type.REQUEST_ADD_FRIEND){
                    if(this.newRequestAddFriends){
                        this.newRequestAddFriends.push(msgObj.addFriendMsg);
                    }else{
                        this.newRequestAddFriends = [msgObj.addFriendMsg];
                    }
                    this.toReadMsg.contactMsgCount++;
                    this.contactMsgObj = msgObj;
                }
                //添加好友成功
                else if(msgObj.msgType === Msg.Type.ADD_FRIEND_SUCCESS){

                    this.toReadMsg.contactMsgCount++;
                    this.contactMsgObj = msgObj;
                }
                //添加好友失败
                else if(msgObj.msgType === Msg.Type.ADD_FRIEND_FAILURE){
                    this.toReadMsg.contactMsgCount++;
                    this.contactMsgObj = msgObj;
                }
                console.log(msg.data);
            },
            socketClose: function(evt){
                console.log("close code:", evt.code);
                console.log("close reason:", evt.reason);
                if(evt.code === 1006){
                    console.log("自动关闭连接")
                }

                this.readyStateMsg = "已关闭连接";
            },
            sendMsg: function(msgObj){

                var socket = this.websocket.socket;
                alert(WebSocket.OPEN)
                alert(socket.readyState);

                if(!socket){
                    alert("未连接...");
                }else if(socket.readyState === WebSocket.OPEN){
                    socket.send(JSON.stringify(msgObj));
                    alert(JSON.stringify(msgObj));
                }else {
                    alert("还未连接成功")
                }
            },
            //当前活动的房间
            activeRoom: function (roomId) {

                if(!msgItems || msgItems.count < 1){
                    return;
                }

                msgItems.forEach(item => {
                    if(item.room){

                        if(item.room.roomId === roomId){
                            this.activedRoom= item.room;
                            this.msgContents = MsgService.fetchMsgRecords(roomId);
                        }
                    }
                });
            },
            changeContactMain: function(operation){
                //if(operation)
                this.activedContactOper.id = operation.id;

            },
        },

        destroyed() {
            var socket = this.websocket.socket;
            if(socket){
                socket.onclose=this.socketClose;
            }
        }
    }
</script>

<style scoped>
    #chat{
        width: 95%;
        height: 90%;
    }
    .readystate{
        position: absolute;
        top: 0px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 10;
        color: white;
        text-align: center;
        padding: 5px 20px;
        border-radius: 0px 0px 5px 5px;
        font-size: 13px;
    }
    .red{
        background-color: #ffacbe;
    }
</style>