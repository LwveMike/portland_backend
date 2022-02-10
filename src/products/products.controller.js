const productsController = require('express').Router();
const { getAllProducts, createProduct, getOneProduct, deleteOneProduct, updateOneProduct } = require('./products.service');

productsController.get('/', async (req, res) => {
    const products = await getAllProducts();

    res.json(products);
})

productsController.get('/:id', async (req, res) => {
    const { id } = req.params;

    const product = await getOneProduct(id);

    res.json(product);
})

productsController.post('/', async (req, res) => {
    const product = await createProduct(req.body);
    res.json(product);
})

productsController.delete('/:id', async (req, res) => {
    const { id } = req.params;

    const message = await deleteOneProduct(id);

    res.json(message);
})

productsController.put('/:id', async (req, res) => {
    const { id } = req.params;

    const product = await updateOneProduct(id, req.body);

    res.json(product);
})



module.exports = productsController;