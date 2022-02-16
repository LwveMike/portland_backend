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
const express_1 = require("express");
const http_status_codes_1 = require("http-status-codes");
const products_service_1 = require("./products.service");
const productsController = (0, express_1.Router)();
productsController.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield (0, products_service_1.getAllProducts)();
        if (products)
            res.status(http_status_codes_1.StatusCodes.OK).json(products);
    }
    catch (error) {
        res.status(http_status_codes_1.StatusCodes.NO_CONTENT).json({
            message: "Couldn't retrieve all products.",
            error,
        });
    }
}));
productsController.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const product = yield (0, products_service_1.getOneProductById)(id);
        if (product)
            res.status(http_status_codes_1.StatusCodes.OK).json(product);
        else {
            res.status(http_status_codes_1.StatusCodes.NO_CONTENT).json({
                message: `There is no product with id of ${id}`,
            });
        }
    }
    catch (error) {
        res.status(http_status_codes_1.StatusCodes.NO_CONTENT).json({
            message: `Couldn't retrieve the product with id ${id}.`,
            error,
        });
    }
}));
productsController.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield (0, products_service_1.createProduct)(req.body);
        res.status(http_status_codes_1.StatusCodes.CREATED).json(product);
    }
    catch (error) {
        res.status(http_status_codes_1.StatusCodes.NOT_ACCEPTABLE).json({
            message: "The product couldn't be added to the DB.",
            error,
        });
    }
}));
productsController.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield (0, products_service_1.deleteOneProduct)(id);
        res.status(http_status_codes_1.StatusCodes.ACCEPTED).json({
            message: `The product with id ${id} was deleted successfuly.`,
        });
    }
    catch (error) {
        res.status(http_status_codes_1.StatusCodes.NO_CONTENT).json({
            message: 'Error while trying to delete product from DB.',
            error,
        });
    }
}));
productsController.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const product = yield (0, products_service_1.updateOneProduct)(id, req.body);
        if (product)
            res.status(http_status_codes_1.StatusCodes.OK).json(product);
        else {
            res.status(http_status_codes_1.StatusCodes.NO_CONTENT).json({
                message: `The product with id ${id} couldn't be updated.`,
            });
        }
    }
    catch (error) {
        res.status(http_status_codes_1.StatusCodes.NO_CONTENT).json({
            message: `Error while trying to update product with id ${id}.`,
            error,
        });
    }
}));
exports.default = productsController;
