var express = require('express');
var router = express.Router();

const Team = require('../models').Team;

router.get("/", (req, res, next) => {
    console.log(Team)
    Team.findAll()
    .then(teams => res.status(200).json(teams))
    .catch(error => res.status(402).send(error))  
})

module.exports = router;