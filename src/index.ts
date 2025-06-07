<<<<<<< HEAD
import express, { Request, Response } from 'express';
=======
import express from 'express';
>>>>>>> pr-21-HermanL0201-Koii-Task-Funder-Express

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

<<<<<<< HEAD
app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Hero API is running' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
=======
app.get('/', (req, res) => {
  res.json({ message: 'Hero API is running!' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
>>>>>>> pr-21-HermanL0201-Koii-Task-Funder-Express
});

export default app;