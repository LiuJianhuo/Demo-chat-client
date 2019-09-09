<template>
    <div id="login">
        <div class="input-group" v-bind:class="{error : errorModel==='userName'}">
            <i class="fa fa-user input-icon" aria-hidden="true"></i>
            <input type="text" placeholder="Account" v-model="data.userName"/>
        </div>
        <div class="input-group" v-bind:class="{error : errorModel==='password'}">
            <i class="fa fa-key input-icon" aria-hidden="true"></i>
            <input type="text" placeholder="Password" v-model="data.password"/>
        </div>
<!--        <div class="input-group">-->
<!--            <div class="input-icon"></div>-->
<!--            <input type="checkbox" id="keep" />-->
<!--            <label for="keep"><i>保持登录状态</i></label>-->
<!--        </div>-->
        <OperaterBtn v-bind:operation="Operation.LOGIN"  v-on:operateError="operateError" v-bind:data="data"></OperaterBtn>
<!--        <a class="login-btn circle">-->
<!--            <i class="fa fa-arrow-right login-icon" aria-hidden="true"></i>-->
<!--        </a>-->
    </div>
</template>

<script>
    import axios from 'axios'
    import OperaterBtn from "@/components/login_register/operater/OperaterBtn";
    import Operation from "@/entity/Operation";

    export default {
        name: "Login",
        components: {OperaterBtn},

        data: function(){
            return {
                userName: "",
                password:"",
                Operation: Operation,
                data:{
                    userName:null,
                    password:null,
                    operation: "login",

                },
                errorModel: null
            }
        },
        methods:{
            login: function () {
                //发送请求
                axios
                    .get('http://localhost:3000/login',{
                        params: {
                            userName: this.userName,
                            password: this.password
                        }

                    })
                    .then(function (res) {
                        alert(res.data.isSuccess);
                        alert(JSON.stringify(res.headers));

                    })
                    .catch(function (error) { // 请求失败处理
                        alert(error)
                    });

            },
            operateError:function (error) {
                this.errorModel = error.bindModel;
                this.$emit("operateError", error)
            }
        }
    }
</script>

<style scoped>
    #login{
        width: 100%;
        height: 100%;
    }


    .login-btn{
        position: absolute;
        top: calc(50% - 25px);
        right: -25px;
        display: flex;
        width: 50px;
        height: 50px;
        background-color: #f44336;
        align-items: center;
        justify-content: center;
        box-shadow: 1px 1px 12px #312525;
        cursor: pointer;
    }

    .login-btn:hover{
        box-shadow: 2px 1px 13px #312525;
    }

    .login-btn:active{
        background-color: black;
    }

    .login-icon{
        font-size: 20px;
        color: #ffffff;
    }

</style>