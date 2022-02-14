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
exports.login = exports.register = void 0;
const tokens_service_1 = require("../tokens/tokens.service");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const users_module_1 = require("../users/users.module");
const register = (registerUserDto, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, users_module_1.getOneUserByNameOrNull)(registerUserDto.username);
        if (user) {
            return {
                message: 'Username already in use'
            };
        }
        else {
            const hashedPassword = yield bcrypt_1.default.hash(registerUserDto.password, 10);
            const newUser = yield (0, users_module_1.createUser)(Object.assign(Object.assign({}, registerUserDto), { password: hashedPassword }));
            try {
                const res = yield bcrypt_1.default.compare(registerUserDto.password, newUser.password);
                if (res) {
                    yield login(newUser, response);
                    return {
                        message: 'success'
                    };
                }
                return {
                    message: 'bad password'
                };
            }
            catch (error) {
                return {
                    message: 'Check Credentials',
                    error
                };
            }
        }
    }
    catch (error) {
        return {
            message: "Registration failed",
            error
        };
    }
});
exports.register = register;
const login = (loginUserDto, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, users_module_1.getOneUserByNameOrNull)(loginUserDto.username);
        if (user) {
            try {
                const res = yield bcrypt_1.default.compare(loginUserDto.password, user.password);
                if (res) {
                    const refreshToken = yield (0, tokens_service_1.createRefreshToken)({ id: user.id, username: user.username });
                    const token = yield jsonwebtoken_1.default.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_DURATION });
                    const tokenMaxAge = new Date(Date.now() + parseInt(process.env.JWT_DURATION.slice(0, process.env.JWT_DURATION.length - 1)) * 1000);
                    const refreshMaxAge = new Date(Date.now() + parseInt(process.env.REFRESH_DURATION.slice(0, process.env.REFRESH_DURATION.length - 1)) * 1000);
                    response.cookie('jwttoken', token, { expires: tokenMaxAge, httpOnly: true, sameSite: 'strict' });
                    response.cookie('refreshtoken', refreshToken.refresh_token, { expires: refreshMaxAge, httpOnly: true, sameSite: 'strict' });
                    return {
                        token,
                        refresh_token: refreshToken.refresh_token
                    };
                }
            }
            catch (error) {
                return {
                    message: 'Check Credentials',
                    error
                };
            }
        }
        return {
            message: `There is no user with username ${loginUserDto.username}`
        };
    }
    catch (error) {
        return {
            message: "Login Failed",
            error
        };
    }
});
exports.login = login;
