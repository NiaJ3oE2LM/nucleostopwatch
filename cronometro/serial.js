//TODO should be BLE 4.0

var SerialPort = require('serialport');

var port = new SerialPort('/dev/ttyACM0', {
  parser: SerialPort.parsers.readline('\n'),
  baudRate: 9600
},function (err) {
  if (err) {
    return console.log('Error: ', err.message);
  }
  else console.log("usb connected");
});

port.on('data', function (data) {
  return console.log("USB:",data);
});
