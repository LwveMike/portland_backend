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
exports.updateOneProduct = exports.deleteOneProduct = exports.getOneProduct = exports.createProduct = exports.getAllProducts = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getAllProducts = () => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield prisma.product.findMany();
    return products;
});
exports.getAllProducts = getAllProducts;
const createProduct = (createProductDto) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield prisma.product.create({
        data: createProductDto
    });
    return product;
});
exports.createProduct = createProduct;
const getOneProduct = (paramId) => __awaiter(void 0, void 0, void 0, function* () {
    let id = parseInt(paramId);
    const product = yield prisma.product.findUnique({
        where: {
            id: id
        }
    });
    if (product)
        return product;
});
exports.getOneProduct = getOneProduct;
const deleteOneProduct = (paramId) => __awaiter(void 0, void 0, void 0, function* () {
    let id = parseInt(paramId);
    const product = yield prisma.product.delete({
        where: {
            id: id
        }
    });
});
exports.deleteOneProduct = deleteOneProduct;
const updateOneProduct = (paramId, updateProductDto) => __awaiter(void 0, void 0, void 0, function* () {
    let id = parseInt(paramId);
    const product = yield prisma.product.update({
        where: {
            id
        },
        data: updateProductDto
    });
    if (product)
        return product;
});
exports.updateOneProduct = updateOneProduct;
