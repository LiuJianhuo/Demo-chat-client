<template>
    <div class="msg-item" v-on:mousemove="mouseMoveMsgItem" v-on:mouseleave="mouseLeaveMsgItem"
         v-bind:data-id="msgItem.room.roomId" v-on:click="activeItem">
        <div class="remove" v-on:click="removeMsgItem" v-bind:data-id="msgItem.room.roomId">
            <i class="fa fa-times" aria-hidden="true"></i>
        </div>
        <div class="img-circle">

        </div>
        <div class="userInf">
            <div class="row" style="position: relative">
                <div class="userName">{{msgItem.room.roomName}}</div>
                <div class="datetime">{{msgItem.lastRecord.dateTime}}</div>
            </div>

            <div class="lastMsg">{{msgItem.lastRecord.content}}</div>
        </div>

    </div>
</template>

<script>
    export default {
        name: "MsgItem",
        props:["msgItem"],
        methods:{
            mouseMoveMsgItem: function (e) {
                var ele = e.currentTarget;
                var remove = ele.querySelector(".remove");
                remove.style.display = "flex";
            },
            mouseLeaveMsgItem: function (e) {
                var ele = e.currentTarget;
                var remove = ele.querySelector(".remove");
                remove.style.display = "none";

            },
            removeMsgItem: function (e) {
                var ele = e.currentTarget;
                var userId = ele.parentNode.getAttribute("data-id");
                alert(userId);
            },
            activeItem: function (e) {
                var ele = e.currentTarget;
                if(ele.classList.contains("active")){
                    return;
                }

                ele.parentNode.childNodes.forEach(childNode=>{
                    if(ele != childNode && childNode.classList.contains("active")){
                        childNode.classList.remove("active");
                        return false;
                    }
                })
                ele.classList.add("active");

                //获取当前的被active的房间
                var roomId = ele.attributes.getNamedItem("data-id").value;
                this.$emit("activeRoom",roomId);
            }

        }
    }


</script>

<style scoped>
    .msg-item{
        width: 100%;
        height: 65px;
        box-sizing:border-box;
        -moz-box-sizing:border-box; /* Firefox */
        -webkit-box-sizing:border-box; /* Safari */
        position: relative;
        border-bottom: 1px solid #dedede;
    }
    .msg-item.active,.msg-item.active:hover{
        background-color: rgba(234, 234, 234, 0.85);
    }

    .msg-item:hover{
        background-color: rgba(234, 234, 234, 0.4);
    }

    .msg-item .remove,.msg-item .img-circle,.msg-item .userInf{
        position: absolute;
    }

    .msg-item .remove{
        display: none;
        align-items: center;
        top: 0px;
        bottom: 0px;
        left: 5px;
        font-size: 10px;
    }

    .msg-item .remove:hover{
        display: flex;
        cursor: pointer;
    }

    .msg-item .img-circle{
        top:0px;
        bottom: 0px;
        margin: auto;
        border-radius: 100%;
        background-color: #418bfa;
        width: 55px;
        height: 55px;
        left: 21px;
    }

    .msg-item .userInf{
        height: 100%;
        left: 90px;
        width: calc(100% - 99px);
    }
    .userInf .row {
        width: 100%;
    }
    .userInf .userName, .userInf .datetime{
        display: inline-block;
    }
    .userInf .datetime{
        position: absolute;
        top:10px;
        margin-right: 0px;
        right: 2px;
    }

    .userInf .userName{
        padding: 3px 0px;
        font-size: 20px;
    }
    .userInf .lastMsg{
        padding-top: 5px;
        font-size: 14px;
        color: gray;
        text-overflow: ellipsis;
        overflow:hidden;
        white-space: nowrap;
    }
</style>