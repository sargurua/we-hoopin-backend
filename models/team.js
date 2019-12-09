'use strict';
module.exports = (sequelize, DataTypes) => {
  const Team = sequelize.define('Team', {
    name: DataTypes.STRING,
    ref_id: DataTypes.STRING,
    url_name: DataTypes.STRING,
    conference: DataTypes.STRING,
    short_name: DataTypes.STRING,
    division: DataTypes.STRING
  }, {});
  Team.associate = function(models) {
    // associations can be defined here
  };
  return Team;
};