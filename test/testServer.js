var CommunicationStrategy = require('../lib/socketioCommunication')
  , wsServer = CommunicationStrategy.createServer({'port':8080});

console.log('ws server listening on port 8080');

wsServer.on('connection', function(ws) {
  ws.on('message', function(message) {
    console.log('received: %s', message);
  });
  ws.send('something');
});


setTimeout(function(){
  wsServer.close()
}, 5000);
