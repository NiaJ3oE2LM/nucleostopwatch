var pg = require('pg');

var config = {
  user: 'test', //env var: PGUSER
  database: 'mikwork', //env var: PGDATABASE
  password: 'ciao', //env var: PGPASSWORD
  host: 'localhost', // Server hosting the postgres database
  port: 5432, //env var: PGPORT
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
};

var pool = new pg.Pool(config);

exports.insertLap = function(race, laptime, callback){
  pool.connect(function(err, client, done) {
    if(err) callback(err, null);

    //determina lo statp della gara
    var query ="select team from current where race='"+race+"'";
    client.query(query, function(err, res) {
      //call `done()` to release the client back to the pool
      done();
      if(err) return callback(err, null);

      //inserisci laptime nella tabella gara corrispondente
      else{
        query='INSERT INTO '+race+'(team, laptime) VALUES (\''+res.rows[0].team+'\','+laptime+')';
        client.query(query, function(err, result) {
          //call `done()` to release the client back to the pool
          done();
          if(err) return callback(err, null);
          else return callback(null, query);
        });
      }

    });
  });
  pool.on('error', function (err, client) {
    console.error('idle client error', err.message, err.stack)
  });
}

//module.exports = pool;
