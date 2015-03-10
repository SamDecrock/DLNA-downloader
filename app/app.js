var ssdp = require('node-ssdp-lite');
var client = new ssdp();
var httpreq = require('httpreq');
var parser = require('xml2json');

	
client.on('notify', function () {
	console.log('Got a notification.');
});

client.on('response', function inResponse(msg, rinfo) {
	// console.log('Got a response to an m-search.', msg, rinfo);

	// console.log(msg);

	var device = {};

	var msgLines = msg.split('\n');
	for(var i in msgLines){
		var match = msgLines[i].match(/(.+?):(.+)/);
		if(match && match.length > 1){
			var key = match[1];
			var value = match[2];


			device[key] = value;
		}
	}

	onDeviceFound(device);
});

// client.search('urn:schemas-upnp-org:service:ContentDirectory:1');
client.search('ssdp:all');



function onDeviceFound(device){
	if( device['USN'] && device['USN'].match(/ContentDirectory/) ){
		console.log('> found ContentDirectory, checking out device...');
		browseDevice(device);
	}
}

function browseDevice(device){
	var url = device['Location'];

	httpreq.get(url, function (err, res) {
		if(err) return console.log(err);

		var deviceData = parser.toJson(res.body);
		console.log(deviceData);
		deviceData = JSON.parse(deviceData);


		var myDevice = {
			friendlyName: deviceData.root.device.friendlyName,
			services: deviceData.root.device.serviceList.service
		}


		console.log('> Found device', myDevice.friendlyName, 'with services:', myDevice.services);

		browseServices(myDevice, deviceData);
	});
}

function browseServices(device, rawdevicedata){
	for(var i in device.services){
		if( device.services[i].serviceType.match(/ContentDirectory/) ){
			browseContentDirectoryService(device.services[i], device, rawdevicedata);
		}
	}
}

function browseContentDirectoryService (service, device, rawdevicedata) {
	httpreq.get(service.controlURL, function (err, res) {
		if(err) return console.log(err);

		console.log(res.body);
	});
}




