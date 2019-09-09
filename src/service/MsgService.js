


var fetchMsgItems = function (userId) {
    var msgItems = [{
        room:{
            roomId: "r001",
            roomName:"张浩楠",
            roomType:"single",
            roomPic:"aa",
            receviUserId:"u001",
        },
        lastRecord:{
            recordId:"0001",
            content:"则额",
            dateTime:"2018-12-01 04:23",
            timestamp:"1554548488",
        }
    },{
        room:{
            roomId: "r002",
            roomName:"张正月",
            roomType:"single",
            roomPic:"bb",
            receviUserId:"u002",
        },
        lastRecord:{
            recordId:"0001",
            content:"你个大明宫ffeifejfiejfeifj飞机覅i凤飞飞就i二级覅就分",
            dateTime:"2018-12-01 04:23",
            timestamp:"1554548488",
        }
    }]
    return msgItems;
}

/*
    获取某个房间消息记录
    数据结构{roomId:"r001",roomType:"single",
            members:[{userId:"u001",""},{userid:"u002"}],
            records:[{dateTime:"2018-12-01 04:22",timestamp:125555565,sender:"",content:"",isRead:true,isSuccess:true,contentType:"text"},...]
        }
 */
var fetchMsgRecords = function (roomId) {
    var msgReocrds = {
        roomId: "r001",
        records:[{
            recordId:"0001",
            sender:"u001",
            content:"你好你叫啥",
            isRead: true,
            isSuccess:true,
            contentType:"text",
            dateTime:"2018-12-01 04:22",
            timestamp:1255555555
        },{
            recordId:"0002",
            sender:"u002",
            content:"我叫少爷",
            isRead: true,
            isSuccess:true,
            contentType:"text",
            dateTime:"2018-12-01 04:23",
            timestamp:1255555666
        }]}
    if(roomId == "r002"){
        msgReocrds = {
            roomId: "r002",
            records:[{
                recordId:"0001",
                sender:"u001",
                content:"撒掉0002",
                isRead: true,
                isSuccess:true,
                contentType:"text",
                dateTime:"2018-12-01 04:22",
                timestamp:1255555555
            },{
                recordId:"0002",
                sender:"u002",
                content:"撒谎腹黑002",
                isRead: true,
                isSuccess:true,
                contentType:"text",
                dateTime:"2018-12-01 04:23",
                timestamp:1255555666
            }]}
    }

    return msgReocrds;
}

export default {
    fetchMsgRecords,
    fetchMsgItems
}