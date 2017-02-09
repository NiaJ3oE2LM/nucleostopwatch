var express = require('express');
var router = express.Router();
var pool = require('../postgres.js')

// select from req.bosy.table
router.get('/', function(req, res, next) {
  pool.connect(function(err, client, done) {
    if(err) {
      return console.error('error fetching client from pool', err);
    }
    var query='SELECT * FROM '+req.body.table;
    client.query(query, function(err, result) {
      //call `done()` to release the client back to the pool
      done();

      if(err) {
        return console.error('error running query', err);
      }
      console.log(result.rows);
      //output: 1
    });
  });
  pool.on('error', function (err, client) {
    // if an error is encountered by a client while it sits idle in the pool
    // the pool itself will emit an error event with both the error and
    // the client which emitted the original error
    // this is a rare occurrence but can happen if there is a network partition
    // between your application and the database, the database restarts, etc.
    // and so you might want to handle it and at least log it out
    console.error('idle client error', err.message, err.stack)
  });
  res.end();
});

//TODO insert new row into table
router.post('/', function(req, res, next) {
  pool.connect(function(err, client, done) {
    if(err) {
      return console.error('error fetching client from pool', err);
    }
    //var query= 'insert into'+req.body.table+'values'+req.body.values;
    var query='SELECT * FROM '+req.body.table;
    client.query(query, function(err, result) {
      //call `done()` to release the client back to the pool
      done();

      if(err) {
        return console.error('error running query', err);
      }
      console.log(result);
      res.end(JSON.stringify(result.rows));
    });
  });
  pool.on('error', function (err, client) {
    console.error('idle client error', err.message, err.stack)
  });
  //res.end();
});

//TODO update values into row
router.put('/', function(req, res, next) {
  pool.connect(function(err, client, done) {
    if(err) {
      return console.error('error fetching client from pool', err);
    }
    var query= 'update';
    client.query(query, function(err, result) {
      //call `done()` to release the client back to the pool
      done();

      if(err) {
        return console.error('error running query', err);
      }
      console.log(result);
    });
  });
  pool.on('error', function (err, client) {
    console.error('idle client error', err.message, err.stack)
  });
  res.end();
});

module.exports = router;
