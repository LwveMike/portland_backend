"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usersController = (0, express_1.Router)();
usersController.get('/', (req, res) => {
    res.send('Users Controller');
});
exports.default = usersController;
