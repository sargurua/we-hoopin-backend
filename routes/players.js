var express = require('express');
var router = express.Router();
const Player = require('../models').Player;

router.get('/', function(req, res, next) {
    Player.findAll()
    .then(players => res.status(200).json(players))
    .catch(error => res.status(402).send(error))  
});

module.exports = router;