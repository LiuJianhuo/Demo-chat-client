<template>
    <div class="contact-center-area scroll">
        <div class="" v-if="activedOper.id===ContactOper.NEW_FRIENDS">
            <div id="friendNotifitation" class="notify bottom-line">
                <div class="item title" style="">好友通知</div>
                <div class="content box">
                    <FriendNotifitation v-for="(notifitation, index) in friendNotifitations" :key="notifitation.msg.status"
                                        v-bind:cptKey="index" v-bind:friendNotifitation="notifitation"
                                        v-on:operationEvt="friendNotifitationOperEvt"
                                        v-on:agreeUser="agreeUser"
                                        v-on:rejectUser="rejectUser">
                    </FriendNotifitation>
                    <div class="none-content" v-if="!friendNotifitations || friendNotifitations.length<1">无好友通知</div>
                </div>
            </div>

            <div class="recomment">
                <div class="item title">推荐好友</div>
                <div class="content box recommand-friends">
                    <RecommendFriend v-for="(recommentFriend, index) in recommendFriends" :key="index" v-bind:user="recommentFriend"
                                     v-on:addUser="addUser" v-bind:cptKey="index"></RecommendFriend>
                    <div class="none-content" v-if="!recommendFriends || recommendFriends.length < 1">无推荐好友</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Operation from "@/entity/Operation";
    import FriendNotifitation from "@/components/chat/contact/main/center/FriendNotifitation";
    import RecommendFriend from "@/components/chat/contact/main/center/RecommendFriend";
    import UserService from "@/service/UserService";
    import Msg from "@/service/Msg";
    import ContactService from "@/service/ContactService";

    export default {
        name: "CenterArea",
        components: {RecommendFriend, FriendNotifitation},
        props:["activedOper", "socket", "comingMsgObj"],
        data: function () {
            return {
                ContactOper: Operation.Contact,
                recommendFriends: null,
                friendNotifitations: null
            }
        },
        watch: {
            'activedOper.id' : 'updateContent',//更新当前界面内容
            'comingMsgObj': 'newMsgComingEvt'
        },
        mounted : function () {
            //若果当前联系人激活的操作是：【新的好友】， 就拉取 好友通知 和 者推荐好友；
            console.log("mounted" + this.activedOper.id)
            if(this.activedOper.id === this.ContactOper.NEW_FRIENDS){
                this.fetchFriendNotifitation();//先拉取好友通知
                this.fetchRecommendFriends();//后拉取推荐好友
            }

        },
        methods:{
            sendMsgBySocket: function(data){
                var socket = this.socket;
                if(socket.readyState === socket.OPEN){
                    socket.send(JSON.stringify(data));
                }else{
                    alert("添加失败");
                }

            },
            newMsgComingEvt: function(){
                console.log("有新的消息传来" , JSON.stringify(this.comingMsgObj));
                var comingMsgObj = this.comingMsgObj;
                if(comingMsgObj.msgType === Msg.Type.ADD_FRIEND_SUCCESS){
                    var addFriendMsg = comingMsgObj.addFriendMsg;
                    var index = 0;
                    var newFriendNotifitation = {
                        isRequester: 1,
                        msg:{
                            msgId: addFriendMsg.msgId,
                            status: addFriendMsg.status,
                            reason: addFriendMsg.reason,
                            requestTime: addFriendMsg.requestTime
                        },
                        otherUser: addFriendMsg.toUser
                    };


                    //界面添加新的好友通知项
                    if(!this.friendNotifitations){

                        this.friendNotifitations = [newFriendNotifitation];
                        return;
                    }
                    for (var friendNotification of this.friendNotifitations){

                        var tempMsg = friendNotification.msg
                        if(tempMsg.msgId ===addFriendMsg.msgId){
                            break;
                        }
                        index++;
                    }
                    if(index < this.friendNotifitations.length){
                        var newItems = new Array(this.friendNotifitations);
                        newItems[index]= newFriendNotifitation;
                        this.friendNotifitations = newItems;

                        console.log("通过index进行更新");
                        console.log(JSON.stringify(this.friendNotifitations[index]))
                    }else{
                        this.friendNotifitations.push(newFriendNotifitation);
                        console.log("通过puShjinxupdate ")
                    }
                }
                else if(comingMsgObj.msgType === Msg.Type.REQUEST_ADD_FRIEND) {
                    var addFriendMsg = comingMsgObj.addFriendMsg;
                    var index = 0;
                    // eslint-disable-next-line no-redeclare
                    var newFriendNotifitation = {
                        isRequester: 0,
                        msg: {
                            msgId: addFriendMsg.msgId,
                            status: addFriendMsg.status,
                            reason: addFriendMsg.reason,
                            requestTime: addFriendMsg.requestTime
                        },
                        otherUser: addFriendMsg.fromUser
                    };

                    if(this.friendNotifitations){
                        for (var friendNotification of this.friendNotifitations){

                            var tempMsg = friendNotification.msg
                            if(tempMsg.msgId ===addFriendMsg.msgId){
                                break;
                            }
                            index++;
                        }
                        if(index < this.friendNotifitations.length){
                            var newItems = this.friendNotifitations;
                            newItems[index]= newFriendNotifitation;
                            this.friendNotifitations = null;
                            //this.friendNotifitations = newItems;
                            console.log("通过index进行更新");
                        }else{
                            this.friendNotifitations.push(newFriendNotifitation);
                            console.log("通过puShjinxupdate ")
                        }
                    }else{
                        this.friendNotifitations = [newFriendNotifitation];
                    }
                }
            },
            addUser: function (user, reason, cptKey) {
                var accessToken = UserService.getAccessToken();
                var $this = this;
                //添加好友
                var postData  = {
                    access_token: accessToken,
                    reason: reason,
                    addUserId: user.userId
                }
                console.log(JSON.stringify(user))
                //添加好友
                ContactService.addUser(postData, function (err, addFriendMsg) {
                    if(err){
                        alert("添加失败fefefe:"+ err);
                        return;
                    }

                    console.log("添加好友成功");
                    // 更新成功，移除推荐好友中的该项
                    $this.recommendFriends.splice(cptKey, 1);

                    var  friendNotifitation = {
                        isRequester: 1,
                        msg:{
                            msgId: addFriendMsg.msgId,
                            requestTime: addFriendMsg.requestTime,
                            reason: reason,
                            status: 0
                        },
                        otherUser: user
                    }
                    if($this.friendNotifitations){
                       // $this.friendNotifitations[0].otherUser.userName='addddddddddddd';
                        var len = $this.friendNotifitations.push(friendNotifitation);
                        //$this.friendNotifitations[len-1] = friendNotifitation;
                    }else{
                        $this.friendNotifitations = [friendNotifitation];
                    }

                    //alert(JSON.stringify($this.friendNotifitations));
                    // 通知对方请求添加的好友
                    var sendedMsg = {
                        msgType: Msg.Type.REQUEST_ADD_FRIEND,
                        accessToken: accessToken,
                        addFriendMsg: {
                            msgId: addFriendMsg.msgId
                        }
                    }
                    $this.sendMsgBySocket(sendedMsg);
                });
            },
            friendNotifitationOperEvt: function(operEvtObj){
                var ContactOper = this.ContactOper;
                var msgId = operEvtObj.msgId;//操作的消息id
                var cptKey = operEvtObj.cptKey; //组件所在的key
                var operEvtType = operEvtObj.type; //操作事件类型
                var $this = this;
                var accessToken = UserService.getAccessToken();

                var data = {
                    msgId: msgId,
                    access_token: accessToken
                }
                if(operEvtType === ContactOper.AGREE_USER){
                    ContactService.postUserAgreed(data, function (error, data) {
                        if(error){
                            alert(error);
                        }else {
                            if(data.isSuccess){
                                $this.friendNotifitations[cptKey].msg.status = 1;
                                //通知对方好友添加好友成功
                                //通知对方好友添加好友失败
                                var postData = {
                                    msgType: Msg.Type.ADD_FRIEND_SUCCESS,
                                    accessToken: accessToken,
                                    addFriendMsg: {
                                        msgId: msgId
                                    }
                                }
                                $this.sendMsgBySocket(postData);
                            }else{
                                alert(data.reason);
                            }
                        }
                    });
                }else if(operEvtType === ContactOper.REJECT_USER) {
                    ContactService.postUserRejected(data, function (error, data) {
                        if(error){
                            alert(error);
                        }else {
                            if(data.isSuccess){
                                $this.friendNotifitations[cptKey].msg.status = -1;
                                //通知对方好友添加好友失败
                                var postData = {
                                    msgType: Msg.Type.ADD_FRIEND_FAILURE,
                                    accessToken: accessToken,
                                    addFriendMsg: {
                                        msgId: msgId
                                    }
                                }
                                $this.sendMsgBySocket(postData);
                            }else{
                                alert(data.reason);
                            }
                        }
                    });
                }
            },
            rejectUser: function(msgId){
                alert(msgId)
                var socket = this.socket;
                if(socket.readyState === socket.OPEN){
                    var msg = {
                        accessToken:UserService.getAccessToken(),
                        msgType: Msg.Type.REJECT_USER,
                        msgId: msgId
                    }
                    socket.send(JSON.stringify(msg));
                }else{
                    alert("拒绝失败")
                }
            },
            agreeUser: function(msgId){
                alert(msgId)
                var socket = this.socket;
                if(socket.readyState === socket.OPEN){
                    var msg = {
                        accessToken:UserService.getAccessToken(),
                        msgType: Msg.Type.AGREE_USER,
                        msgId: msgId
                    }
                    socket.send(JSON.stringify(msg));
                }else{
                    alert("同意失败")
                }
            },
            //更新当前界面内容
            updateContent: function () {

                if (this.activedOper.id === this.ContactOper.NEW_FRIENDS){
                    this.fetchRecommendFriends();
                    this.fetchFriendNotifitation();
                }
            },
            fetchRecommendFriends: function () {
                var $this = this;
                UserService.fetchRecommendFriends(function (error, users) {
                    if (error) {
                        $this.recommendFriends = null;
                        return;
                    }
                    if (users && users.length > 1) {
                        $this.recommendFriends = users;
                    }
                });
            },
            fetchFriendNotifitation: function () { //拉取好友通知消息，添加好友
                var $this = this;
                ContactService.fetchFriendNotifitation(function (error, notifitations) {
                    if(error){
                        console.log(error)
                        $this.friendNotifitations = null;
                        return;
                    }
                    console.log(notifitations)
                    if(notifitations && notifitations.length > 0){
                        $this.friendNotifitations = notifitations;
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .contact-center-area{
        width: 100%;
        height: 100%;
        overflow-x: hidden;
    }

    .clearfix:before,.clearfix:after{
        content: ' ';
        clear: both;
    }

    .item{
        padding: 10px 20px;
    }

    .title{
        font-weight: bold;
    }

    .content{
        width: 100%;
        height: 40%;
    }

    .bottom-line{
        border-bottom: 1px solid rgba(222, 222, 222, .4);
    }

    .none-content{
        width: 100%;
        height: 50px;
        text-align: center;
        font-size: 20px;
        font-weight: bold;
        color: rgba(0, 0, 0, .3);
    }



    /*
      子组件布局
     */


    .can-active-item{
        cursor: pointer;
    }

    .can-active-item:hover{
        background-color: rgba(222, 222, 222, .6);
    }

    /deep/ .item{
        display: flex;
        align-items: center;
    }

    /deep/ .left, .right{
        display: inline-block;
    }

    /deep/ .left-box{
        display: flex;
        align-items: center;
        margin-left: 5px;
    }

    /deep/  .right{
        margin-right: 5px;
        margin-left: auto;
    }

    /deep/ .picture{
        width: 45px;
        height: 45px;
        background: #42b983;
        margin-right: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: revert;
        font-size: 18px;
        color: white;
    }

    /deep/ .item-name{
        font-size: 18px;
        margin-bottom: 6px;
    }

    /deep/ .btn{
        color: #56b1fc;
        font-size: 17px;
        border: 1px solid #56b1fc;
        padding: 4px 16px;
        border-radius: 5px;
    }

    /deep/ .btn:hover{
        background-color: #dedede;
    }
    /deep/ .friend-item-inf{
        padding: 1px 0px;
        border-radius: 5px;
        font-size: 13px;
        text-align: center;
        color: #ffffff;
        display: inline-block;
        padding: 2px 5px;
    }

    /deep/ .item-name{
        margin-bottom: 3px;
    }

    /deep/ .mars{
        background-color: #29bbff;
    }

    /deep/ .venus{
        background-color: #ff77f6;
    }

    /deep/ .default{
        background-color: #4caf50;
    }

    /deep/ .sex, .age{
        color: white;
        margin-left: 5px;
    }

    /deep/ .venus .sex{
        transform: rotate(180deg);
    }

</style>