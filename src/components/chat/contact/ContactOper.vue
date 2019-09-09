<template>
    <div class="contact-oper-box" >
        <ul>
            <li class="contact-oper-item"  v-bind:class="{active: activedOper.id === ContackOper.FRIENDS}"
                    v-on:click="setActivedOper(ContackOper.FRIENDS)">
                <div class="circle oper-img ">
                    <i class="fa fa-user" aria-hidden="true"></i>
                </div>
                <div class="oper-name">
                    我的好友
                </div>
            </li>
            <li class="contact-oper-item" v-bind:class="{active: activedOper.id === ContackOper.NEWFRIENDS}"
                    v-on:click="setActivedOper(ContackOper.NEW_FRIENDS)">
                <div class="circle oper-img bg-blue">
                    <i class="fa fa-user-plus" aria-hidden="true"></i>
                </div>
                <div class="oper-name">
                    新的好友
                </div>
            </li>
            <li class="contact-oper-item" v-bind:class="{active: activedOper.id === ContackOper.GROUP}"
                    v-on:click="setActivedOper(ContackOper.GROUP)">
                <div class="circle oper-img bg-organge">
                    <i class="fa fa-users" aria-hidden="true"></i>
                </div>
                <div class="oper-name">
                    我的群组
                </div>
            </li>
            <li class="contact-oper-item" v-bind:class="{active: activedOper.id === ContackOper.CARE}"
                    v-on:click="setActivedOper(ContackOper.CARE)">
                <div class="circle oper-img bg-red">
                    <i class="fa fa-heart" aria-hidden="true"></i>
                </div>
                <div class="oper-name">
                    特别关心
                </div>
            </li>
        </ul>

    </div>
</template>

<script>
    import Operation from "@/entity/Operation";
    export default {
        name: "ContactOper",
        props:["activedOper"],
        data: function(){
            return {
                ContackOper : Operation.Contact,
            }
        },
        methods:{
            setActivedOper: function (operation) {
                this.activedOper.id = operation;
            }
        }
    }


</script>

<style scoped>
    .contact-oper-box{
        width: calc(100% - 5px);
        height: 100%;
    }

    .contact-oper-item{
        display: flex;
        align-items: center;
        height: 60px;
        padding: 5px 20px;
        border-bottom: 1px solid rgba(234, 234, 234, 0.85);
        cursor: pointer;
    }

    .contact-oper-item:hover{
        background-color: rgba(234, 234, 234, 0.4);
    }

    .contact-oper-item.active:hover{
        background-color: rgba(234, 234, 234, 0.85);
    }

    .contact-oper-item.active{
        background-color: rgba(234, 234, 234, 0.85);
    }

    .contact-oper-item .oper-img, .contact-oper-item .oper-name{
        display: inline-block;
    }
    .contact-oper-item .oper-img{
        display: flex;
        align-items: center;
        justify-content: center;
        color: #ffffff;
        font-size: 30px;
        width: 50px;
        height: 50px;
        background-color: #42b983;
    }

    .contact-oper-item .oper-name{
        margin-left: 15px;
    }

    .oper-img.bg-blue{
        background-color: blueviolet;
    }

    .oper-img.bg-red{
        background-color: red;
    }

    .oper-img.bg-organge{
        background-color: orange;
    }
</style>