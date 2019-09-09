import Msg from "@/service/Msg";


var builderMsg = function (options) {
    options = Object.assign({
        type: Msg.Type.TEXT,
        roomId: "",
        content: "",
        sender:"",
        timestamp: new Date().getTime()
    }, options || {});
    return options;
}

export default {
    builderMsg
}