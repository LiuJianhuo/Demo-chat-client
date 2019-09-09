<template>
    <div class="msgBox clearfix">
        <div class="right">
            <div class="content" v-html="record.content"></div>
            <img class="headImg" v-if="member" :src="pics[member.headPortrait]" />
            <div class="headImg" v-else></div>
        </div>
    </div>
</template>

<script>
    import aa from "@/assets/aa.png"
    import bb from "@/assets/bb.jpg"
    var pics = {aa:aa,bb:bb}

    export default {
        name: "RightMsgBox",
        props:["record","member"],
        data: function(){
            return {
                pics: pics
            }
        },
        methods:{
        }
    }
</script>

<style scoped>

    .msgBox>.right{
        display: flex;
        justify-content: flex-end;
        max-width: 60%;
        float: right;
        margin-right: 15px;
    }
    .msgBox>.right .content{
        margin-right: 10px;
        box-sizing: border-box;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        width: calc(100% - 60px);
    }

</style>