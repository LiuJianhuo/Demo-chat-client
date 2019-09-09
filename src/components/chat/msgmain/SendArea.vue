<template>
    <div class="sendArea">
        <div class="topArea">
            <i class="fa fa-smile-o" aria-hidden="true" title="表情"></i>
            <i class="fa fa-file-o" aria-hidden="true" title="发送文件"></i>
            <i class="fa fa-envelope-o" aria-hidden="true" title="发送邮件"></i>
            <i class="fa fa-microphone" aria-hidden="true" title="发送语音"></i>
            <i class="fa fa-ellipsis-h" aria-hidden="true" title="更多"></i>
        </div>
        <div id="inputMsg" class="inputArea" contenteditable="true" v-on:input="inputMsg">
        </div>
        <div class="bottomArea">
            <div class="right">
                <div class="tip">
                    Enter发送，Ctrl+Enter换行
                </div>
                <div id="msgSendBtn" class="sendbtn " type="button" v-on:click="sendMsg">发送</div>
            </div>
        </div>
    </div>
</template>

<script>
    import Msg from "@/service/Msg";

    export default {
        name: "SendArea",
        props:["msgCotents","activedRoom"],
        created:function(){
            var g = this;
            var keys = [];
            document.onkeydown = function (e) {
                var key = e.key.toLowerCase();
                if(key == "enter" || key == "control"){
                    var len = keys.length;
                    if(len === 0 || (len > 0 && keys[len-1] != key)){
                        keys.push(key);
                    }
                }
            }

            document.onkeypress = function(e){
                var len = keys.length;

                if(len === 0) {return;}
                //判断按下的keys是否为enter键或者是control+enter键
                if(len === 1 ){
                    if(keys[0] == "enter"){
                        e.preventDefault();
                        g.sendMsg();
                    }
                }else if(len === 2){
                    //ctrl + enter换行
                    if(keys[0] == "control" && keys[1] == "enter"){
                        //判断当前元素是否为聚焦的元素
                        if(document.getElementById("inputMsg") == document.activeElement)
                            g.nextLine();
                    }
                }
            }

            document.onkeyup = function (e) {
                var key = e.key.toLowerCase();
                var len = keys.length;
                if(len === 0) {return;}
                //若果键盘松开的是最后一个按上去的键，就取出来，其他情况就全部清空
                //这样可以使得一直按住control再不断重复按住再松开enter键，一键入control+enter组合键
                if(keys[len-1] === key){
                    keys.pop(key);
                }else{
                    keys = [];
                }

            }
        },

        methods:{
            inputMsg : function (e) {
                var ele = e.currentTarget;
                //获取输入的值
                var msg = ele.innerHTML;
                //获取消息发送按钮元素对象
                if(undefined === msg || msg == ""){
                    this.inactiveMsgSendBtn();
                    return;
                }else{
                    this.activeMsgSendBtn();
                }
            },
            sendMsg : function () {
                var inputMsgEle  = document.getElementById("inputMsg");
                var msg = inputMsgEle.innerHTML;
                if(msg == ""){return;}
                //清空
                inputMsgEle.innerHTML = "";
                this.inactiveMsgSendBtn();
                //消息新添入
                this.$emit("msgAdd", msg, Msg.Type.TEXT);
            },
            nextLine: function () {
                var inputMsgEle  = document.getElementById("inputMsg");
                //inputMsgEle.innerHTML = inputMsgEle.innerHTML + "<div><br/></div>";
                var line = "<div><br/></div>";

                if (window.getSelection && window.getSelection().getRangeAt) {

                    var range = window.getSelection().getRangeAt(0);
                    //range.collapse(false);
                    //创建文档片段
                    var node = range.createContextualFragment(line);
                    let lastChild = node.lastChild
                    range.insertNode(node);
                    //将光标移向插入节点的中最后一个节点的之后
                    if (lastChild) {
                        range.setEndAfter(lastChild);
                        range.setStartAfter(lastChild);
                    }

                } else if (document.selection && document.selection.createRange) {
                    document.selection.createRange().pasteHTML(line)
                }
                inputMsgEle.scrollTop = inputMsgEle.scrollHeight;
                this.activeMsgSendBtn();
            },
            activeMsgSendBtn: function () {
                var msgSendEle = document.getElementById("msgSendBtn");
                if(!msgSendEle.classList.contains("active"))
                    msgSendEle.classList.add("active");
            },
            inactiveMsgSendBtn: function () {
                var msgSendEle = document.getElementById("msgSendBtn");
                if(msgSendEle.classList.contains("active"))
                    msgSendEle.classList.remove("active");
            }

        }
    }
</script>

<style scoped>
    .sendArea{
        width: 100%;
        height: 100%;
    }

    .sendArea >.topArea{
        height: 50px;
        display: flex;
        align-items: center;
    }

    .sendArea > .topArea i{
        font-size: 23px;
        color: #959595;
        margin-left: 20px;
        cursor: pointer;
    }

    .sendArea >.inputArea{
        height: calc(100% - 100px);
        padding: 8px 8px;
        border: none;
        box-sizing: border-box;
        -moz-box-sizing: border-box;
        -webkit-box-sizing: border-box;
        outline: none;
        overflow-y: scroll;
    }

    .sendArea >.inputArea::-webkit-scrollbar {/*滚动条整体样式*/
        width: 10px;     /*高宽分别对应横竖滚动条的尺寸*/
        height: 1px;
    }

    .sendArea >.inputArea::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
        border-radius: 10px;
        -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
        background: #535353;
    }


    .sendArea>.inputArea textarea{
        box-sizing: border-box;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        width: 100%;
        height: 100%;
    }

    .sendArea>.bottomArea{
        position: absolute;
        bottom: 0px;
        height: 50px;
        display: flex;
        align-items: center;
    }

    .sendArea >.bottomArea{
        position: relative;
        display: flex;
        align-items: center;
        margin-right: 0px;
    }
    .bottomArea>.right{
        position: absolute;
        right: 15px;
        margin-right: 0px;
    }
    .bottomArea .tip, .bottomArea .sendbtn{
        display: inline-block;
    }

    .bottomArea .tip{
        color: #c2c2c2;
        margin-right: 20px;
    }

    .bottomArea .sendbtn{
        padding: 8px 24px;
        font-size: 18px;
        color: #8d8d8d;
        background-color: #e0e0e0;
        border: none;
        pointer-events: none;
    }

    .bottomArea .sendbtn.active{
        color: #000000;
        cursor: pointer;
        pointer-events: auto;
    }

</style>