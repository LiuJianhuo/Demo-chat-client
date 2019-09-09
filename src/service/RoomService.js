
var fecthRoomMembers = function (roomId) {
    var members = [];
    if(roomId){
        members=[{
            userId:"u001",headPortrait:"aa"
        },{
            userId:"u002",headPortrait: "bb"
        }]
    }
    return members;
}

export default {
    fecthRoomMembers
}