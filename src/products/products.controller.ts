import { Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import {
  getAllProducts, createProduct, getOneProductById, deleteOneProduct, updateOneProduct,
} from './products.service';

const productsController = Router();

productsController.get('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await getAllProducts();

    if (products) res.status(StatusCodes.OK).json(products);
  } catch (error) {
    res.status(StatusCodes.NO_CONTENT).json({
      message: "Couldn't retrieve all products.",
      error,
    });
  }
});

productsController.get('/:id', async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const product = await getOneProductById(id);

    if (product) res.status(StatusCodes.OK).json(product);
    else {
      res.status(StatusCodes.BAD_REQUEST).json({
        message: `There is no product with id of ${id}, or the id is not a number or a string that can be parsed as number`,
      });
    }
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({
      message: `Couldn't retrieve the product with id ${id}.`,
      error,
    });
  }
});

productsController.post('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const product = await createProduct(req.body);
    res.status(StatusCodes.CREATED).json(product);
  } catch (error) {
    res.status(StatusCodes.NOT_ACCEPTABLE).json({
      message: "The product couldn't be added to the DB.",
      error,
    });
  }
});

productsController.delete('/:id', async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    await deleteOneProduct(id);
    res.status(StatusCodes.ACCEPTED).json({
      message: `The product with id ${id} was deleted successfuly.`,
    });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({
      message: 'Error while trying to delete product from DB.',
      error,
    });
  }
});

productsController.put('/:id', async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const product = await updateOneProduct(id, req.body);

    if (product) res.status(StatusCodes.OK).json(product);
    else {
      res.status(StatusCodes.BAD_REQUEST).json({
        message: `The product with id ${id} couldn't be updated.`,
      });
    }
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({
      message: `Error while trying to update product with id ${id}.`,
      error,
    });
  }
});

export default productsController;
