import { Request, Router, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import {
  deleteOneUser, updateOneUser,
} from './users.service';

const usersController = Router();

usersController.delete('/:id', async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    await deleteOneUser(id);

    res.status(StatusCodes.ACCEPTED).json({
      message: `User with id ${id} was deleted successfuly.`,
    });
  } catch (error) {
    res.status(StatusCodes.NO_CONTENT).json({
      message: `Error couldn't delete user with id ${id}.`,
      error,
    });
  }
});

usersController.put('/:id', async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const user = await updateOneUser(id, req.body);

    if (user) res.status(StatusCodes.ACCEPTED).json(user);
    else {
      res.status(StatusCodes.NO_CONTENT).json({
        message: `User with id ${id} couldn't be updated.`,
      });
    }
  } catch (error) {
    res.status(StatusCodes.NO_CONTENT).json({
      message: `Error couldn't update user with id ${id}.`,
      error,
    });
  }
});

export default usersController;
