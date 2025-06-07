import express from 'express';

const router = express.Router();

const heroData = {
  'spiderman': {
    name: 'Spider-Man',
    realName: 'Peter Parker',
    powers: ['Wall-crawling', 'Spider-sense', 'Superhuman strength'],
    firstAppearance: 'Amazing Fantasy #15'
  }
};

router.get(['/spiderMan', '/spiderman', '/spider-man', '/SpiderMan'], (req, res) => {
  res.json(heroData['spiderman']);
});

export default router;