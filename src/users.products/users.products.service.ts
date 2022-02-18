import { PrismaClient } from '@prisma/client';
import { createProduct } from '../products/products.module';
import CreateProductDto from '../products/dto/createProduct.dto';
import CreateUsersProductDto from './dto/createUsersProduct.dto';
import Product from '../products/types/Product';
import { getOneProductById } from '../products/products.service';
import UpdateUsersProductDto from './dto/updateUsersProduct.dto';

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

const getAllUsersProducts = async (ownerId: number): Promise<Product[] | boolean> => {
  const userQuery = await prisma.user.findFirst({
    where: {
      id: ownerId,
    },
    select: {
      products: true,
    },
  });

  return userQuery?.products || false;
};

const getOneUsersProductById = async (ownerId: number, productId: string)
: Promise<Product[] | boolean> => {
  const id = parseInt(productId, 10);

  if (!Number.isNaN(id)) {
    const userQuery = await prisma.user.findUnique({
      where: {
        id: ownerId,
      },
      select: {
        products: {
          where: {
            id,
          },
        },
      },
    });

    if (userQuery != null) return userQuery.products;
  }

  return false;
};

const deleteOneUsersProductById = async (ownerId: number, productId: string)
: Promise<boolean> => {
  const id = parseInt(productId, 10);

  if (!Number.isNaN(id)) {
    let product = await getOneProductById(productId);

    if (product) {
      product = product as Product;
      if (product.ownerId === ownerId) {
        try {
          await prisma.product.delete({
            where: {
              id,
            },
          });

          return true;
        } catch (error) {
          return false;
        }
      }

      return false;
    }

    return false;
  }

  return false;
};

const updateOneUsersProductById = async (
  ownerId: number,
  productId: string,
  updateUsersProductDto: UpdateUsersProductDto,
)
: Promise<Product | boolean> => {
  const id = parseInt(productId, 10);

  if (!Number.isNaN(id)) {
    try {
      let product = await getOneProductById(productId);

      if (product) {
        product = product as Product;
        if (product.ownerId === ownerId) {
          const updatedProduct = await prisma.product.update({
            where: {
              id,
            },
            data: updateUsersProductDto,
          });

          return updatedProduct;
        }

        return false;
      }
    } catch (error) {
      return false;
    }

    return false;
  }

  return false;
};

export {
  createUsersProduct,
  getAllUsersProducts,
  getOneUsersProductById,
  deleteOneUsersProductById,
  updateOneUsersProductById,

};
