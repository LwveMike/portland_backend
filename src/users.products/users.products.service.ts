import { PrismaClient } from '@prisma/client';
import { createProduct } from '../products/products.module';
import CreateProductDto from '../products/dto/createProduct.dto';
import CreateUsersProductDto from './dto/createUsersProduct.dto';
import Product from '../products/types/Product';

const prisma = new PrismaClient();

const createUsersProduct = async (ownerId: number, createUsersProductDto: CreateUsersProductDto)
: Promise<Product | boolean> => {
  const createProductDto: CreateProductDto = {
    ...createUsersProductDto,
    ownerId,
  };

  const product = await createProduct(createProductDto);

  if (product) return product;
  return false;
};

const getAllUsersProducts = async (ownerId: number): Promise<any> => {
  const userQuery = await prisma.user.findFirst({
    where: {
      id: ownerId,
    },
    select: {
      products: true,
    },
  });

  return userQuery?.products;
};

export {
  createUsersProduct,
  getAllUsersProducts,

};
