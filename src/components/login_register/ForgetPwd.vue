<template>
    <div id="forgetPwd">
        <div class="tips">
            <i class="">正确填写注册使用的邮箱，将有邮箱进行验证并进行修改密码</i>
        </div>
        <div class="input-group"  v-bind:class="{error : errorModel==='email'}">
            <i class="fa fa-envelope input-icon" aria-hidden="true"></i>
            <input type="text" placeholder="Email Address" v-model="data.email"/>
        </div>
        <OperaterBtn v-bind:operation="Operation.FORTGETPWD"  v-on:operateError="operateError" v-bind:data="data"></OperaterBtn>
    </div>
</template>

<script>
    import OperaterBtn from "@/components/login_register/operater/OperaterBtn";
    import Operation from "@/entity/Operation";

    export default {
        name: "ForgetPwd",

        data:function(){
            return {
                Operation: Operation,
                data:{
                    email:"",
                },
                errorModel:null
            }
        },
        components: {OperaterBtn},
        methods: {
            operateError:function (error) {
                this.errorModel = error.bindModel;
                this.$emit("operateError", error)
            }
        }
    }
</script>

<style scoped>
    #forgetPwd{
        width: 100%;
        height: 100%;
    }
    .tips{
        padding: 0px 60px 20px 60px;
        margin-bottom: 10px;
    }

</style>