var dbcro = require('../cronometro/postgres');
var dbdir = require('../direttore/postgres');
var dbtab = require('../tabellone/postgres');
var dbcol = require('../collaboratore/postgres');

var server = require('./server');
var io = require('socket.io')(server);

//TODO namespaces per gestire i socket
io.on('connection', function(socket){
  console.log("cronometro connesso");

  socket.on('inserisci record', function(data){
    dbcro.inserisciRecord(data.gara, data.team, data.timelap, function(err, check){
      if(err) return console.error(err);
      else return console.log("DAtabase aggiornato :", check);
    });
  });
});

exports.sendData = function(gara, tavolo, team, timelap){
  var data ={
    tavolo: tavolo,
    team: team,
    timelap: timelap,
    gara: gara
  }
  io.sockets.emit('parziale', data);
}
