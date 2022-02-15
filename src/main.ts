require('dotenv').config();
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import morgan from 'morgan';

import { productsController } from './products/products.module';
import { usersController } from './users/users.module';
import { authController } from './auth/auth.module';
import { tokensController } from './tokens/tokens.module';
import { checkToken } from './middleware/checkToken';


const app = express();

app.use(cors({
    origin: "http://localhost:3001",
    credentials: true
}));

app.use(bodyParser.json());
app.use(cookieParser());
app.use(morgan('tiny'));


app.use('/products', checkToken, productsController);
app.use('/users', checkToken,  usersController);
app.use('/auth', authController);
app.use('/tokens', checkToken,  tokensController);

app.listen(process.env.PORT, () => {
    console.log(`Server listening on port: ${process.env.PORT}`);
});