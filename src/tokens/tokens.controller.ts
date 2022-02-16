import { Request, Router, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { clearUnusedRefreshTokens } from './tokens.service';

const tokensController = Router();

tokensController.get('/clear', async (req: Request, res: Response): Promise<void> => {
  await clearUnusedRefreshTokens();
  res.status(StatusCodes.ACCEPTED).json({ message: 'success' });
});

export default tokensController;
