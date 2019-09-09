<template>

    <a class="operate-btn circle" v-on:click="sendReq">
        <i class="fa fa-arrow-right operate-icon" aria-hidden="true"></i>
    </a>
</template>

<script>
    import RequestUrl from "@/service/RequestUrl";
    import Operation from "@/entity/Operation";
    import axios from "axios";

    export default {
        name: "OperaterBtn",
        props:["operation", "data"],
        methods: {
            //发送请求
            sendReq: function () {

                var $this = this;

                const operation = this.operation
                var data = this.data;
                var reqUrl = null;
                var error = {
                    error: false,
                    reason: null,
                    bindModel: null
                };
                alert(operation)
                if(operation === Operation.LOGIN){
                    reqUrl = RequestUrl.LOGIN;
                    if(!data.userName){
                        error.error=true;
                        error.reason = "用户名不能为空！";
                        error.bindModel = "userName";
                    }else if(!data.password){
                        error.error=true;
                        error.reason = "密码不能为空！"
                        error.bindModel = "password";
                    }
                }else if(operation === Operation.FORTGETPWD){
                    reqUrl = RequestUrl.FORTGETPWD;
                    if(!data.email){
                        error.error=true;
                        error.reason = "邮箱不能为空！";
                        error.bindModel = "email";
                    }
                }else if(operation === Operation.REGISTER){
                    reqUrl = RequestUrl.REGISTER;
                    if(!data.userName){
                        error.error=true;
                        error.reason = "用户名不能为空！";
                        error.bindModel = "userName";
                    }else if(!data.email){
                        error.error=true;
                        error.reason = "邮箱不能为空！";
                        error.bindModel = "email";
                    }else if(!data.password){
                        error.error=true;
                        error.reason = "密码不能为空！"
                        error.bindModel = "password";
                    }else if(!data.againPassword){
                        error.error=true;
                        error.reason = "确认密码不能为空！"
                        error.bindModel = "againPassword";
                    } else if(data.password !== data.againPassword){
                        error.error=true;
                        error.reason = "密码和确认密码不一致"
                        error.bindModel = "againPassword";
                    }

                }

                if(error.error){
                    $this.emitError(error);
                    return;
                }
                //发起请求
                if(reqUrl){
                    axios.post(reqUrl,data)
                        .then(function (result) {
                            var data = result.data;
                            if(data.isSuccess){
                                if(operation === Operation.LOGIN){
                                    $this.$router.push("chat");
                                }else if(operation === Operation.REGISTER){
                                    $this.$router.push("chat");
                                }else if(operation === Operation.FORTGETPWD){
                                    $this.emitError("密码修改成功");
                                    $this.$router.push("login");
                                }
                            }else{
                                error.reason = data.reason;
                                $this.emitError(error);
                            }
                        })
                        .catch(function (err) {
                            error.error = true;
                            error.reason = err.toString();
                            $this.emitError(error);
                        });
                }

            },
            emitError: function (error) {
                this.$emit("operateError", error);
            }
        },

    }
</script>

<style scoped>
    .operate-btn{
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

    .operate-btn:hover{
        box-shadow: 2px 1px 13px #312525;
    }

    .operate-btn:active{
        background-color: black;
    }

    .operate-icon{
        font-size: 20px;
        color: #ffffff;
    }
</style>