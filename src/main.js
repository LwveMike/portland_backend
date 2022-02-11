const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const { productsController } = require('./products/products.module');
const { usersController } = require('./users/users.module');
const { authController } = require('./auth/auth.module');
const { tokensController } = require('./tokens/tokens.module');

const { checkToken } = require('./middleware/checkToken');

const app = express();
app.use(cors({
    origin: "http://localhost:3001",
    credentials: true
}));
app.use(bodyParser.json());
app.use(cookieParser());


app.use('/products', checkToken, productsController);
app.use('/users', usersController);
app.use('/auth', authController);
app.use('/tokens', tokensController);



// test

// app.get('/', async (req, res) => {

//     try {
//         const token = await jwt.sign({ name: 'jamal' }, process.env.REFRESH_SECRET, { expiresIn: process.env.REFRESH_DURATION });
//         res.json(token);

//     } catch (error) {
//         res.json(error);
//     }



// });


app.listen(process.env.PORT, () => {
    console.log(`Server listening on port: ${process.env.PORT}`);
});