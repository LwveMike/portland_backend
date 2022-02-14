"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productsController = exports.createProduct = exports.getAllProducts = void 0;
const products_service_1 = require("./products.service");
Object.defineProperty(exports, "getAllProducts", { enumerable: true, get: function () { return products_service_1.getAllProducts; } });
Object.defineProperty(exports, "createProduct", { enumerable: true, get: function () { return products_service_1.createProduct; } });
const products_controller_1 = __importDefault(require("./products.controller"));
exports.productsController = products_controller_1.default;
