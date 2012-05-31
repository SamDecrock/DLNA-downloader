var upnp 		= require("./upnp");
var inspect 	= require('util').inspect


var devices = [];

// First, create a client instance
var controlPoint = new upnp.ControlPoint();



function log(event) {
	return function(device) {


		if(!devices[JSON.stringify(device)]){
			devices[JSON.stringify(device)] = device;

			console.log('UPNP Event: \033[33m%s\033[39m', event);
			console.log(inspect(device, true, 10, true));
			console.log();
		}
		
	}
}


controlPoint.on('DeviceAvailable', log('DeviceAvailable'))
controlPoint.on('DeviceUpdated', log('DeviceUpdated'))
controlPoint.on('DeviceUnavailable', log('DeviceUnavailable'))
controlPoint.on('DeviceFound', log('DeviceFound'))
controlPoint.search()

