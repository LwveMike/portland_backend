import { PrismaClient } from "@prisma/client";
import CreateProductDto from "./dto/createProduct.dto";
import UpdateProductDto from "./dto/updateProduct.dto";
import Product from "./types/Product";

const prisma = new PrismaClient();

const getAllProducts = async (): Promise<Product[] | any> => {

    const products = await prisma.product.findMany();

    if(products)
        return products;
    else
        return {
            message: 'error query'
        }

}

const createProduct = async (createProductDto: CreateProductDto): Promise<Product> => {

        const product = await prisma.product.create({
            data: createProductDto
        })

        return product;

}

const getOneProductById = async (paramId: string): Promise<Product | null> => {
    let id = parseInt(paramId);

    const product = await prisma.product.findUnique({
        where: {
            id: id
        }
    })

    if(product)
        return product;
    return null;
}

const deleteOneProduct = async (paramId: string): Promise<void> => {

    let id = parseInt(paramId);

    await prisma.product.delete({
        where: {
            id: id
        }
    })

}

const updateOneProduct = async (paramId: string, updateProductDto: UpdateProductDto): Promise<Product | void> => {
    let id = parseInt(paramId);

    const product = await prisma.product.update({
        where: {
            id
        },
        data: updateProductDto
    })

    if (product)
        return product;
        
}

export {
    getAllProducts,
    createProduct,
    getOneProductById,
    deleteOneProduct,
    updateOneProduct
}