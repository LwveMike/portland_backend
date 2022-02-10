const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const getAllProducts = async () => {
    try {
        const products = await prisma.product.findMany();
        return products;
    }
    catch (error) {
        return {
            message: "Couldn't retrieve products",
            error
        }
    }
}

const createProduct = async (createProductDto) => {

    try {
        const product = await prisma.product.create({
            data: createProductDto
        })

        return product;

    } catch (error) {
        return {
            message: "The product wasn't added to DB ",
            error
        }
    }

}


const getOneProduct = async (paramId) => {
    let id = parseInt(paramId);

    try {
        const product = await prisma.product.findUnique({
            where: {
                id: id
            }
        })

        if (product)
            return product;
        else
            return {
                message: `No product with id of ${id} in DB.`
            }

    } catch (error) {
        return {
            message: `Couldn't retrieve product with id of ${id}`,
            error
        }
    }
}

const deleteOneProduct = async (paramId) => {
    let id = parseInt(paramId);

    try {
        const product = await prisma.product.delete({
            where: {
                id: id
            }
        })

        return {
            message: `Product with id of ${id} deleted.`
        }

    } catch (error) {
        return {
            message: `Couldn't delete product with id of ${id}`,
            error
        }
    }
}

const updateOneProduct = async (paramId, fieldsToUpdate) => {
    let id = parseInt(paramId);

    try {
        const product = await prisma.product.update({
            where: {
                id
            },
            data: fieldsToUpdate
        })

        if (product)
            return product;
    } catch (error) {
        return {
            message: `Your product with id of ${id} coudln't be updated.`,
            error
        }
    }
}

module.exports = {
    getAllProducts,
    createProduct,
    getOneProduct,
    deleteOneProduct,
    updateOneProduct,
}
