import express from 'express';

const router = express.Router();

/**
 * Detailed hero data with comprehensive information
 */
const heroData = {
  'spiderman': {
    name: 'Spider-Man',
    realName: 'Peter Parker',
    powers: ['Wall-crawling', 'Spider-sense', 'Superhuman strength'],
    firstAppearance: 'Amazing Fantasy #15',
    description: 'Friendly neighborhood superhero with spider-like abilities'
  }
};

/**
 * Route handler for Spider-Man with multiple path variations
 * Supports case-insensitive and alternative route formats
 */
router.get(['/spiderMan', '/spiderman', '/spider-man', '/SpiderMan'], (req, res) => {
  try {
    res.status(200).json(heroData['spiderman']);
  } catch (error) {
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Unable to retrieve Spider-Man information'
    });
  }
});

export default router;