import { Request, Response } from 'express';

export const spiderManHandler = (req: Request, res: Response) => {
  res.json({
    name: 'Spider-Man',
    realName: 'Peter Parker',
    powers: ['Wall-crawling', 'Spider-sense', 'Superhuman strength'],
    firstAppearance: 'Amazing Fantasy #15',
    description: 'Friendly neighborhood superhero with spider-like abilities'
  });
};