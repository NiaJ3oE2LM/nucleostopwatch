var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render("cronometro");
});


module.exports = router;
//IDEA il cronometro carica il tempo sul server. ill server non carica direttamene su postgres ma aggiorna in tempo reale l'interfaccia via socket del controllore del tavolo che è connesso al server con un qualche dispositivo es smartphione.il controllore decide se caricare il tempo, se il bluetooth non funziona il controllore può inserire il tempo manualmente.
