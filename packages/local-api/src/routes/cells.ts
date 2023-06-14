import express from 'express';
import fs from 'fs/promises';
import path from 'path';

interface Cell {
  id: string;
  content: string;
  type: 'code' | 'text';
}

interface LocalApiError {
  code: string;
}

export const createCellsRouter = (filename: string, dir: string) => {
  const router = express.Router();

  // Parse the body of the request
  router.use(express.json());

  const fullPath = path.join(dir, filename);

  router.get('/cells', async (req, res) => {
    const isLocalApiError = (err: any): err is LocalApiError => {
      return typeof err.code === 'string';
    };
    try {
      // Read the file
      const result = await fs.readFile(fullPath, { encoding: 'utf-8' });

      // Parse a list of cells out of it
      // Send list of cells back to browser
      res.send(JSON.parse(result));
    } catch (err) {
      // If file does not existm create a file and add default cells
      if (isLocalApiError(err)) {
        if (err.code === 'ENOENT') {
          await fs.writeFile(fullPath, '[]', 'utf-8');
          res.send([]);
        }
      } else {
        // Another thing, just rethrow the error
        throw err;
      }
    }
  });

  router.post('/cells', async (req, res) => {
    // Take the list of cells from the request obj
    // serielize them
    const { cells }: { cells: Cell[] } = req.body;

    // Write the cells into the file
    await fs.writeFile(fullPath, JSON.stringify(cells), 'utf-8');

    res.send({ status: 'ok ' });
  });

  return router;
};
