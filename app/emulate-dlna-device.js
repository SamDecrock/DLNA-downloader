var ssdp = require("peer-ssdp");
var peer = ssdp.createPeer();
var interval;
/**
 * handle peer ready event. This event will be emitted after `peer.start()` is called.
 */
peer.on("ready",function(){
    // handle ready event 
    // send ssdp:alive messages every 1s 
    // interval = setInterval(function(){
    //     peer.alive({
    //         ST: "upnp:rootdevice",
    //         SERVER: "...",
    //         ST: headers.ST,
    //         USN: "..."
    //     });
    // }, 1000);
    // // shutdown peer after 10 s and send a ssdp:byebye message before 
    // setTimeout(function(){
    //     clearInterval(interval);
    //     // Close peer. Afer peer is closed the `close` event will be emitted. 
    //     peer.close();
    // }, 10000);
});
 
// handle SSDP NOTIFY messages.  
// param headers is JSON object containing the headers of the SSDP NOTIFY message as key-value-pair.  
// param address is the socket address of the sender 
peer.on("notify",function (headers, address){
    // handle notify event 
});
 
// handle SSDP M-SEARCH messages.  
// param headers is JSON object containing the headers of the SSDP M-SEARCH message as key-value-pair.  
// param address is the socket address of the sender 
peer.on("search",function (headers, address){

    console.log(headers, address);


    //handle search request 
    // reply to search request  
    peer.reply({
        ST: "urn:schemas-upnp-org:device:MediaServer:1",
        SERVER: "traalal",
        ST: headers.ST,
        USN: "uuid:000"
    },address);
});
 
// handle SSDP HTTP 200 OK messages.  
// param headers is JSON object containing the headers of the SSDP HTTP 200 OK  message as key-value-pair.  
// param address is the socket address of the sender 
peer.on("found",function (headers, address){
    // handle found event 
});
 
// handle peer close event. This event will be emitted after `peer.close()` is called. 
peer.on("close",function(){
    // handle close event 
});
 
// Start peer. Afer peer is ready the `ready` event will be emitted. 
peer.start();