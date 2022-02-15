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
exports.logout = exports.login = exports.register = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const tokens_service_1 = require("../tokens/tokens.service");
const users_module_1 = require("../users/users.module");
const envConfig_1 = require("../envConfig");
const login = (loginUserDto, response) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, users_module_1.getOneUserByNameOrNull)(loginUserDto.username);
    if (user) {
        const res = yield bcrypt_1.default.compare(loginUserDto.password, user.password);
        if (res) {
            const refreshToken = yield (0, tokens_service_1.createRefreshToken)({ id: user.id, username: user.username });
            const token = jsonwebtoken_1.default.sign({ id: user.id, username: user.username }, envConfig_1.jwtSecret, { expiresIn: envConfig_1.jwtDuration });
            const tokenMaxAge = new Date(Date.now()
                + parseInt(envConfig_1.jwtDuration.slice(0, envConfig_1.jwtDuration.length - 1), 10) * 1000);
            const refreshMaxAge = new Date(Date.now()
                + parseInt(envConfig_1.refreshDuration.slice(0, envConfig_1.refreshDuration.length - 1), 10) * 1000);
            response.cookie('jwttoken', token, { expires: tokenMaxAge, httpOnly: true, sameSite: 'strict' });
            response.cookie('refreshtoken', refreshToken.refresh_token, { expires: refreshMaxAge, httpOnly: true, sameSite: 'strict' });
            return {
                message: 'success login',
            };
        }
        return {
            message: "The passwords didn't match",
        };
    }
    return {
        message: `There is no user with username ${loginUserDto.username}`,
    };
});
exports.login = login;
const register = (registerUserDto, response) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, users_module_1.getOneUserByNameOrNull)(registerUserDto.username);
    if (user) {
        return {
            message: 'User already registered.',
        };
    }
    yield (0, users_module_1.createUser)(Object.assign({}, registerUserDto));
    yield login(registerUserDto, response);
    return {
        message: 'User registered successfuly',
    };
});
exports.register = register;
const logout = (res) => __awaiter(void 0, void 0, void 0, function* () {
    res.cookie('jwttoken', '', { expires: new Date(+0), httpOnly: true, sameSite: 'strict' });
    res.cookie('refreshtoken', '', { expires: new Date(+0), httpOnly: true, sameSite: 'strict' });
});
exports.logout = logout;
