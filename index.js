const express = require('express');
const bodyParser = require('body-parser');
const starWarsCharacterRoutes = require('./routes/starWarsCharacterRoutes');
const { sequelize } = require('./models');

const app = express();
app.use(bodyParser.json());

// Register the routes
app.use('/characters', starWarsCharacterRoutes);

// Global route for catching all other requests
app.use((req, res, next) => {
  res.status(404).send('Endpoint not found');
});

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.get('/', (req, res) => {
  res.send('Welcome to the Star Wars API!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  try {
    await sequelize.authenticate();
    console.log('Database connected.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});
