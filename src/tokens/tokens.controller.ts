import { Request, Router, Response } from 'express';
import { getAllRefreshTokens, verifyRefreshToken,  clearUnusedRefreshTokens} from './tokens.service';

const tokensController = Router();

tokensController.get('/clear', async (req: Request, res: Response): Promise<void> => {
    await clearUnusedRefreshTokens();
    res.json({ message: 'success' });
})

export {
    tokensController
}
