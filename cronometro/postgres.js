var pg = require('pg');

var config = {
  user: 'cronometro', //env var: PGUSER
  database: 'mikwork', //env var: PGDATABASE
  password: 'roboval', //env var: PGPASSWORD
  host: 'localhost', // Server hosting the postgres database
  port: 5432, //env var: PGPORT
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
};

var pool = new pg.Pool(config);

pool.on('error', function (err, client) {
  console.error('idle client error', err.message, err.stack)
});

exports.getCurrent = function(tavolo, callback){
  pool.connect(function(err, client, done) {
    if(err) callback(err, null);

    //determina la gara corrente nel tavolo
    var query ="select gara,team from current where tavolo='"+tavolo+"'";
    client.query(query, function(err, res) {
      //call `done()` to release the client back to the pool
      done();
      if(err) return callback(err, null);
      else return callback(null, res);

    });
  });
}

//inserisce il parziale prima d i inviarlo al socket nella tabella current
exports.inserisciParziale = function(tavolo, parziale, callback){
  pool.connect(function(err, client, done) {
    if(err) callback(err, null);

    //determina la gara corrente nel tavolo
    var query ="update current set parziale = "+parziale+" where tavolo = '"+tavolo+"'";
    client.query(query, function(err, res) {
      //call `done()` to release the client back to the pool
      done();
      if(err) return callback(err, null);
      else return callback(null, res);
    });

    });
}

exports.inserisciRecord = function(gara, team, timelap, callback){
  pool.connect(function(err, client, done) {
    if(err) callback(err, null);

    //determina la gara corrente nel tavolo
    var query ="update "+gara+" set timelap = "+timelap+" where team = '"+team+"'";
    client.query(query, function(err, res) {
      //call `done()` to release the client back to the pool
      done();
      if(err) return callback(err, null);
      else return callback(null, res);
    });

    });
}
