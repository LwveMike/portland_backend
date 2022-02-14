"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const products_module_1 = require("./products/products.module");
const users_module_1 = require("./users/users.module");
const auth_module_1 = require("./auth/auth.module");
const tokens_module_1 = require("./tokens/tokens.module");
const defaultEnvConfig_1 = require("./defaultEnvConfig");
console.log(defaultEnvConfig_1.defaultJwtSecret);
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: "http://localhost:3001",
    credentials: true
}));
app.use(body_parser_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use('/products', products_module_1.productsController);
app.use('/users', users_module_1.usersController);
app.use('/auth', auth_module_1.authController);
app.use('/tokens', tokens_module_1.tokensController);
app.listen(process.env.PORT, () => {
    console.log(`Server listening on port: ${process.env.PORT}`);
});
