const usersController = require('express').Router();


usersController.get('/', (req, res) => {
    res.send('Users Controller');
})


module.exports = usersController;