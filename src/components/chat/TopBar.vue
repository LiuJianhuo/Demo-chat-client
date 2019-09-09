<template>
    <div class="topbar">
        <div class="search">

            <input type="text" placeholder="搜索联系人、群组、聊天记录等"/>
            <i class="fa fa-search" aria-hidden="true"></i>
        </div>

    </div>
</template>

<script>
    export default {
        name: "TopBar"
    }
</script>

<style scoped>
    .topbar{
        position: relative;
        height: 100%;
        width: 100%;
        background-color: white;
        box-sizing:border-box;
        -moz-box-sizing:border-box; /* Firefox */
        -webkit-box-sizing:border-box; /* Safari */
        border-bottom: 1px solid #dedede;
        border-radius: 0px 5px 0px 0px;
    }

    .search{
        position: absolute;
        left: 3px;
        top:50%;
        width: 300px;
        height: 40px;
        margin-top: -20px;
        align-content: center;
        vertical-align: middle;
    }
    .search i, .search input{
        position: absolute;
    }

    .search i{
        display: flex;
        align-items: center;
        top: 0px;
        bottom: 0px;
        left: 2px;
        color: #525252;
        font-size: 23px;
    }
    .search input{
        width: 100%;
        height: 100%;
        padding-left: 30px;
        box-sizing: border-box;
        -moz-box-sizing: border-box;
        -webkit-box-sizing: border-box;
        border: none;
        font-size: 16px;
    }
    .search input:hover{
        background-color: #dedede;
        opacity: 0.3;
    }


</style>