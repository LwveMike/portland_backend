import bodyParser from 'body-parser';
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import morgan from 'morgan';

import { productsController } from './products/products.module';
import { usersController } from './users/users.module';
import { authController } from './auth/auth.module';
import { tokensController } from './tokens/tokens.module';
import Logger from './winston.config';
import checkTokens from './middleware/checkToken';
import usersProductsController from './users.products/users.products.controller';
import checkRole from './middleware/checkRole';

require('dotenv').config();

const app = express();

app.use(cors({
  origin: 'http://localhost:3001',
  credentials: true,
}));

app.use(bodyParser.json());
app.use(cookieParser());
app.use(morgan('tiny'));

app.use('/products', productsController);
app.use('/users', checkTokens, checkRole, usersController);
app.use('/auth', authController);
app.use('/tokens', checkTokens, checkRole, tokensController);
app.use('/users-products', checkTokens, usersProductsController);

app.listen(process.env.PORT, () => {
  Logger.log({ level: 'info', message: `Express server started on port ${process.env.PORT}` });
});
