const { getAllProducts, createProduct } = require('./products.service');
const productsController = require('./products.controller');



module.exports = {
    getAllProducts,
    createProduct,
    productsController
}