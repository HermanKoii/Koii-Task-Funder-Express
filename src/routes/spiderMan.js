/**
 * Spider-Man route handler
 * @param {import('express').Request} req - Express request object
 * @param {import('express').Response} res - Express response object
 */
export const spiderManHandler = (req, res) => {
  try {
    // Return a string representation of Spider-Man
    res.status(200).json({
      name: 'Spider-Man',
      description: 'Friendly neighborhood superhero with spider-like abilities',
      realName: 'Peter Parker'
    });
  } catch (error) {
    // Error handling for unexpected issues
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Unable to retrieve Spider-Man information'
    });
  }
};