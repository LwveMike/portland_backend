const authController = require('express').Router();
const bcrypt = require('bcrypt');

const { register, login } = require('./auth.service');

authController.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const registerUserDto = {
        username,
        password
    }
    const user = await register(registerUserDto, res);

    res.json(user);
})

authController.post('/login', async (req, res) => {

    const { username, password } = req.body;

    const loginUserDto = {
        username,
        password
    }

    const user = await login(loginUserDto, res);

    res.json(user);

})


module.exports = authController;