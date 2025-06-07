/**
 * Spider-Man route handler
 * @param {import('express').Request} req - Express request object
 * @param {import('express').Response} res - Express response object
 */
export const spiderManHandler = (req, res) => {
  try {
    // Return a comprehensive Spider-Man information object
    res.status(200).json({
      name: 'Spider-Man',
      realName: 'Peter Parker',
      powers: ['Wall-crawling', 'Spider-sense', 'Superhuman strength'],
      description: 'Friendly neighborhood superhero with spider-like abilities',
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