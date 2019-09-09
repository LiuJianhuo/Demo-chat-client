<template>
    <div class="item can-active-item friend-item clearfix">
        <div class="left left-box">
            <div class="circle picture">
                {{user.userName.substr(user.userName.length>1 ? -2 : -1)}}
            </div>
            <div>
                <div class="item-name">{{user.userName}}</div>
                <div class="item-inf">
                    <div class="friend-item-inf" v-bind:class="user.gender!==null? (user.gender === UserEntiy.MAN ? 'mars' : 'venus'): 'default'">
                        <i class="fa fa-mars sex" aria-hidden="true" v-if="user.gender!==null"></i>
                        <span class="age" v-if="user.age!==null">{{user.age}}</span>
                    </div>
                    <span  v-if="friendNotifitation.isRequester===1" class="friend-item-status">{{msg.status=== 0 ? "等待对方接受" : (msg.status === 1 ? "对方已同意" : "对方已拒绝")}}</span>
                    <span  v-else class="friend-item-status">{{msg.status===0 ? "好友请求" : (msg.status === 1 ? "已同意" : "已拒绝")}}</span>
                </div>


            </div>
        </div>
        <div class="right" v-if="msg.status === 0">
            <div class="btn add-btn" v-if="friendNotifitation.isRequester===1" v-on:click="operationEvt(ContactOper.REJECT_USER)">再次添加</div>
            <div class="" v-else>
                <div class="btn agree-btn" v-on:click="operationEvt(ContactOper.AGREE_USER)" >同意</div>
                <div class="btn reject-btn" v-on:click="operationEvt(ContactOper.REJECT_USER)">拒绝</div>
            </div>

        </div>
    </div>

</template>

<script>
    import UserEntiy from "@/entity/User";
    import Operation from "@/entity/Operation";

    export default {
        name: "FriendNotifitation",
        props:["friendNotifitation", "cptKey"],
        data: function () {
            return {
                user: this.friendNotifitation.otherUser,
                msg: this.friendNotifitation.msg,
                UserEntiy: UserEntiy,
                ContactOper: Operation.Contact,
            }
        },
        methods: {
            rejectUser: function (msgId) {
                this.$emit("rejectUser", msgId);
            },
            agreeUser: function (msgId) {
                this.$emit("agreeUser", msgId);
            },
            //operType: 操作类型
            operationEvt: function (operType) {

                var ContactOper = this.ContactOper;
                var msg = this.msg;
                var operEvtObj = {
                    type: operType,
                    msgId: msg.msgId,
                    cptKey: this.cptKey
                }
                this.$emit("operationEvt", operEvtObj);
            }
        }
    }
</script>

<style scoped>
    .friend-item{
        display: flex;
        align-items: center;
    }

    .friend-item-status{
        color: rgba(0, 0, 0,.4);
        font-size: 15px;
        margin-left: 5px;
    }

    .reject-btn, .agree-btn{
        display: inline-block;
    }
    .reject-btn{
        margin-left: 5px;
    }
</style>