const Joi = require('joi');

// Define the schema for a Star Wars character
const characterSchema = Joi.object({
  name: Joi.string().min(3).required(),
  home_planet: Joi.number().integer().required(),
  starships: Joi.array().items(Joi.number().integer()).required()
});

// Validation middleware
const validateCharacter = (req, res, next) => {
  const { error } = characterSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: "Validation error: " + error.details[0].message });
  }
  next();
};

module.exports = {
  validateCharacter
};
