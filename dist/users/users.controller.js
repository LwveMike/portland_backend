"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const http_status_codes_1 = require("http-status-codes");
const users_service_1 = require("./users.service");
const usersController = (0, express_1.Router)();
usersController.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield (0, users_service_1.deleteOneUser)(id);
        res.status(http_status_codes_1.StatusCodes.ACCEPTED).json({
            message: `User with id ${id} was deleted successfuly.`,
        });
    }
    catch (error) {
        res.status(http_status_codes_1.StatusCodes.NO_CONTENT).json({
            message: `Error couldn't delete user with id ${id}.`,
            error,
        });
    }
}));
usersController.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const user = yield (0, users_service_1.updateOneUser)(id, req.body);
        if (user)
            res.status(http_status_codes_1.StatusCodes.ACCEPTED).json(user);
        else {
            res.status(http_status_codes_1.StatusCodes.NO_CONTENT).json({
                message: `User with id ${id} couldn't be updated.`,
            });
        }
    }
    catch (error) {
        res.status(http_status_codes_1.StatusCodes.NO_CONTENT).json({
            message: `Error couldn't update user with id ${id}.`,
            error,
        });
    }
}));
exports.default = usersController;
