<template>
    <div class="item can-active-item recommand-friend-item clearfix" v-bind:data-id="user.userId">
        <div class="left left-box">
            <div class="circle picture">
                {{user.userName.substr(user.userName.length>1 ? -2 : -1)}}
            </div>
            <div>
                <div class="item-name">{{user.userName}}</div>
                <div class="item-inf">
                    <div class="friend-item-inf" v-bind:class="user.gender!==null? (user.gender === UserEntiy.MAN ? 'mars' : 'venus'): 'default'">
                        <i class="fa fa-mars sex" aria-hidden="true" v-if="user.gender!==null"></i>
                        <span class="age" v-if="user.age!==null">{{user.age}}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="right">
            <div class="btn add-btn" v-on:click="addUser">添加</div>
        </div>
    </div>
</template>

<script>
    import UserEntiy from "@/entity/User";
    import UserService from "@/service/UserService";

    export default {
        name: "RecommendFriend",
        props: ["user", "cptKey"],
        data:function () {
            return {
                // user:{
                //     userId:'001',
                //     userName: 'fff',
                //     gender: UserEntiy.WOMAN,
                //     age:null
                // },
                UserEntiy: UserEntiy
            }
        },
        methods: {
            addUser: function () {
                var user = this.user;
                this.$emit("addUser", user, "我是"+ user.userName, this.cptKey);
            }
        }
    }
</script>

<style scoped>
    .friend-item{

    }

    .friend-item-inf{
        padding: 1px 0px;
        border-radius: 5px;
        font-size: 13px;
        text-align: center;
        color: #ffffff;
        display: inline-block;
        padding: 2px 5px;
    }

    .item-name{
        margin-bottom: 3px;
    }

    .mars{
        background-color: #29bbff;
    }

    .venus{
        background-color: #ff77f6;
    }

    .sex, .age{
        color: white;
        margin-left: 5px;
    }

    .venus .sex{
        transform: rotate(180deg);
    }


</style>