/**
 * A demonstration of translating text to semantic representation using a translation server.
 *
 * @author Erel Segal-haLevi
 * @since 2013-06
 */

var HOST=process.env.TRANSLATION_SERVER_HOST || "http://irsrv2.cs.biu.ac.il";
var SETTINGS = {
	port: process.env.TRANSLATION_SERVER_PORT || 9995, 
	'force new connection': true, 
	'sync disconnect on unload': true
};

var fs=require('fs'), path=require('path');

translationSocket = require('socket.io-client').connect(HOST, SETTINGS); 

translationSocket.on('connect', function () { 
	console.log(new Date()+": connected to translation server at "+HOST+":"+SETTINGS.port);
});

translationSocket.emit('translate', {
	text: "I agree to offer a wage of 20000 NIS and 10% pension without a car",
	forward: true
});

translationSocket.on('translation', function (result) {
	console.log(new Date()+": received translation from server: ");
	console.dir(result);
});
