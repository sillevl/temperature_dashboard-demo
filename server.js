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
    	conn.on("error", function(err){
    	console.log("Caught flash policy server socket error: ")
    	console.log(err.stack)
  	});
}).listen(45679);

wserver.send = function(msg) {
    wserver.connections.forEach(function (conn) {
        conn.sendText(msg)
    })
}

var server = net.createServer(function (socket) {
    console.log("connected");

    socket.on("error", function(err){
    	console.log("Caught flash policy server socket error: ")
    	console.log(err.stack)
  	});

    socket.on('data', function (data) {
    	try{
    		var json = JSON.parse(data);
        	socket.write('{"status":200, "message":"OK"}');
        	wserver.send(data);
        } catch(err) {
             debug(err.message);
             socket.write('{"status":500, "message":"Oeps, something was wrong"}');
        }
    });
}).listen(45678);

