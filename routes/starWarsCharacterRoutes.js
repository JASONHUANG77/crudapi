const express = require('express');
const router = express.Router();
const {
  getCharacter,
  createCharacter,
  updateCharacter,
  deleteCharacter
} = require('../controllers/starWarsCharacterController');
const { validateCharacter } = require('../validators/characterValidators');

// Use the validation middleware on routes that create or update characters
router.get('/:id', getCharacter);
router.post('/', validateCharacter, createCharacter);
router.put('/:id', validateCharacter, updateCharacter);
router.delete('/:id', deleteCharacter);

module.exports = router;
