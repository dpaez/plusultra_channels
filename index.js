/**
 * TODO: rebuild this. I mean, maybe with some DI and an interface it would 
 * be possible to create an instance in a "cleaner" way.
 */

/*
  require'd
 */

var wsCommunication = require( "./lib/wsCommunication" )
  , sioCommunication = require( "./lib/socketioCommunication" );

/*
* exports
*/

exports.strategies = [
  'socket.io',
  'ws'
];

var _strategies = {
  'socket.io' : sioCommunication,
  'ws' : wsCommunication
};

exports.getStrategy = function( strategyName ){
  if ('string' !== typeof strategyName){
    throw "ERROR: strategyName should be a valid string.";
  }

  if ( 'undefined' !== typeof _strategies[ strategyName ] ){
    return _strategies[ strategyName ];
  }

  return undefined;
};