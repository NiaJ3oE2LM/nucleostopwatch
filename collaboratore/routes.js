var express = require('express');
var router = express.Router();

// select from req.bosy.table
router.get('/gara', function(req, res, next) {
  res.render(__dirname+"/views/gara");
})
.get('/registrazione', function(req, res, next) {
  res.render(__dirname+"/views/registrazione");
});

module.exports = router;
