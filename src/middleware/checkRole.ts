import { Request, Response, NextFunction } from 'express';

const checkRole = async (req: Request, res: Response, next: NextFunction)
: Promise<void> => {
  if (req.body.user.role === 'admin') next();
  else {
    res.json({
      message: 'You are not admin',
      fullfilled: false,
    });
  }
};

export default checkRole;
