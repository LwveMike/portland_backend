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
const products_service_1 = require("./products.service");
const productsController = (0, express_1.Router)();
productsController.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield (0, products_service_1.getAllProducts)();
        if (products)
            res.json(products);
    }
    catch (error) {
        res.json({
            message: "Couldn't retrieve all products.",
            error
        });
    }
}));
productsController.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const product = yield (0, products_service_1.getOneProduct)(id);
        res.json(product);
    }
    catch (error) {
        res.json({
            message: `Couldn't retrieve the item with id ${id}.`,
            error
        });
    }
}));
productsController.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield (0, products_service_1.createProduct)(req.body);
    res.json(product);
}));
productsController.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const message = yield (0, products_service_1.deleteOneProduct)(id);
    res.json(message);
}));
productsController.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const product = yield (0, products_service_1.updateOneProduct)(id, req.body);
    res.json(product);
}));
exports.default = productsController;
