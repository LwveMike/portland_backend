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
exports.tokensController = void 0;
const express_1 = require("express");
const tokens_service_1 = require("./tokens.service");
const tokensController = (0, express_1.Router)();
exports.tokensController = tokensController;
tokensController.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tokens = yield (0, tokens_service_1.getAllRefreshTokens)();
    res.json(tokens);
}));
tokensController.post('/verify-refresh', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const verified = yield (0, tokens_service_1.verifyRefreshToken)(req.body.token);
    res.json(verified);
}));
tokensController.get('/clear', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, tokens_service_1.clearUnusedRefreshTokens)();
    res.json({ message: 'success' });
}));
