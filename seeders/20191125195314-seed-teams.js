'use strict';
const Team = require('../models').Team;
const axios = require('axios')
const console = require('console')
const sleep = require('sleep');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const res = await axios("http://data.nba.net/data/10s/prod/v1/2019/teams.json")
    console.log(res)
    const promise =  await Promise.all(
      res.data.league.standard.map(team => {
        if(team.isNBAFranchise){
          console.log(team)
          return Team.create({
            name: team.fullName,
            ref_id: team.teamId,
            url_name: team.urlName,
            conference: team.confName,
            short_name: team.teamShortName,
            division: team.divName
          })
        }
      })
    )


    console.log(promise)
    return promise
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
