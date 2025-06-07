import express from 'express';

const router = express.Router();

/**
 * Spider-Man route handler
 * @param {import('express').Request} req - Express request object
 * @param {import('express').Response} res - Express response object
 */
export const spiderManHandler = (req, res) => {
  try {
    // Return a comprehensive Spider-Man representation
    const spiderManData = {
      name: 'Spider-Man',
      realName: 'Peter Parker',
      description: 'Friendly neighborhood superhero with spider-like abilities',
      powers: ['Wall-crawling', 'Spider-sense', 'Superhuman strength'],
      firstAppearance: 'Amazing Fantasy #15'
    };

    // Support case-insensitive routing
    const normalizedPath = req.path.toLowerCase().replace(/^\/|\/$/g, '');
    const validPaths = ['spiderman', 'spider-man', 'spiderman'];

    if (validPaths.includes(normalizedPath)) {
      res.status(200).json(spiderManData);
    } else {
      res.status(404).json({ error: 'Spider-Man route not found' });
    }
  } catch (error) {
    // Error handling for unexpected issues
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Unable to retrieve Spider-Man information'
    });
  }
};

router.get(['/spiderman', '/spider-man', '/SpiderMan'], spiderManHandler);

export default router;