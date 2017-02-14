var express = require('express');
var router = express.Router();;

// select from req.bosy.table
router.get('/gara', function(req, res, next) {
  res.render("gara");
})
.get('/registrazione', function(req, res, next) {
  res.render("registrazione");
});

module.exports = router;
