var express = require('express');
var router = express.Router();;

// select from req.bosy.table
router.get('/programma', function(req, res, next) {
  res.render(__dirname+"/views/programma");
})
.get('/gara', function(req, res, next) {
  res.render(__dirname+"/views/gara");
});

module.exports = router;
