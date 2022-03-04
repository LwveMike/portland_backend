import { Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { register, login, logout } from './auth.service';
import checkToken from '../middleware/checkToken';

const authController = Router();

authController.post('/register', async (req: Request, res: Response): Promise<void> => {
  try {
    const message = await register(req.body, res);
    res.status(StatusCodes.CREATED).json({
      fullfilled: true,
      message});
  } catch (error) {
    res.status(StatusCodes.CONFLICT).json({
      fullfilled: false,
      message: "Error User couldn't be registered.",
      error,
    });
  }
});

authController.post('/login', async (req: Request, res: Response) => {
  try {
    const message = await login(req.body, res);
    res.status(StatusCodes.OK).json(message);
  } catch (error) {
    res.status(StatusCodes.CONFLICT).json({
      fullfilled: false,
      error,
    });
  }
});

authController.delete('/logout', async (req: Request, res: Response) => {
  try {
    await logout(res);
    res.status(StatusCodes.OK).json({
      message: 'You logged out.',
    });
  } catch (error) {
    res.status(StatusCodes.CONFLICT).json({
      message: 'Error logging out.',
      error,
    });
  }
});

authController.get('/get-user-data', checkToken, async (req: Request, res: Response)
: Promise<void> => {
  res.json({
    fullfilled: true,
    user: req.body.user});
});

export default authController;
