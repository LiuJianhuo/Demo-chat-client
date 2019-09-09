<template>
    <div class="msgBox">
        <div class="left">
            <img class="headImg" v-if="member" :src="pics[member.headPortrait]" />
            <div class="headImg" v-else></div>
            <div class="content" v-html="record.content">
            </div>
        </div>
    </div>
</template>

<script>
    import aa from "@/assets/aa.png"
    import bb from "@/assets/bb.jpg"
    var pics = {aa:aa,bb:bb}
    export default {
        name: "LeftMsgBox",
        props:["record", "member"],
        data: function(){
            return {
                pics: pics
            }
        }
    }
</script>

<style scoped>

    .msgBox>.left{
        display: flex;
        justify-content: flex-start;
        max-width: 60%;
    }

    .msgBox>.left .content{
        margin-left: 10px;
        max-width: calc(100% - 60px);
    }

</style>