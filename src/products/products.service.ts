import { PrismaClient } from '@prisma/client';
import CreateProductDto from './dto/createProduct.dto';
import UpdateProductDto from './dto/updateProduct.dto';
import Product from './types/Product';

const prisma = new PrismaClient();

const getAllProducts = async (): Promise<Product[] | any> => {
  const products = await prisma.product.findMany();

  if (products) return products;
  return {
    message: 'error query',
  };
};

const createProduct = async (createProductDto: CreateProductDto): Promise<Product> => {
  const product = await prisma.product.create({
    data: createProductDto,
  });

  return product;
};

const getOneProductById = async (paramId: string): Promise<Product | boolean> => {
  const id = parseInt(paramId, 10);

  if (!Number.isNaN(id)) {
    const product = await prisma.product.findUnique({
      where: {
        id,
      },
    });

    if (product != null) return product;
  }

  return false;
};

const deleteOneProduct = async (paramId: string): Promise<boolean> => {
  const id = parseInt(paramId, 10);

  if (!Number.isNaN(id)) {
    await prisma.product.delete({
      where: {
        id,
      },
    });

    return true;
  }

  return false;
};

const updateOneProduct = async (paramId: string, updateProductDto: UpdateProductDto)
: Promise<Product | boolean> => {
  const id = parseInt(paramId, 10);

  if (!Number.isNaN(id)) {
    const product = await prisma.product.update({
      where: {
        id,
      },
      data: updateProductDto,
    });

    if (product != null) return product;
  }

  return false;
};

export {
  getAllProducts,
  createProduct,
  getOneProductById,
  deleteOneProduct,
  updateOneProduct,
};
