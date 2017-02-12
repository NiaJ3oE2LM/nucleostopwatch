var pg = require('pg');

var config = {
  user: 'tabellone', //env var: PGUSER
  database: 'mikwork', //env var: PGDATABASE
  password: 'roboval', //env var: PGPASSWORD
  host: 'localhost', // Server hosting the postgres database
  port: 5432, //env var: PGPORT
  max: 5, // max number of clients in the pool
  idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
};

var pool = new pg.Pool(config);

pool.on('error', function (err, client) {
  console.error('idle client error', err.message, err.stack)
});

exports.select = function(table,callback){
  pool.connect(function(err, client, done) {
    if(err) callback(err, null);

    client.query("select * from "+table , function(err, result) {
      //call `done()` to release the client back to the pool
      done();
      if(err) return callback(err, null);
      else return callback(null, res.rows[]);
    });
  });
}
