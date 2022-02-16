import { Request, Router, Response } from 'express';
import { clearUnusedRefreshTokens } from './tokens.service';

const tokensController = Router();

tokensController.get('/clear', async (req: Request, res: Response): Promise<void> => {
  await clearUnusedRefreshTokens();
  res.json({ message: 'success' });
});

export default tokensController;
