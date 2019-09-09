<template>

    <div class="contentArea" id="contentArea">
        <div v-for="record in msgContents.records">
            <RightMsgBox v-if="record.sender==userid" v-bind:record= "record" v-bind:member="findMember(record.sender)"></RightMsgBox>
            <LeftMsgBox v-else v-bind:record="record" v-bind:member="findMember(record.sender)"></LeftMsgBox>
        </div>

    </div>
</template>

<script>
    import LeftMsgBox from "@/components/chat/msgmain/contentArea/LeftMsgBox";
    import RightMsgBox from "@/components/chat/msgmain/contentArea/RightMsgBox";
    export default {
        name: "ContentArea",
        components: {RightMsgBox, LeftMsgBox},
        props:["msgContents", "activedRoom","roomMembers"],
        data: function(){
            return {userid:"u001"}
        },
        watch: {
            'msgContents': 'scrollToBottom'
        },
        methods:{
            scrollToBottom: function () {
                this.$nextTick(() => {
                    var contentAreaEle = document.getElementById('contentArea');
                    contentAreaEle.scrollTop = contentAreaEle.scrollHeight
                });
            },
            findMember: function (userId) {
                var member = null;
                if(!this.roomMembers || this.roomMembers.length < 1){return  null;}

                for(var roomMember of this.roomMembers){
                    if(roomMember.userId === userId){
                        member = roomMember;
                        break;
                    }
                }
                return member;
            }
        }
    }
</script>

<style scoped>
    .contentArea{
        position: relative;
        width: 100%;
        height: 100%;
        background-color: #f1f1f1;
        overflow: scroll;
        overflow-x: hidden;
        scroll-behavior: auto;
        box-sizing: border-box;
        -webkit-box-sizing: border-box;
        -webkit-box-sizing: border-box;
        padding-bottom: 20px;
    }

    .contentArea::-webkit-scrollbar {/*滚动条整体样式*/
        width: 10px;     /*高宽分别对应横竖滚动条的尺寸*/
        height: 1px;
    }

    .contentArea::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
        border-radius: 10px;
        -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
        background: #535353;
    }



</style>