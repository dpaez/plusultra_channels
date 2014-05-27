/**
 * Module dependencies
 */

var util = require('util')
  , url = require('url')
  , Server = require('socket.io')
  , ioClient = require('socket.io-client')
  , CommunicationInterface = require('./communicationInterface');
 

/*
* Module exports
*/


/*
* Module Instance
*/

var eio = null;

/*
* socketio communication constructor
*/

// DEPRECATED possibly
function SocketIOCommunication( server, options ){

  if( 'object' == typeof server && server.port ){
    server = server.port;
  }

  if ( !(this instanceof SocketIOCommunication) ){
    return new SocketIOCommunication(server, options);
  }

  return ( this.createServer(server, options) );
}

/*
* Inherits from CommunicationInterface. Must implement its methods.
*/

util.inherits( SocketIOCommunication, CommunicationInterface );


exports.createServer = function( options ){
  var port;

  options = options || {};

  this.port = options.server || 26060;

  if ( eio === null ){
    // for socketio 1.0:
    eio = new Server( this.port, {serveClient: false} );
    // meanwhile...
    //eio = Server.listen( port, {'destroy upgrade': false} );
  }

  return eio;
};

exports.use = function ( middleware ){
  // only socket.io 1.0+
  if ( 'function' != typeof middleware ){
    throw 'middleware must be a function.';
  }

  Server.use( middleware );
};

exports.createClient = function( port, host ){
  if ( 'undefined' == typeof port ) {
    // default port, 6060
    port = 6060;
  }

  if ( 'undefined' == typeof host ) {
    // default host, localhost
    host = 'http://localhost';
  }

  return ioClient.connect( host + ':' + port );

};

exports.configure = function( key, configFn ){
  eio.configure(function(){
    eio.set( key, configFn );
  });
};

exports.setAdapter = function( adaptee ){
  if ( 'undefined' === typeof adaptee ){
    return;
  }
  eio.adapter( adaptee );
}

exports.close = function(){
  eio.server.close();
};