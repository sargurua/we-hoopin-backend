const express = require('express');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const router = express.Router();

require('../config/passport')(passport);

const User = require('../models').User;
const PlayerBandwagon = require('../models').PlayerBandwagon;

router.get('/', function(req, res, next) {
    res.send('this is the api');
});

router.post('/signup', function(req, res) {
    console.log(req.body);
    if (!req.body.username || !req.body.password) {
      res.status(400).send({msg: req.body})
    } else {
      User
        .create({
          username: req.body.username,
          password: req.body.password
        })
        .then((user) => {
            user.comparePassword(req.body.password, (err, isMatch) => {
                if(isMatch && !err) {
                  var token = jwt.sign(JSON.parse(JSON.stringify(user)), 'nodeauthsecret', {expiresIn: 86400 * 30});
                  jwt.verify(token, 'nodeauthsecret', function(err, data){
                    console.log(err, data);
                  })
                  res.json({success: true, token: 'JWT ' + token});
                } else {
                  res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.'});
                }
              })
        })
        .catch((error) => {
          console.log(error);
          res.status(400).send(error);
        });
    }
  });

  router.post('/signin', function(req, res) {
    User
        .findOne({
          where: {
            username: req.body.username
          }
        })
        .then((user) => {
          if (!user) {
            return res.status(401).send({
              message: 'Authentication failed. User not found.',
            });
          }
          user.comparePassword(req.body.password, (err, isMatch) => {
            if(isMatch && !err) {
              var newData;
              var token = jwt.sign(JSON.parse(JSON.stringify(user)), 'nodeauthsecret', {expiresIn: 86400 * 30});
              jwt.verify(token, 'nodeauthsecret', function(err, data){
                console.log(err, data);
                newData = data
              })
              res.json({success: true, token: 'JWT ' + token, data: newData});
            } else {
              res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.'});
            }
          })
        })
        .catch((error) => res.status(400).send(error));
  });

  router.get('/findToken', function(req, res){
      const token = req.headers.token
      var newData
      jwt.verify(token, 'nodeauthsecret', function(err, data){
        newData = data
        console.log(newData)
        User.findOne({
          where: {
              id: newData.id
          }
        })
        .then(user => {
          PlayerBandwagon.findAll({
              where: {
                  user_id: user.id
              }
          })
          .then(bandwagons => {
            console.log(user.dataValues, bandwagons)
            user.dataValues.playerBandwagons = bandwagons
            res.status(200).json({user: user})
          })
        })
      })

  })

  module.exports = router;