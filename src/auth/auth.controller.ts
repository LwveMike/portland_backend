import { Request, Response, Router } from 'express';
import { register, login, logout } from './auth.service';

const authController = Router();

authController.post('/register', async (req: Request, res: Response): Promise<void> => {

    try {
        const message = await register(req.body, res);
        res.json(message);
    } catch(error) {
        res.json({
            message: "Error User couldn't be registered.",
            error
        })
    }

})

authController.post('/login', async (req: Request, res: Response) => {

    try {
        const message = await login(req.body, res);
        res.json(message);

    } catch(error) {
        res.json({
            message: "Error User couldn't login",
            error
        })
    }

})

authController.delete('/logout', async (req: Request, res: Response) => {
    try {
        await logout(res);
        res.json({
            message: "You logged out."
        })
} catch(error) {
        res.json({
            message: "Error logging out.",
            error
        })
}
})

export default authController;