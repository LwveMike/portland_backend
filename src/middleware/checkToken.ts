import { Request, Response, NextFunction } from 'express';
import ErrorMessage from 'src/globalTypes/Message';
import { StatusCodes } from 'http-status-codes';
import { verifyJwtToken, getAJwtToken } from '../tokens/tokens.module';
import { jwtDuration } from '../envConfig';

const checkToken = async (req: Request, res: Response, next: NextFunction)
: Promise<ErrorMessage | void> => {
  const tokenMaxAge = new Date(Date.now()
  + parseInt(jwtDuration.slice(0, jwtDuration.length - 1), 10) * 1000);
  let jwtToken = req.cookies.jwttoken;
  const refreshToken = req.cookies.refreshtoken;

  if (jwtToken) {
    await verifyJwtToken(jwtToken);
    next();
  } else if (refreshToken) {
    jwtToken = await getAJwtToken(refreshToken);

    if (jwtToken) {
      res.cookie('jwttoken', jwtToken, { expires: tokenMaxAge, httpOnly: true, sameSite: 'strict' });
      next();
    }
  } else {
    res.status(StatusCodes.UNAUTHORIZED).json({
      message: 'You are not logged in.',
    });
  }
};

export default checkToken;
