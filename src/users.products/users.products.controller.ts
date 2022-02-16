import { Request, Router, Response } from 'express';
import { createUsersProduct, getAllUsersProducts } from './users.products.service';

const usersProductsController = Router();

usersProductsController.post('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const product = await createUsersProduct(req.body.user.id, req.body.product);

    if (product) res.json(product);
    res.json({
      message: "The product wasn't made.",
    });
  } catch (error) {
    res.json({
      message: "Couldn't create the product.",
      error,
    });
  }
});

usersProductsController.get('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await getAllUsersProducts(req.body.user.id);
    res.json(products);
  } catch (error) {
    res.json({
      message: "Can't retrieve all items",
      error,
    });
  }
});

export default usersProductsController;
