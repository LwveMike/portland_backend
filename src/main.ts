import bodyParser from 'body-parser';
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import morgan from 'morgan';
import { createServer } from 'http';
import { Server } from 'socket.io';

import { productsController } from './products/products.module';
import { usersController } from './users/users.module';
import { authController } from './auth/auth.module';
import { tokensController } from './tokens/tokens.module';
import Logger from './winston.config';
import checkTokens from './middleware/checkToken';
import usersProductsController from './users.products/users.products.controller';
import checkRole from './middleware/checkRole';
import SocketEvents from './socketEvents';
import { getOneProductById } from './products/products.service';
import ProductInfo from './users.products/types/productInfo';

require('dotenv').config();

const app = express();

const http = createServer(app);
const io = new Server(http, {
  cors: {
    origin: 'http://localhost:8080',
  },
});

app.use(cors({
  origin: 'http://localhost:8080',
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

io.on(SocketEvents.CONNECTION, (socket) => {
  socket.on(SocketEvents.CREATE_PRODUCT, async (productInfo: ProductInfo) => {
    const product = await getOneProductById(productInfo.productId);
    io.sockets.emit(SocketEvents.GET_PRODUCT, product);
  });

  socket.on(SocketEvents.DELETE_PRODUCT, async (productInfo: ProductInfo) => {
    const productId = parseInt(productInfo.productId, 10);
    io.sockets.emit(SocketEvents.PRODUCT_DELETED, productId);
  });

  socket.on(SocketEvents.UPDATE_PRODUCT, async (productInfo: ProductInfo) => {
    const id = productInfo.productId.toString();
    const product = await getOneProductById(id);
    io.sockets.emit(SocketEvents.PRODUCT_UPDATED, product);
  });
});

http.listen(process.env.PORT, () => {
  Logger.log({ level: 'info', message: `http listens to ${process.env.PORT}` });
});

export default io;
