const express = require('express');
const { heroes } = require('../data/heroes');

const heroRoutes = express.Router();

heroRoutes.get('/ironMan', (req, res) => {
  try {
    const ironManDetails = heroes.ironMan;
    if (!ironManDetails) {
      return res.status(404).json({ error: 'Iron Man details not found' });
    }
    res.json(ironManDetails);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = heroRoutes;