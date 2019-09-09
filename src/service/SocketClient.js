
var SocketClient = function(url) {
    this.socket = null;
    this.onopen = undefined;
    this.onerror = undefined;
    this.onmessage = undefined;
    this.onclose = undefined;

    this._setSocket = function () {
        var socket = this.socket;
        if(socket && socket.readyState === socket.OPEN){
            console.log("已经是连接状态")
            return;
        }
        socket = new WebSocket(url);
        socket.onopen = this.onopen;
        socket.onerror = this.onerror;
        socket.onmessage = this.onmessage;
        socket.onclose = this.onclose;
        this.socket = socket;
    }

    this.connect = function () {
        var socket = this.socket;
        if(socket && socket.readyState === socket.OPEN){
            console.log("已经是连接状态")
            return;
        }
        this._setSocket();
    }

    this.reconnect = function () {
        var socket = this.socket;
        if(socket && socket.readyState === socket.OPEN){
            console.log("已经是连接状态")
            return;
        }
        this._setSocket();
    };


}

export default SocketClient;