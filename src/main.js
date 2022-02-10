const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const { productsController } = require('./products/products.module');
const { usersController } = require('./users/users.module');
const { authController } = require('./auth/auth.module')

const app = express();
app.use(bodyParser.json());
app.use(cors());


app.use('/products', productsController);
app.use('/users', usersController);
app.use('/auth', authController);



app.listen(process.env.PORT, () => {
    console.log(`Server listening on port: ${process.env.PORT}`);
});