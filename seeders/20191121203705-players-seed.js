'use strict';
const Player = require('../models').Player;
const axios = require('axios')
const console = require('console')
const sleep = require('sleep');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
        const response = await axios.get("http://data.nba.net/data/10s/prod/v1/2019/players.json")
    
        const promise = await Promise.all(

          response.data.league.standard.map(async (player) => {
            if (player.isActive)  {
              try{
                console.log(`${player.firstName} ${player.lastName}`)
                const stats = await axios.get(`http://data.nba.net/data/10s/prod/v1/2019/players/${player.personId}_profile.json`)
                const obj = await stats.data.league.standard.stats.careerSummary
                console.log(obj)
  
                return Player.create({
                  ref_id: player.personId,
                  seasonDebut: player.nbaDebutYear,
                  first_name: player.firstName,
                  last_name: player.lastName,
                  team_ref_id: player.teamId,
                  pts: obj.ppg === "" ? "0" : obj.ppg,
                  ast: obj.apg === "" ? "0" : obj.apg,
                  reb: obj.rpg === "" ? "0" : obj.rpg,
                  stl: obj.spg === "" ? "0" : obj.spg,
                  blk: obj.bpg === "" ? "0" : obj.bpg,
                  fgp: obj.fpg === "" ? "0" : obj.fgp,
                  tpp: obj.tpp === "" ? "0" : obj.tpp,
                  mpg: obj.mpg === "" ? "0" : obj.mpg,
                  topg: obj.turnovers === "" ? "0" : obj.turnovers / obj.gamesPlayed,
                  ftp: obj.ftp === "" ? "0" : obj.ftp,
                  fga: obj.fga === "" ? "0" : obj.fga,
                  gamesPlayed: obj.gamesPlayed === "" ? "0" : obj.gamesPlayed, 
                  plusMinus: obj.plusMinus === "" ? "0" : obj.plusMinus / obj.gamesPlayed,
                  min: obj.mpg === "" ? "0" : obj.mpg,
                  dd2: obj.dd2 === "" ? "0" : obj.dd2,
                  td3: obj.td3 === "" ? "0" : obj.td3
                })
              } catch (err) {
                console.log(err, `There was an error: ${player.firstName} ${player.lastName}`)

                const stats = await axios.get(`http://data.nba.net/data/10s/prod/v1/2019/players/${player.personId}_profile.json`)
                const obj = await stats.data.league.standard.stats.careerSummary
                
                console.log("the error fetched", !!obj)
                return Player.create({
                  ref_id: player.personId,
                  seasonDebut: player.nbaDebutYear,
                  first_name: player.firstName,
                  last_name: player.lastName,
                  team_ref_id: player.teamId,
                  pts: obj.ppg === "" ? "0" : obj.ppg,
                  ast: obj.apg === "" ? "0" : obj.apg,
                  reb: obj.rpg === "" ? "0" : obj.rpg,
                  stl: obj.spg === "" ? "0" : obj.spg,
                  blk: obj.bpg === "" ? "0" : obj.bpg,
                  fgp: obj.fpg === "" ? "0" : obj.fgp,
                  tpp: obj.tpp === "" ? "0" : obj.tpp,
                  mpg: obj.mpg === "" ? "0" : obj.mpg,
                  topg: obj.turnovers === "" ? "0" : obj.turnovers / obj.gamesPlayed,
                  ftp: obj.ftp === "" ? "0" : obj.ftp,
                  fga: obj.fga === "" ? "0" : obj.fga,
                  gamesPlayed: obj.gamesPlayed === "" ? "0" : obj.gamesPlayed, 
                  plusMinus: obj.plusMinus === "" ? "0" : obj.plusMinus / obj.gamesPlayed,
                  min: obj.mpg === "" ? "0" : obj.mpg,
                  dd2: obj.dd2 === "" ? "0" : obj.dd2,
                  td3: obj.td3 === "" ? "0" : obj.td3
                })
              }
            }
          })
        )
      return promise

  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
   return queryInterface.bulkDelete('Players', null, {});
  }
};
