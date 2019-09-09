<template>
    <div id="register">

        <div class="input-group" v-bind:class="{error : errorModel==='userName'}">
            <i class="fa fa-user input-icon" aria-hidden="true"></i>
            <input type="text" placeholder="Username" v-model="data.userName"/>
        </div>
        <div class="input-group" v-bind:class="{error : errorModel==='email'}">
            <i class="fa fa-envelope input-icon" aria-hidden="true"></i>
            <input type="text" placeholder="Email Address" v-model="data.email"/>
        </div>
        <div class="input-group" v-bind:class="{error : errorModel==='password'}">
            <i class="fa fa-lock input-icon" aria-hidden="true"></i>
            <input type="password" placeholder="Password" v-model="data.password"/>
        </div>
        <div class="input-group" v-bind:class="{error : errorModel==='againPassword'}">
            <i class="fa fa-key input-icon" aria-hidden="true"></i>
            <input type="password" placeholder="Again Password" v-model="data.againPassword"/>
        </div>
        <div class="input-group">
            <div class="input-icon"></div>
            <input type="checkbox" id="keep" v-model="data.agree"/>
            <label for="keep"><i>是否接受</i></label><i class="agreement"><a href="#">协议</a></i>
        </div>
        <OperaterBtn v-bind:operation="Operation.REGISTER" v-on:operateError="operateError" v-bind:data="data"></OperaterBtn>
    </div>
</template>

<script>
    import axios from 'axios';
    import RequestUrl from "@/service/RequestUrl";
    import OperaterBtn from "@/components/login_register/operater/OperaterBtn";
    import Operation from "@/entity/Operation";

    export default {
        name: "Register",
        components: {OperaterBtn},

        data: function(){
            return {
                userName: "",
                password:"",
                againPassword:"",
                Operation:Operation,
                data:{
                    userName: "",
                    email:"",
                    password:"",
                    againPassword:"",
                    agree: false
                },
                errorModel:null
            }
        },
        methods:{
            register: function () {
                //发送请求
                axios
                    .post(RequestUrl.REGISTER,{
                        userName: this.userName,
                        password: this.password
                    })
                    .then(function (res) {
                        var data = res.data;

                        if(data.isSuccess){
                            alert(data.access_token);
                            alert(data.expire);
                            alert("注册成功")
                        }else{
                            alert(data.reason)
                        }


                    })
                    .catch(function (error) { // 请求失败处理
                        alert(error +"错误")
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
    #register{
        width: 100%;
        /*height: 100%;*/
    }
    .register-box{
        margin: 100px auto;
    }

    .agreement{
        font-weight: bold;
        margin-left: 2px;
    }
</style>