const usersController = require('./users.controller');
const { createUser, getOneUserByNameOrNull } = require('./users.service')



module.exports = {
    usersController,
    createUser,
    getOneUserByNameOrNull
}