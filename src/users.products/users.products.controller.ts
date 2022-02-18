import { Request, Router, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import {
  createUsersProduct, deleteOneUsersProductById, getAllUsersProducts,
  getOneUsersProductById, updateOneUsersProductById,
} from './users.products.service';

const usersProductsController = Router();

usersProductsController.post('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const product = await createUsersProduct(req.body.user.id, req.body.product);

    if (product) {
      res.json({
        product,
        fullfilled: true,
      });
    } else {
      res.status(StatusCodes.CREATED).json({
        message: "The product wasn't made.",
        fullfilled: false,
      });
    }
  } catch (error) {
    res.status(StatusCodes.OK).json({
      message: "Couldn't create the product.",
      fullfilled: false,
      error,
    });
  }
});

usersProductsController.get('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await getAllUsersProducts(req.body.user.id);
    res.status(StatusCodes.ACCEPTED).json(products);
  } catch (error) {
    res.status(StatusCodes.OK).json({
      message: "Can't retrieve all items",
      error,
    });
  }
});

usersProductsController.get('/:id', async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const product = await getOneUsersProductById(req.body.user.id, id);

    if (product) res.status(StatusCodes.ACCEPTED).json(product);
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).json({
      message: `Can't retrieve product with id of ${id}`,
      error,
    });
  }
});

usersProductsController.delete('/:id', async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    if (await deleteOneUsersProductById(req.body.user.id, id)) {
      res.status(StatusCodes.ACCEPTED).json({
        productId: id,
        fullfilled: true,
      });
    } else {
      res.status(StatusCodes.OK).json({
        message: `You don't have permission to delete product with id of ${id}, or there is no product with this id`,
        fullfilled: false,
      });
    }
  } catch (error) {
    res.status(StatusCodes.OK).json({
      message: `Error while trying to delete product with id of ${id}`,
      fullfilled: false,
    });
  }
});

usersProductsController.put('/:id', async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const product = await updateOneUsersProductById(req.body.user.id, id, req.body.product);

    if (product) {
      res.status(StatusCodes.ACCEPTED).json({
        product,
        fullfilled: true,
      });
    } else {
      res.status(StatusCodes.OK).json({
        message: `You can't update product with id of ${id}`,
        fullfilled: false,
      });
    }
  } catch (error) {
    res.status(StatusCodes.OK).json({
      message: `You can't update product with id of ${id}`,
      fullfilled: false,
    });
  }
});

export default usersProductsController;
