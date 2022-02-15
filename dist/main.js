"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const products_module_1 = require("./products/products.module");
const users_module_1 = require("./users/users.module");
const auth_module_1 = require("./auth/auth.module");
const tokens_module_1 = require("./tokens/tokens.module");
const checkToken_1 = __importDefault(require("./middleware/checkToken"));
require('dotenv').config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: 'http://localhost:3001',
    credentials: true,
}));
app.use(body_parser_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, morgan_1.default)('tiny'));
app.use('/products', checkToken_1.default, products_module_1.productsController);
app.use('/users', checkToken_1.default, users_module_1.usersController);
app.use('/auth', auth_module_1.authController);
app.use('/tokens', checkToken_1.default, tokens_module_1.tokensController);
app.listen(process.env.PORT, () => { });
