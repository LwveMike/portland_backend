import { Request, Router, Response } from 'express';
import { getAllRefreshTokens, verifyRefreshToken,  clearUnusedRefreshTokens} from './tokens.service';

const tokensController = Router();

tokensController.get('/', async (req: Request, res: Response): Promise<void> => {

    const tokens = await getAllRefreshTokens();
    res.json(tokens);
})

tokensController.post('/verify-refresh', async (req: Request, res: Response): Promise<void> => {

    const verified = await verifyRefreshToken(req.body.token);
    res.json(verified);
})

tokensController.get('/clear', async (req: Request, res: Response): Promise<void> => {
    await clearUnusedRefreshTokens();
    res.json({ message: 'success' });
})

export {
    tokensController
}
