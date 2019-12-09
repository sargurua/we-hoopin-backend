'use strict';
module.exports = (sequelize, DataTypes) => {
  const PlayerBandwagon = sequelize.define('PlayerBandwagon', {
    player_ref_id: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    start_date: DataTypes.STRING,
    end_date: DataTypes.STRING
  }, {});
  PlayerBandwagon.associate = function(models) {
    // associations can be defined here
  };
  return PlayerBandwagon;
};