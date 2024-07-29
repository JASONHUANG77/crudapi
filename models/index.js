const Sequelize = require('sequelize');
const sequelize = new Sequelize(config);

const GalaxyPlanet = require('./galaxyplanet')(sequelize, Sequelize.DataTypes);
const StarWarsCharacter = require('./starwarscharacter')(sequelize, Sequelize.DataTypes);
const StarshipMaster = require('./starshipmaster')(sequelize, Sequelize.DataTypes);

StarWarsCharacter.belongsTo(GalaxyPlanet, { foreignKey: 'home_planet' });
GalaxyPlanet.hasMany(StarWarsCharacter, { foreignKey: 'home_planet' });
StarWarsCharacter.belongsToMany(StarshipMaster, { through: 'CharacterStarships' });
StarshipMaster.belongsToMany(StarWarsCharacter, { through: 'CharacterStarships' });

module.exports = {
  sequelize,
  GalaxyPlanet,
  StarWarsCharacter,
  StarshipMaster
};

