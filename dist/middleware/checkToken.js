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
const tokens_module_1 = require("../tokens/tokens.module");
const envConfig_1 = require("../envConfig");
const checkToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const tokenMaxAge = new Date(Date.now()
        + parseInt(envConfig_1.jwtDuration.slice(0, envConfig_1.jwtDuration.length - 1), 10) * 1000);
    let jwtToken = req.cookies.jwttoken;
    const refreshToken = req.cookies.refreshtoken;
    if (jwtToken) {
        yield (0, tokens_module_1.verifyJwtToken)(jwtToken);
        next();
    }
    else if (refreshToken) {
        jwtToken = yield (0, tokens_module_1.getAJwtToken)(refreshToken);
        if (jwtToken) {
            res.cookie('jwttoken', jwtToken, { expires: tokenMaxAge, httpOnly: true, sameSite: 'strict' });
            next();
        }
    }
    else {
        res.json({
            message: 'You are not logged in.',
        });
    }
});
exports.default = checkToken;
