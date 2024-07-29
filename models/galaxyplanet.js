module.exports = (sequelize, DataTypes) => {
    return sequelize.define('GalaxyPlanet', {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      name: DataTypes.STRING,
      climate: DataTypes.STRING,
      population: DataTypes.INTEGER
    });
  };
  