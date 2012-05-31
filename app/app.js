var dgram	= require("dgram");
var http	= require("http");


var httpParser = http.parsers.alloc();
httpParser.reinitialize('request');
httpParser.incoming = null;
httpParser.socket = { };


httpParser.onIncoming = function(req) {
	console.log(req);
};

var udp = dgram.createSocket('udp4');
udp.on('message', function(msg, rinfo) {
	//console.log(msg.toString('utf-8'));
	httpParser.execute(msg, 0, msg.length);
});
udp.bind(1900);
udp.addMembership('239.255.255.250');


/*

var querystring = require('querystring');  
var http = require('http');  


var post_data = querystring.stringify({  
  'your' : 'post',  
  'data': 'goes here!'  
});  
  
var post_options = {  
	ost: '10.100.1.118:9080',
	port: 80,
	path: '/renderer/avTransport/control',
	method: 'POST',
	headers: {
		'Content-Length': post_data.length,
		'Content-Type': 'text/xml; charset="utf-8"',

	}
};  
  
var post_req = http.request(post_options, function(res) {  
	res.setEncoding('utf8');  
	res.on('data', function (chunk) {  
		console.log('Response: ' + chunk);  
	});  
});  
  
// write parameters to post body  
post_req.write(post_data);  
post_req.end();  

*/