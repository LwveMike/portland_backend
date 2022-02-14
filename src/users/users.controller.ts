import { Request, Router, Response } from 'express';
import { createUser, deleteOneUser, getAllUsers, getOneUserById, updateOneUser } from './users.service';

const usersController = Router();

usersController.get('/', async (req: Request, res: Response): Promise<void>  => {

    try {
        const users = await getAllUsers();

        if(users)
            res.json(users)

    } catch(error) {
        res.json({
            message: "Couldn't retrieve users from DB.",
            error
        })
    }
})

usersController.post('/', async (req: Request, res: Response): Promise<void> => {
    
    try {
        const user = await createUser(req.body);
        res.json(user);
    } catch(error) {
        res.json({
            message: "User couldn't be created.",
            error
        })
    }
})

usersController.get('/:id', async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
        const user = await getOneUserById(id);

        if(user)
            res.json(user);
        else 
            res.json({
                message: `There is no user with id ${id}.`
            })
    } catch(error) {
        res.json({
            message: `Error while trying to retrieve user with id ${id}`,
            error
        })
    }
})


usersController.delete('/:id', async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
        await deleteOneUser(id);

        res.json({
            message: `User with id ${id} was deleted successfuly.`
        })
    } catch(error) {
        res.json({
            message: `Error couldn't delete user with id ${id}.`,
            error
        })
    }
})

usersController.put('/:id', async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
        const user = await updateOneUser(id, req.body);

        if(user)
            res.json(user);
        else 
            res.json({
                message: `User with id ${id} couldn't be updated.`
            })

    } catch(error) {
        res.json({
            message: `Error couldn't update user with id ${id}.`,
            error
        })
    }
})

export default usersController;