var s = require('net').Socket();
s.connect(45678, 'localhost');
s.write('{"hash":"123456789", "temperature":25.5, "name":"test"}');
setInterval(function(){
	s.write('{"key":"cfcd208495d565ef66e7dff9f98764da", "temperature":' + Math.round(Math.random()*100, 1) + ', "name":"test"}');
}, 500);
s.on('data', function(d){
    console.log(d.toString());
});

