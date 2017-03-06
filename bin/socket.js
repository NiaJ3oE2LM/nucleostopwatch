var db={
 cro: require('../cronometro/postgres'),
 dir: require('../direttore/postgres'),
 tab: require('../tabellone/postgres'),
 reg: require('../registrazione/postgres')
}

var server = require('./server');
var io = require('socket.io')(server);

var cronometro = io.of('/cronometro');
var direttore = io.of('/direttore');
var tabellone = io.of('/tabellone');
var registrazione = io.of('/registrazione');

cronometro.on('connection', function(socket){
  console.log("cronometro connesso");

  socket.on('inserisci record', function(data){
    db.cro.inserisciRecord(data.gara, data.team, data.timelap, function(err, check){
      if(err) return console.error(err);
      else {
        //log direttore
        direttore.sockets.emit('risultato', data);

        //aggiorna la classifica
        var data ={
          tavolo: tavolo,
          team: team,
          timelap: timelap,
          gara: gara
        }
        tabellone.sockets.emit('risultato', data);
      }
    });
  });
});

tabellone.on('connection', function(socket){
  console.log("tabellone connesso");

  //gestisci chimata iniziale per scaricare la classifica
});

direttore.on('connection', function(socket){
  console.log("direttore connesso");

});

registrazione.on('connection', function(socket){
  console.log("registrazione connesso");

});

exports.sendData = function(gara, tavolo, team, timelap){
  var data ={
    tavolo: tavolo,
    team: team,
    timelap: timelap,
    gara: gara
  }
  cronometro.sockets.emit('parziale', data);
}
