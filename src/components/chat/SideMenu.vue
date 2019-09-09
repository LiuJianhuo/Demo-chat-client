<template>
    <div class="side-menu">


        <ul>
            <li> {{user.userId}}</li>
            <li>{{user.userName}}</li>
            <li>{{user.accessToken}}</li>
            <li>
                <span class="fa fa-commenting menu-btn" aria-hidden="true"
                      v-bind:class="{active: activedMenuBtn.id===MenuBtn.MSGS}"
                      v-on:click="setActivedMenu(MenuBtn.MSGS)" title="消息">
                    <span class="tip"
                          v-if="activedMenuBtn.id!==MenuBtn.MSGS && toReadMsg&&toReadMsg.msgMsgCount>0"
                          v-bind:title="toReadMsg.msgMsgCount+ '条待处理'">{{toReadMsg.msgMsgCount}}</span>
                </span>
            </li>
            <li>
                <span class="fa fa-address-book menu-btn" aria-hidden="true"
                      v-bind:class="{active: activedMenuBtn.id===MenuBtn.CONTACTS}"
                      v-on:click="setActivedMenu(MenuBtn.CONTACTS)" title="联系人">
                    <span class="tip"
                          v-if="activedMenuBtn.id!==MenuBtn.CONTACTS && toReadMsg&&toReadMsg.contactMsgCount>0"
                          v-bind:title="toReadMsg.contactMsgCount+ '条待处理'">{{toReadMsg.contactMsgCount}}</span>
                </span>
            </li>
        </ul>
    </div>
</template>

<script>
    import MenuBtn from "@/entity/MenuBtn";

    export default {
        name: "SideMenu",
        props: ["activedMenuBtn", "user", "toReadMsg"],
        data: function(){
            return {
                MenuBtn: MenuBtn
            };
        },
        methods: {
            setActivedMenu: function (menuBtnId) {
                this.activedMenuBtn.id = menuBtnId;
            },

        }
    }
</script>

<style scoped>

    .side-menu{
        width: 100%;
        height: 100%;
        background: -webkit-linear-gradient(#56b1fc, #418bfa); /* Safari 5.1 - 6.0 */
        background: -o-linear-gradient(#56b1fc, #418bfa); /* Opera 11.1 - 12.0 */
        background: -moz-linear-gradient(#56b1fc, #418bfa); /* Firefox 3.6 - 15 */
        background: linear-gradient(#56b1fc, #418bfa); /* 标准的语法 */
        box-sizing:border-box;
        -moz-box-sizing:border-box; /* Firefox */
        -webkit-box-sizing:border-box; /* Safari */
        border-radius: 5px 0px 0px 5px;
    }

    ul{
        position: relative;
        top: 40px;
        list-style: none;
    }
    ul li{
        display: block;
        width: 100%;
        padding:20px 0px;
        text-align: center;
        color: white;
    }

    ul li .menu-btn{
        font-size: 30px;

        text-decoration: none;
        cursor: pointer;
        color: rgba(255, 255, 255, .6);
    }

    ul li .menu-btn.active{
        color: white;
    }

    .menu-btn{
        position: relative;
    }

    .tip{
        position: absolute;
        font-size: 16px;
        display: inline-block;
        color: #11ceff;
        background-color: rgba(0, 0, 0, .5);
        padding: 2px 4px;
        z-index: 1;
        border-radius:4px;
        right: -1px;
        top: 13px;
        transform: translate(100%, -100%);
    }


</style>