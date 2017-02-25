var app = require('./app');
var debug = require('debug')('psql-basic:server');
var http = require('http');
var db = require('./postgres');


/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '3003');
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);
var io = require('socket.io')(server);

io.on('connection', function(socket){
  console.log("cronometro connesso");

  socket.on('inserisci record', function(data){
    db.inserisciRecord(data.gara, data.team, data.timelap, function(err, check){
      if(err) return console.error(err);
      else return console.log("DAtabase aggiornato :", check);
    });
  });
});


/**
 * Listen on provided port, on all network interfaces.
 */

 var hostname= '192.168.0.110'; //ip dell'host

server.listen(port, hostname);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}

exports.sendData = function(gara, tavolo, team, timelap){
  var data ={
    tavolo: tavolo,
    team: team,
    timelap: timelap,
    gara: gara
  }
  io.sockets.emit('parziale', data);
}
;
