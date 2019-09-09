<template>
    <div class="topArea">
        <div class="left">
            <img :src="pics[activedRoom.roomPic]" class="headImg"/>
            <div class="userName">
                {{activedRoom.roomName}}
            </div>
        </div>
        <div class="right">
            <i class="fa fa-plus" aria-hidden="true" title="添加新成员"></i>
            <i class="fa fa-comments" aria-hidden="true" title="消息记录"></i>
            <i class="fa fa-folder-o" aria-hidden="true" title="文件"></i>
            <i class="fa fa-ellipsis-h" aria-hidden="true" title="聊天设置"></i>
        </div>
    </div>
</template>

<script>
    import aa from "@/assets/aa.png"
    import bb from "@/assets/bb.jpg"
    var c = {aa:aa,bb:bb}
    export default {
        name: "Top",
        props:["activedRoom"],
        data:function () {
            return{
                headPortrait:"../../../../../assets/logo.png",
                pics: c,
            }
        }
    }
</script>

<style scoped>
    .topArea{
        position: relative;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        box-sizing: border-box;
        -moz-box-sizing: border-box;
        -webkit-box-sizing: border-box;
        border-bottom: 1px solid rgba(222, 222, 222, 0.37);
    }

    .topArea > .left, .topArea > .right{
        position: absolute;
        display: inline-block;
    }

    .topArea >.left{
        display: flex;
        align-items: center;
        left: 20px;
    }

    .topArea >.left .headImg{
        display: inline-block;
        height: 50px;
        width: 50px;
        background-color: #418bfa;
        border-radius: 100%;
        box-shadow: 1px 1px 12px #c1b9b9;
    }

    .topArea >.left .headImg:hover{
        cursor: pointer;
    }

    .topArea >.left .userName{
        display: inline-block;
        margin-left: 10px;
        font-size: 22px;
    }

    .topArea > .right{
        display: flex;
        align-items: center;
        right: 5px;
    }

    .topArea > .right i{

        color: rgba(128, 128, 128, 0.37);
        font-size: 30px;
        margin-right: 20px;
    }

    .topArea >.right i:hover{
        cursor: pointer;
        color:lightblue;
    }

</style>