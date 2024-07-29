module.exports = (sequelize, DataTypes) => {
    return sequelize.define('StarWarsCharacter', {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      name: DataTypes.STRING,
      home_planet: { type: DataTypes.INTEGER, references: { model: 'GalaxyPlanets', key: 'id' } },
      starships: DataTypes.JSONB
    });
  };
  
  