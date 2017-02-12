var express = require('express');
var router = express.Router();
var direttore = require('../direttore/postgres');

// select from req.bosy.table
router.get('/', function(req, res, next) {
  direttore.startRace('speed1_1','tav1',function(err,res){
    if(err) return console.error(err);
    else return console.log(res);
  });
  res.end();
});

module.exports = router;
