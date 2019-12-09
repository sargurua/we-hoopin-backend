'use strict';
module.exports = (sequelize, DataTypes) => {
  const Player = sequelize.define('Player', {
    ref_id: DataTypes.STRING,
    seasonDebut: DataTypes.STRING,
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    team_ref_id: DataTypes.STRING,
    pts: DataTypes.STRING,
    ast: DataTypes.STRING,
    reb: DataTypes.STRING,
    stl: DataTypes.STRING,
    blk: DataTypes.STRING,
    fgp: DataTypes.STRING,
    tpp: DataTypes.STRING,
    mpg: DataTypes.STRING,
    topg: DataTypes.STRING,
    ftp: DataTypes.STRING,
    fga: DataTypes.STRING,
    gamesPlayed: DataTypes.STRING,
    plusMinus: DataTypes.STRING,
    min: DataTypes.STRING,
    dd2: DataTypes.STRING,
    td3: DataTypes.STRING,
  }, {});
  Player.associate = function(models) {
    // associations can be defined here
  };
  return Player;
};