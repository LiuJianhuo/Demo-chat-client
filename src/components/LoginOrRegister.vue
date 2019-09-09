<template>

    <div class="container">
        <div class="main-box">
            <div class="error-box" v-if="errorMsg">
                <div class="error-info" >
                    {{errorMsg}}
                </div>
            </div>
            <div style="position: relative">
                <h1 class="title">Chat {{title}}</h1>
            </div>
            <Login v-if="activedOperation===Operation.LOGIN" v-on:operateError="operateError"></Login>
            <Register v-else-if="activedOperation===Operation.REGISTER"  v-on:operateError="operateError"></Register>
            <ForgetPwd v-else v-on:operateError="operateError"></ForgetPwd>
            <div class="operate-items">
                <ul>
                    <li class="circle operate-item bg-green active" v-if="activedOperation !==Operation.LOGIN"
                        v-on:click="setActivedOperation(Operation.LOGIN)">
                        <span class="operate-item-text">Login</span>
                    </li>
                    <li class="circle operate-item bg-organge" v-if="activedOperation!==Operation.FORTGETPWD"
                        v-on:click="setActivedOperation(Operation.FORTGETPWD)">
                        <span class="operate-item-text">Forget Pwd</span>
                    </li>
                    <li class="circle operate-item bg-red bg-register" v-if="activedOperation!==Operation.REGISTER"
                        v-on:click="setActivedOperation(Operation.REGISTER)">
                        <span class="operate-item-text">Register</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>

</template>

<script>
    import Login from "@/components/login_register/Login";
    import Register from "@/components/login_register/Register";
    import ForgetPwd from "@/components/login_register/ForgetPwd";
    import Operation from "@/entity/Operation";

    export default {
        name: "LoginOrRegister",
        components: {ForgetPwd, Register, Login},
        data: function(){
          return {
              activedOperation : "login",
              title: "Login",
              activedOperationObj :{
                  operation: "login",
              },
              errorMsg: "",
              Operation: Operation,
          }
        },
        mounted : function () {

        },
        methods: {
            operateError: function (error) {
                this.errorMsg = error.reason;
            },
            setActivedOperation: function(operation){
                this.errorMsg = null;
                this.activedOperation = operation;
                if(Operation.LOGIN === operation){
                    this.title = "Login";
                }else if(operation === Operation.REGISTER){
                    this.title = "Reg";
                }else if(operation === Operation.FORTGETPWD){
                    this.title = "Pwd";
                }
            }
        }

    }
</script>

<style scoped>
    .container{
        width: 100%;
        height: 100%;
        background-color: #ffffff;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .container:before{
        position: absolute;
        top: 0px;
        left: 0px;
        content: ' ';
        background-color: #00bcd4;
        height: 50%;
        width: 100%;
        z-index: 0;
    }

    .main-box {
        position: relative;
        width: 500px;
        /*height: 300px;*/
        background-color: #ffffff;
        display: block;
        box-shadow: 0 1px 11px rgba(0,0,0,.27);
        border-radius: 5px;
    }

    .error-box{
        width: 100%;
        display: flex;
        justify-content: center;
        text-align: center;
        height: 35px;
    }

    .error-info{
        width: 80%;
        height: 100%;
        background-color: #ffc0cb;
        color: white;
        border-radius: 0px 0px 5px 5px;
    }

    .title{
        margin-top: 10px;
        padding: 20px 20px 15px 20px;
        align-items: center;
        color: #7e7e7e;
        text-align: center;
    }
    .title:before,.title:after{
        height: 1px;
        content: "";
        position: absolute;
        width: 30%;
        top:50%;
    }

    .title:before{
        background: -webkit-linear-gradient(right,rgba(126,126,126,1) 0%,rgba(255,255,255,1) 100%);
        left: 0;
    }

    .title:after{
        background: -webkit-linear-gradient(left,rgba(126,126,126,1) 0%,rgba(255,255,255,1) 100%);
        right: 0;
        clear: both;
    }


    .operate-items{
        width: 100%;
        position: absolute;;
        bottom: -33px;
        left: 6px;
        display: block;
        text-align: center;
    }

    .operate-item{
        overflow: hidden;
        overflow-wrap: break-word;
        display: inline-block;
        width: 15px;
        height: 15px;
        font-size: 13px;
        margin-left: 13px;
        cursor: pointer;
        text-transform: uppercase;
    }

    .operate-item:hover{
        color: #ffffff;
        animation:operate  .3s;
        -moz-animation: operate linear .3s;	/* Firefox */
        -webkit-animation: operate linear .3s;	/* Safari 和 Chrome */
        -o-animation: operate linear .3s;	/* Opera */
        animation-fill-mode: forwards;
        -webkit-animation-fill-mode:forwards;
    }

    @keyframes operate
    {
        from{
        }
        to{
            width: 100px;
            border-radius: 30px;
        }
    }

    @-moz-keyframes operate /* Firefox */
    {
        from{
        }
        to{
            width: 100px;
            border-radius: 30px;
        }
    }

    @-webkit-keyframes operate /* Safari 和 Chrome */
    {
        from{
        }
        to{
            width: 100px;
            border-radius: 30px;
        }
    }

    @-o-keyframes operate /* Opera */
    {
        from{
            width: 60px;
        }
        to{
            width: 100px;
            border-radius: 30px;
        }
    }

    .operate-item:hover .operate-item-text{
        display: inline-block;
    }

    .operate-item .operate-item-text{
        display: none;
    }



</style>