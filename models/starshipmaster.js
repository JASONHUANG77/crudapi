module.exports = (sequelize, DataTypes) => {
    return sequelize.define('StarshipMaster', {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      name: DataTypes.STRING,
      model: DataTypes.STRING,
      cost_in_credits: DataTypes.DECIMAL(10, 2)
    });
  };
  
  