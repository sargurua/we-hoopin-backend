var express = require('express');
var router = express.Router();

const PlayerBandwagon = require('../models').PlayerBandwagon;
const User = require('../models').User;

router.get('/', function(req, res, next) {
    PlayerBandwagon.findAll()
    .then(players => res.status(200).json(players))
    .catch(error => res.status(402).send(error))  
});

router.post('/', function(req, res, next) {
    try {
        let user = {}
        const d = new Date()
        console.log(d.toDateString())
        PlayerBandwagon.create({
            player_ref_id: req.body.player.ref_id,
            user_id: req.body.user.id,
            start_date: d.toDateString(),
            end_date: ""
        })
        .then(res => {
            return User.findOne({
                where: {
                    id: req.body.user.id
                }
            })
        })
        .then(newUser => {
            user = newUser
            return PlayerBandwagon.findAll({
                where: {
                    user_id: user.id,
                    end_date: ""
                }
            })
        })
        .then(bandwagons => {
            user.dataValues.playerBandwagons = bandwagons
            res.status(200).json(user)
        })
    } catch (err) {
        console.log(err)
    }
});

router.post('/unlike', function(req, res, next) {
    try {
        let user = {}

        PlayerBandwagon.destroy({
            where: {
                user_id: req.body.user.id,
                player_ref_id: req.body.player.ref_id
            }
        })
        .then(res => {
            return User.findOne({
                where: {
                    id: req.body.user.id
                }
            })
        })
        .then(newUser => {
            user = newUser
            return PlayerBandwagon.findAll({
                where: {
                    user_id: user.id
                }
            })
        })
        .then(bandwagons => {
            user.dataValues.playerBandwagons = bandwagons
            res.status(200).json(user)
        })
    } catch (err) {
        console.log(err)
    }
});

module.exports = router;