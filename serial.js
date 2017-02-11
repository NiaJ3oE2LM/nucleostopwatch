//TODO should be BLE 4.0

var SerialPort = require('serialport');
var db = require('./postgres');

var port = new SerialPort('/dev/ttyACM0', {
  parser: SerialPort.parsers.readline('\n'),
  baudRate: 115200
},function (err) {
  if (err) {
    return console.log('Error: ', err.message);
  }
  else console.log("usb connected");
});

port.on('data', function (data) {
  //insert on current race table
  var req= JSON.parse (data);
  db.insertLap(req.race, req.laptime, function(err,query){
    if(err) return console.error(err);
    else return console.log(query);
  });
});
