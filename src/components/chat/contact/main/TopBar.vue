<template>
    <div class="contact-top-bar">
        <div class="left">
            <div class="contact-oper-item"  v-if="activedOper.id === ContackOper.FRIENDS"
                 v-on:click="setActivedOper(ContackOper.FRIENDS)">
                <div class="circle oper-img ">
                    <i class="fa fa-user" aria-hidden="true"></i>
                </div>
                <div class="oper-name">
                    我的好友
                </div>
            </div>
            <div class="contact-oper-item" v-else-if="activedOper.id === ContackOper.NEWFRIENDS"
                v-on:click="setActivedOper(ContackOper.NEWFRIENDS)">
                <div class="circle oper-img bg-blue">
                    <i class="fa fa-user-plus" aria-hidden="true"></i>
                </div>
                <div class="oper-name">
                    新的好友
                </div>
            </div>
            <div class="contact-oper-item" v-else-if="activedOper.id === ContackOper.GROUP"
                v-on:click="setActivedOper(ContackOper.GROUP)">
                <div class="circle oper-img bg-organge">
                    <i class="fa fa-users" aria-hidden="true"></i>
                </div>
                <div class="oper-name">
                    我的群组
                </div>
            </div>
            <div class="contact-oper-item" v-else-if="activedOper.id === ContackOper.CARE"
                v-on:click="setActivedOper(ContackOper.CARE)">
                <div class="circle oper-img bg-red">
                    <i class="fa fa-heart" aria-hidden="true"></i>
                </div>
                <div class="oper-name">
                    特别关心
                </div>
            </div>
        </div>
        <div class="right" v-if="(activedOper.id === ContackOper.NEWFRIENDS)||(activedOper.id === ContackOper.GROUP)">
            <i class="fa fa-plus add-icon" aria-hidden="true" title="添加好友"></i>
        </div>
    </div>
</template>

<script>
    import Operation from "@/entity/Operation";

    export default {
        name: "TopBar",
        props:["activedOper"],
        data: function () {
            return {
                ContackOper: Operation.Contact,
            }
        }
    }
</script>

<style scoped>
    .contact-top-bar{
        position: relative;
        width: 100%;
        height: 100%;
    }

    .contact-top-bar ul,li{
        height: 100%;
    }

    .contact-top-bar .left,.contact-top-bar .right{
        display: inline-block;
        height: 100%;
    }
    .contact-top-bar .left{
        position: relative;
        width: 100%;
    }
    .contact-oper-item{
        height: 100%;

    }

    .contact-top-bar .right{
        position: absolute;
        top:0px;
        bottom: 0px;
        right: 20px;
        display: flex;
        align-items: center;


    }

    .contact-oper-item{
        display: flex;
        align-items: center;
        border-bottom: 1px solid #dedede;
    }


    .contact-oper-item .oper-img, .contact-oper-item .oper-name{
        display: inline-block;
    }
    .contact-oper-item .oper-img{
        display: flex;
        align-items: center;
        justify-content: center;
        color: #ffffff;
        font-size: 25px;
        width: 40px;
        height: 40px;
        margin-left: 20px;
        background-color: #42b983;
    }

    .contact-oper-item .oper-name{
        margin-left: 15px;
    }
     oper-img.bg-blue{
        background-color: blueviolet;
    }

    .oper-img.bg-red{
        background-color: red;
    }

    .oper-img.bg-organge{
        background-color: orange;
    }
    .oper-img.bg-blue{
        background-color: blueviolet;
    }
    .add-icon{
        font-size: 25px;cursor: pointer;
        color: gray;
    }

    .add-icon:hover{
        color: #418bfa;
    }

</style>