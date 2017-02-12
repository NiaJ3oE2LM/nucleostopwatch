var pg = require('pg');

var config = {
  user: 'registrazione', //env var: PGUSER
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

exports.iscrizioneGara = function(team, race, bin, callback){
  pool.connect(function(err, client, done) {
    if(err) callback(err, null);

    //
    var query ="insert into "+race+" (team, bin) values ('"+team+"','"+bin+"')";
    client.query(query, function(err, res) {
      //call `done()` to release the client back to the pool
      done();
      if(err) return callback(err, null);
      else return console.log(res);

    });
  });
}

exports.nuovoTeam = function(name, membri, scuola, callback){
  pool.connect(function(err, client, done) {
    if(err) callback(err, null);

    //
    var query ="insert into teams (name, membri, scuola) values ('"+name+"','"+membri+"','"+scuola+"')";
    client.query(query, function(err, res) {
      //call `done()` to release the client back to the pool
      done();
      if(err) return callback(err, null);
      else return console.log(res);
    });
  });
}

exports.getSchools = function(callback){
  pool.connect(function(err, client, done) {
    if(err) callback(err, null);

    //
    var query ="select nome from scuole";
    client.query(query, function(err, res) {
      //call `done()` to release the client back to the pool
      done();
      if(err) return callback(err, null);
      else return callback(null,res.rows[]);
    });
  });
}

exports.getTeams = function(callback){
  pool.connect(function(err, client, done) {
    if(err) callback(err, null);

    //
    var query ="select name from teams";
    client.query(query, function(err, res) {
      //call `done()` to release the client back to the pool
      done();
      if(err) return callback(err, null);
      else return callback(null,res.rows[]);
    });
  });
}

exports.getBinAddr = function(race, team, callback){
  pool.connect(function(err, client, done) {
    if(err) callback(err, null);

    //TODO pescare il file .ino dalla cartella e inviarlo come res.sendFile() in risposta
    var query ="select bin from "+race+" where team = '"+team+"'";
    client.query(query, function(err, res) {
      //call `done()` to release the client back to the pool
      done();
      if(err) return callback(err, null);
      else if (res.rowCount==0) return console.log("team non iscritto");
      else return callback(null,res.rows[0]);
    });
  });
}

//TODO edit team bin ??
