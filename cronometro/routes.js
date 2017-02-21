var express = require('express');
var router = express.Router();;

// select from req.bosy.table
router.get('/', function(req, res, next) {
  res.render("cronometro");
});

module.exports = router;
