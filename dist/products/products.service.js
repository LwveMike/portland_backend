"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOneProduct = exports.deleteOneProduct = exports.getOneProductById = exports.createProduct = exports.getAllProducts = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getAllProducts = () => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield prisma.product.findMany();
    if (products)
        return products;
    return {
        message: 'error query',
    };
});
exports.getAllProducts = getAllProducts;
const createProduct = (createProductDto) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield prisma.product.create({
        data: createProductDto,
    });
    return product;
});
exports.createProduct = createProduct;
const getOneProductById = (paramId) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(paramId, 10);
    const product = yield prisma.product.findUnique({
        where: {
            id,
        },
    });
    if (product)
        return product;
    return null;
});
exports.getOneProductById = getOneProductById;
const deleteOneProduct = (paramId) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(paramId, 10);
    yield prisma.product.delete({
        where: {
            id,
        },
    });
});
exports.deleteOneProduct = deleteOneProduct;
const updateOneProduct = (paramId, updateProductDto) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(paramId, 10);
    const product = yield prisma.product.update({
        where: {
            id,
        },
        data: updateProductDto,
    });
    if (product)
        return product;
    return false;
});
exports.updateOneProduct = updateOneProduct;
