var net = require("net");
var ws = require("nodejs-websocket");

var wserver = ws.createServer(function (conn) {
    console.log("New connection")
    conn.on("text", function (str) {
        console.log("Received "+str)
        conn.sendText(str.toUpperCase()+"!!!")
    })
    conn.on("close", function (code, reason) {
        console.log("Connection closed")
    })
}).listen(45679);

wserver.send = function(msg) {
    wserver.connections.forEach(function (conn) {
        conn.sendText(msg)
    })
}

var server = net.createServer(function (socket) {
    console.log("connected");

    socket.on('data', function (data) {
    	var json = JSON.parse(data);
        console.log(json.toString());
        socket.write('{"status":200, "message":"OK"}');

        wserver.send(data);
    });
}).listen(45678);

setInterval(function(){
	wserver.send('{"key":"9bf31c7ff062936a96d3c8bd1f8f2ff3", "temperature":' + Math.round(Math.random()*100, 1) + ', "name":"Demo"}');
}, 1000);


