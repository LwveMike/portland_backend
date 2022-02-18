import { Request, Response, NextFunction } from 'express';
import ErrorMessage from 'src/globalTypes/Message';
import { verifyJwtToken, getAJwtToken, getUserDataFromToken } from '../tokens/tokens.module';
import { jwtDuration } from '../envConfig';

const checkToken = async (req: Request, res: Response, next: NextFunction)
: Promise<ErrorMessage | void> => {
  const oldJwtToken = req.cookies.jwttoken;
  const refreshToken = req.cookies.refreshtoken;

  if (oldJwtToken !== undefined) {
    if (await verifyJwtToken(oldJwtToken)) {
      const user = await getUserDataFromToken(oldJwtToken);
      req.body.user = user;
      next();
    } else {
      res.json({
        message: 'Refresh tokens is invalid.',
        fullfilled: false,
      });
    }
  } else if (refreshToken) {
    const jwtToken = await getAJwtToken(refreshToken);

    if (jwtToken) {
      const tokenMaxAge = new Date(Date.now()
      + parseInt(jwtDuration.slice(0, jwtDuration.length - 1), 10) * 1000);

      res.cookie('jwttoken', jwtToken, { expires: tokenMaxAge, httpOnly: true, sameSite: 'strict' });
      const user = await getUserDataFromToken(jwtToken as string);
      req.body.user = user;
      next();
    } else {
      res.json({
        message: 'Refresh tokens is invalid.',
        fullfilled: false,
      });
    }
  } else {
    res.json({
      message: 'You are not logged in.',
      fullfilled: false,
    });
  }
};

export default checkToken;
