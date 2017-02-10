 //TODO bypass ttn connection while developing --> restore lorawan asap

var SerialPort = require('serialport');
var db = require('./mysql');


var port = new SerialPort('/dev/ttyACM0', {
  parser: SerialPort.parsers.readline('\n'),
  baudRate: 115200
},function (err) {
  if (err) {
    return console.log('Error: ', err.message);
  }
  else console.log("usb ok");
});

port.on('data', function (data) {
  //create new line on register table with bikeId as paramete
  var req= JSON.parse (data);
  //console.log(req);
  if(req.mode=="id"){
    console.log(req.value);
    db.setPin(1, req.value, function(err, res){
      if(err)console.log(err);
      //else console.log(res);
    });
  }
  else if(req.mode=="wait"){
    db.getUser(1, function(err, res){
      if(err)console.log(err);
      else if(res[0].userId!=null){
        port.write('1');
        console.log("user ok");
      }
    });
  }
});
