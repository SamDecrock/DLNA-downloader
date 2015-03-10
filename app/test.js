var ssdp = require('node-ssdp-lite')
      , client = new ssdp();
    
    client.on('notify', function () {
      console.log('Got a notification.');
    });
    
    client.on('response', function inResponse(msg, rinfo) {
      console.log('Got a response to an m-search.', msg, rinfo);
    });
    
    // client.search('urn:schemas-upnp-org:service:ContentDirectory:1');
    
    // Or maybe if you want to scour for everything 
    
    client.search('ssdp:all');
    
    // This should get you at least started. 