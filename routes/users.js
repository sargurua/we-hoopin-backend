var express = require('express');
var router = express.Router();

const User = require('../models').User;
const PlayerBandwagon = require('../models').PlayerBandwagon

/* GET users listing. */
router.get('/', function(req, res, next) {
  User.findAll()
  .then(users => res.status(200).json(users))
  .catch(error => res.status(402).send(error))  
});

router.post('/find', async function(req, res, next) {
  try {
    const user = await User.findOne({
      where: {
        id: req.body.user_id
      }
    })
    const bandwagons = await PlayerBandwagon.findAll({
        where: {
          user_id: user.id
        }
    })


    console.log("--------------------",bandwagons)

    user.playerBandwagons = "await bandwagons"

    await res.status(200).json(user)
    return user
  } catch (err) {
    throw err
  }
})

module.exports = router;
