var BleUart = require('./ble-uart');
//TODO caricare in db oppure sul soket della pagina web cronometro
// use a predefined UART service (nordic, redbear, laird, bluegiga)
var bleSerial = new BleUart('nordic');
var db = require('./postgres');
var socket = require('../bin/socket');

// this function gets called when new data is received from
// the Bluetooth LE serial service:
bleSerial.on('data', function(rawdata){
  var bledata = JSON.parse (rawdata);
  //IDEA salva il tempo provvisorio sulla tabella current in caso di blackout
  //console.log("timelap", bledata.timelap);
  //TODO ricavare il tavolo dal nome del dispositivo ble che esegue la richiesta
  db.getCurrent("tav1", function(err, res){
     if (err) return console.error(err);
     else{
       var dbdata= res.rows[0];
       console.log(dbdata);
       socket.sendData(dbdata.gara,"tav1", dbdata.team, bledata.timelap);
     }
  });
});

// this function gets called when the program
// establishes a connection with the remote BLE radio:
bleSerial.on('connected', function(data){
  console.log("Connected");
  //TODO inviare nome del team che deve gareggiare
  //bleSerial.write("Hello BLE!");
  //bleSerial.write([1,2,3,4,5]);
  //bleSerial.write(new Uint8Array([5,4,3,2,1]));
  //bleSerial.write(new Buffer([6,7,8,9]))
});

// thus function gets called if the radio successfully starts scanning:
bleSerial.on('scanning', function(status){
  console.log("radio status: " + status);
})
