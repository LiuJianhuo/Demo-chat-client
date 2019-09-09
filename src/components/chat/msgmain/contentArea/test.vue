<template>
    <div class="box">

        <div class="msgBox">
            <div class="msgCtn" v-html="msgcnt">

            </div>
            <div class="headImg"></div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "test",
        data: function () {
            return {msgcnt : "你好呀"}
        }

    }
</script>

<style scoped>
    .box{
        position: relative;
        margin-top: 50px;
        width: 600px;
        height: 700px;
        background-color: red;
    }

    .msgBox{
        position: relative;
        display: flex;
        justify-content: flex-end;
        float: right;
        width: 60%;
        padding: 0px;
    }
    .msgCtn{
        position: relative;
        display: inline-block;
        color: white;
        background-color: #2c3e50;
        margin-right: 5px;
    }
    .headImg{
        display: inline-block;
        position: relative;
        width: 50px;
        height: 50px;
        background-color: #418bfa;
        border-radius: 100%;
    }
</style>