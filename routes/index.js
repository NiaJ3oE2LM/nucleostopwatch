var express = require('express');
var router = express.Router();
var pool = require('../serial')

// select from req.bosy.table
router.get('/', function(req, res, next) {
  res.render('index');
});

module.exports = router;
