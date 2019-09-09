<template>
    <div class="msg-main">
        <div class="top">
            <TopArea v-bind:activedRoom="activedRoom"></TopArea>
        </div>
        <div class="center">
            <ContentArea v-bind:msgContents="msgContents" v-bind:activedRoom="activedRoom" v-bind:roomMembers="roomMembers"></ContentArea>
        </div>
        <div class="bottom">
            <SendArea v-bind:msgContents="msgContents" v-on:msgAdd="msgAdd" v-bind:activedRoom="activedRoom"></SendArea>
        </div>
    </div>
</template>

<script>
    import TopArea from "@/components/chat/msgmain/TopArea";
    import ContentArea from "@/components/chat/msgmain/ContentArea";
    import SendArea from "@/components/chat/msgmain/SendArea";
    import Sender from "@/service/Sender";
    import MsgService from "@/service/MsgService";
    import RoomService from "@/service/RoomService";

    export default {
        name: "MsgMain",
        components: {SendArea, ContentArea, TopArea},
        props:["activedRoom","msgContents"],
        data : function() {
            return {roomMembers: null};
        },
        mounted: function(){
            //第一次加载的时候也要加载成员
            this.fetchRoomMembers();
        },
        watch: {
            'activedRoom': 'fetchRoomMembers'
        },
        methods:{
            msgAdd:function (msg, type) {
                // {
                //     recordId:"0002",
                //         sender:"u002",
                //     content:"我叫少爷",
                //     isRead: true,
                //     isSuccess:true,
                //     contentType:"text",
                //     dateTime:"2018-12-01 04:23",
                //     timestamp:1255555666
                // }
                //
                var sender = "u002";
                var record = {
                        recordId:"",
                        sender: sender,
                        content:msg,
                        isRead: false,
                        isSuccess:false,
                        contentType:"text",
                        dateTime:"2018-12-01 04:23",
                        timestamp:1255555666
                    }
                this.msgContents.records.push(record);

                var room = this.activedRoom;
                // var msgObj ={
                //     toRoomId:room.roomId,
                //     sender: "u003",
                //     content: msg,
                //     type: type
                // }
                var msgObj = Sender.builderMsg({
                    content: msg,
                    roomId: room.roomId,
                    sender: sender,
                    type: type,
                    timestamp: new Date().getTime()
                });
                this.$emit("sendMsg", msgObj);
            },
            fetchRoomMembers: function(){
                var roomId = this.activedRoom.roomId;
                this.roomMembers = RoomService.fecthRoomMembers(roomId);
            }
        }
    }
</script>

<style scoped>
    .msg-main{
        width: 100%;
        height: 100%;
        border-radius: 0px 0px 5px 0px;
        background-color: white;
        box-sizing:border-box;
        -moz-box-sizing:border-box; /* Firefox */
        -webkit-box-sizing:border-box; /* Safari */
    }

    .msg-main> .top{
        height: 60px;
    }

    .msg-main>.center{
        height: calc(100% - 300px);
    }

    .msg-main>.bottom{
        height: 240px;
    }
</style>