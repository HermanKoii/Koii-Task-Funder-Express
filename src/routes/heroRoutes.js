import express from 'express';
import { heroes } from '../data/heroes.js';

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

export default heroRoutes;