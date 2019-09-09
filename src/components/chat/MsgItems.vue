<template>
   <div class="msg-items">

<!--      <MsgItem v-for="msgItem in msgItems" v-bind:msgItem = "msgItem" v-on:activeRoom="activeRoom"></MsgItem>-->
<!--      联系人操作项-->
      <ContactOper v-bind:activedOper="activedContactOper"></ContactOper>
   </div>
</template>

<script>
    import MsgItem from "@/components/chat/msgitem/MsgItem";
    import ContactOper from "@/components/chat/contact/ContactOper";
    import Operation from "@/entity/Operation";

    export default {
       name: "MsgItems",
       components: {ContactOper,},
       props:["msgItems", "activedMenuBtn"],
       data: function(){
          return {
             activedContactOper: {
                id: null
             },

          }
       },
       watch: {
          'activedContactOper.id': "changeContactMain"
       },
       methods:{
          activeRoom:function (roomId) {
             this.$emit("activeRoom", roomId);
          },

          fetchContacts: function () {

          },
          changeContactMain(){
             this.$emit("changeContactMain", this.activedContactOper);
          }
       }
    }
</script>

<style scoped>
   .msg-items{
      width: 100%;
      height: 100%;
      background-color: white;
      border-right: 1px solid #dedede;
      box-sizing:border-box;
      -moz-box-sizing:border-box; /* Firefox */
      -webkit-box-sizing:border-box; /* Safari */
   }
</style>