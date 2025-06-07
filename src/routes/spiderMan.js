/**
 * Spider-Man route handler
 * @param {import('express').Request} req - Express request object
 * @param {import('express').Response} res - Express response object
 */
export const spiderManHandler = (req, res) => {
  try {
    // Normalize path to handle various route variations
    const requestPath = req.path.toLowerCase().replace(/[-/]/g, '');
    
    // Define all acceptable variations and the full route
    const acceptedPaths = ['spiderman', 'spider', 'spiderman', 'spider-man'];
    
    // Check if the path matches exactly
    if (requestPath === 'spiderman') {
      // Return comprehensive Spider-Man details
      res.status(200).json({
        name: 'Spider-Man',
        description: 'Friendly neighborhood superhero with spider-like abilities',
        realName: 'Peter Parker',
        powers: ['Wall-crawling', 'Spider-sense', 'Superhuman strength'],
        firstAppearance: 'Amazing Fantasy #15'
      });
    } else if (acceptedPaths.includes(requestPath)) {
      // Return slightly modified details for variations
      res.status(200).json({
        name: 'Spider-Man',
        description: 'Friendly neighborhood superhero with spider-like abilities',
        realName: 'Peter Parker',
        powers: ['Wall-crawling', 'Spider-sense', 'Superhuman strength'],
        firstAppearance: 'Amazing Fantasy #15'
      });
    } else {
      // If path doesn't match, return 404
      res.status(404).json({
        error: 'Not Found',
        message: 'Invalid route for Spider-Man'
      });
    }
  } catch (error) {
    // Error handling for unexpected issues
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Unable to retrieve Spider-Man information'
    });
  }
};