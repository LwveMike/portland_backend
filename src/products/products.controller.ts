import { Request, Response, Router } from 'express';
import { getAllProducts, createProduct, getOneProductById, deleteOneProduct, updateOneProduct} from './products.service';

const productsController = Router();


productsController.get('/', async (req: Request, res: Response): Promise<void> => {

    try {
        const products = await getAllProducts();

        if(products)
            res.json(products);
        
    } catch(error) {
        res.json({
            message: "Couldn't retrieve all products.",
            error
        })
    }
})

productsController.get('/:id', async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
        const product = await getOneProductById(id);

        if(product)
            res.json(product);
        else {
            res.json({
                message: `There is no product with id of ${id}`
            })
        }


    } catch(error) {
        res.json({
            message: `Couldn't retrieve the product with id ${id}.`,
            error
        })
    }
})

productsController.post('/', async (req: Request, res: Response): Promise<void> => {

    try {
        const product = await createProduct(req.body);
        res.json(product);      
    } catch(error) {
        res.json({
            message: "The product couldn't be added to the DB.",
            error
        })
    }
})

productsController.delete('/:id', async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
        await deleteOneProduct(id);
        res.json({
            message: `The product with id ${id} was deleted successfuly.`
        });
    } catch(error) {
        res.json({
            message: "Error while trying to delete product from DB.",
            error
        })
    }
})

productsController.put('/:id', async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
        const product = await updateOneProduct(id, req.body);

        if(product)
            res.json(product);
        else {
            res.json({
                message: `The product with id ${id} couldn't be updated.`
            })
        }
    } catch(error) {
        res.json({
            message: `Error while trying to update product with id ${id}.`,
            error
        })
    }

})

export default productsController;