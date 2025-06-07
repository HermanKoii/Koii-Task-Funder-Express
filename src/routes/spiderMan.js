import express from 'express';

const router = express.Router();

export const spiderManHandler = (req, res) => {
  try {
    // Return a comprehensive representation of Spider-Man
    res.status(200).json({
      name: 'Spider-Man',
      realName: 'Peter Parker',
      description: 'Friendly neighborhood superhero with spider-like abilities',
      powers: ['Wall-crawling', 'Spider-sense', 'Superhuman strength'],
      firstAppearance: 'Amazing Fantasy #15'
    });
  } catch (error) {
    // Error handling for unexpected issues
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Unable to retrieve Spider-Man information'
    });
  }
};

router.get(['/spiderMan', '/spiderman', '/spider-man', '/SpiderMan'], spiderManHandler);

export default router;