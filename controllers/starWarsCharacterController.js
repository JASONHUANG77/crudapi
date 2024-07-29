const { StarWarsCharacter, GalaxyPlanet, StarshipMaster } = require('../models');

const getCharacter = async (req, res) => {
  try {
    const { id } = req.params;
    const character = await StarWarsCharacter.findByPk(id, {
      include: [GalaxyPlanet, { model: StarshipMaster, through: 'CharacterStarships' }]
    });
    if (!character) {
      return res.status(404).json({ message: 'Character not found' });
    }
    res.json(character);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createCharacter = async (req, res) => {
  try {
    const { name, home_planet, starships } = req.body;
    const newCharacter = await StarWarsCharacter.create({
      name,
      home_planet,
      starships
    });
    res.status(201).json(newCharacter);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateCharacter = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, home_planet, starships } = req.body;
    const updated = await StarWarsCharacter.update({ name, home_planet, starships }, {
      where: { id }
    });
    if (updated[0] === 0) {
      return res.status(404).json({ message: 'Character not found' });
    }
    res.json({ message: 'Character updated' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteCharacter = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await StarWarsCharacter.destroy({ where: { id } });
    if (deleted === 0) {
      return res.status(404).json({ message: 'Character not found' });
    }
    res.json({ message: 'Character deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getCharacter,
  createCharacter,
  updateCharacter,
  deleteCharacter
};
