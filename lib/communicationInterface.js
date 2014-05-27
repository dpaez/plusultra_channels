'use strict';
/*
* Communication Module Interface
*
*/

module.exports = exports = CommunicationInterface;

function CommunicationInterface(){
  // To be implemented.
  throw 'interface module';
}

CommunicationInterface.prototype.createServer = function( options ){
  // To be implemented.
  // Required.
  // Description: Should return a new websockets server.
};

CommunicationInterface.prototype.close = function(){
  // To be implemented.
  // Optional.
  // Descriptions: Should terminates all active sockets.
};

