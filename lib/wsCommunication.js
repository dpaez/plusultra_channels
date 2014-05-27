'use strict';
var CommunicationInterface = require('./communicationInterface')
  , util = require('util')
  , WSServer = require('ws').Server;

/*
* Module exports
*/


/*
* Module Instance
*/

var wss;

/*
* ws communication constructor
*/

// DEPRECATED possibly
function WSSCommunication( server, options ){
  // creates ws server
  if ( !(this instanceof WSSCommunication) ){
    return new WSSCommunication(server, options);
  }

  return (this.createServer(server, options));
}

/*
* Inherits from CommunicationInterface. Must implement its methods.
*/

util.inherits(WSSCommunication, CommunicationInterface);

exports.createServer = function(server, options){

  // creates ws server

  if ('undefined' == typeof wss){
    wss = new WSServer(server);
  }
  return wss;
};

// TODO: missing createClient function.

exports.close = function(){
  wss.close();
};