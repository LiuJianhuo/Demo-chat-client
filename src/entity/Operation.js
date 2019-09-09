var Operation = {

    get LOGIN() { return "login"; },
    get FORTGETPWD() { return "forgetpwd"; },
    get REGISTER() {return "register"; },
    Contact:{
        get ADD(){return "add"}, //添加
        get LOOK(){return "look"}, //查看好友
        get CARE(){return "care"}, //特别关心
        get GROUP(){return "group"}, //我的群组
        get FRIENDS(){ return "friends"}, //我的好友
        get NEW_FRIENDS(){ return "new_friends"},//新的好友
        get REJECT_USER(){ return "reject_user"},//拒绝好友
        get AGREE_USER() { return "agree_user"} //同意好友

    }
}

export default Operation;