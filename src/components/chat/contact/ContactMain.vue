<template>
    <div class="contact-main" id="contactMain">
        <div class="top">
            <TopBar v-bind:activedOper="activedOper"></TopBar>
        </div>
        <div class="center">
            <CenterArea v-bind:activedOper="activedOper" v-bind:socket="socket" v-bind:comingMsgObj="this.newFriend.comingMsgItem"></CenterArea>

        </div>
    </div>
</template>

<script>
    import TopBar from "@/components/chat/contact/main/TopBar";
    import CenterArea from "@/components/chat/contact/main/CenterArea";
    import Msg from "@/service/Msg";
    import Operation from "@/entity/Operation";
    export default {
        name: "ContactMain",
        components: {CenterArea, TopBar},
        props: ["activedOper", "socket", "msgObj"],
        data: function(){
            return {
                ContactOper: Operation.Contact,
                newFriend: {
                    comingMsgItem: null
                }
            }
        },
        mounted: function () {
        },
        watch: {
            'activedOper.id': 'changeMain',
            'msgObj': 'receiveMsg'
        },
        methods: {
            changeMain: function () {
                alert(this.activedOper.id)
            },
            receiveMsg: function () {
                var msgObj = this.msgObj;
                var ContactOper = this.ContactOper;
                console.log("接受到了chat传来的消息");

                if(this.activedOper.id === ContactOper.NEW_FRIENDS){
                    this.newFriend.comingMsgItem = msgObj;
                    console.log("向新的好友传送消息" + JSON.stringify(msgObj))
                }

            }
        }
    }
</script>

<style scoped>
    .contact-main{
        width: 100%;
        height: 100%;
        border-radius: 0px 0px 5px 0px;
        background-color: white;
        box-sizing:border-box;
        -moz-box-sizing:border-box; /* Firefox */
        -webkit-box-sizing:border-box; /* Safari */
    }

    .contact-main>.top{
        width: 100%;
        height: 50px;
    }

    .contact-main>.center{
        height: calc(100% - 60px);
    }
</style>