'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Players', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      seasonDebut: {
        type: Sequelize.STRING
      },
      ref_id: {
        type: Sequelize.STRING
      },
      team_ref_id: {
        type: Sequelize.STRING
      },
      first_name: {
        type: Sequelize.STRING
      },
      last_name: {
        type: Sequelize.STRING
      },
      pts: {
        type: Sequelize.STRING
      },
      ast: {
        type: Sequelize.STRING
      },
      reb: {
        type: Sequelize.STRING
      },
      stl: {
        type: Sequelize.STRING
      },
      blk: {
        type: Sequelize.STRING
      },
      fgp: {
        type: Sequelize.STRING
      },
      tpp: {
        type: Sequelize.STRING
      },
      mpg: {
        type: Sequelize.STRING
      },
      topg: {
        type: Sequelize.STRING
      },
      ftp: {
        type: Sequelize.STRING
      },
      fga: {
        type: Sequelize.STRING
      },
      gamesPlayed: {
        type: Sequelize.STRING
      },
      plusMinus: {
        type: Sequelize.STRING
      },
      min: {
        type: Sequelize.STRING
      },
      dd2: {
        type: Sequelize.STRING
      },
      td3: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Players');
  }
};