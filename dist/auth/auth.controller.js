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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const http_status_codes_1 = require("http-status-codes");
const auth_service_1 = require("./auth.service");
const tokens_module_1 = require("../tokens/tokens.module");
const checkToken_1 = __importDefault(require("../middleware/checkToken"));
const authController = (0, express_1.Router)();
authController.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const message = yield (0, auth_service_1.register)(req.body, res);
        res.status(http_status_codes_1.StatusCodes.CREATED).json(message);
    }
    catch (error) {
        res.status(http_status_codes_1.StatusCodes.CONFLICT).json({
            message: "Error User couldn't be registered.",
            error,
        });
    }
}));
authController.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const message = yield (0, auth_service_1.login)(req.body, res);
        res.status(http_status_codes_1.StatusCodes.OK).json(message);
    }
    catch (error) {
        res.status(http_status_codes_1.StatusCodes.CONFLICT).json({
            message: "Error User couldn't login",
            error,
        });
    }
}));
authController.delete('/logout', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, auth_service_1.logout)(res);
        res.status(http_status_codes_1.StatusCodes.OK).json({
            message: 'You logged out.',
        });
    }
    catch (error) {
        res.status(http_status_codes_1.StatusCodes.CONFLICT).json({
            message: 'Error logging out.',
            error,
        });
    }
}));
authController.get('/get-user-data', checkToken_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const jwtToken = req.cookies.jwttoken;
    try {
        const userData = yield (0, tokens_module_1.getUserDataFromToken)(jwtToken);
        res.status(http_status_codes_1.StatusCodes.OK).json(userData);
    }
    catch (error) {
        res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
            message: "Don't have acces to return user data.",
            error,
        });
    }
}));
exports.default = authController;
