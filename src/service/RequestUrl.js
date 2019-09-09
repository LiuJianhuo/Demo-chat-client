
const base = "http://localhost:3000";
var RequestUrl = {
    base: base,
    REGISTER: base + "/user/register",
    FORTGETPWD: base + "/user/forgetpwd",
    LOGIN: base + "/user/login",
    CONTACTS: base + "/user/contacts",
    RECOMMENT_DFRIENDS: base + "/user/friends/accomment",
    FRIEND_NOTIFITATION: base + "/user/friends/notifitation",
    AGREEN_USER: base + "/user/friend/agree",
    REJECT_USER: base + "/user/friend/reject",
    ADDUSER: base + "/user/friend/add"


}

export default RequestUrl