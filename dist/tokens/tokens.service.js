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
exports.getUserDataFromToken = exports.verifyJwtToken = exports.clearUnusedRefreshTokens = exports.removeExpiredTokenFromDb = exports.getAJwtToken = exports.getOneRefreshTokenOrNull = exports.verifyRefreshToken = exports.getAllRefreshTokens = exports.createRefreshToken = void 0;
const client_1 = require("@prisma/client");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const users_module_1 = require("../users/users.module");
const envConfig_1 = require("../envConfig");
const prisma = new client_1.PrismaClient();
const createRefreshToken = (createRefreshTokenDto) => __awaiter(void 0, void 0, void 0, function* () {
    const token = prisma.tokens.create({
        data: {
            refresh_token: jsonwebtoken_1.default.sign(createRefreshTokenDto, envConfig_1.refreshSecret, { expiresIn: envConfig_1.refreshDuration }),
        },
    });
    return token;
});
exports.createRefreshToken = createRefreshToken;
const getAllRefreshTokens = () => __awaiter(void 0, void 0, void 0, function* () {
    const tokens = yield prisma.tokens.findMany();
    return tokens;
});
exports.getAllRefreshTokens = getAllRefreshTokens;
const getOneRefreshTokenOrNull = (token) => __awaiter(void 0, void 0, void 0, function* () {
    const dbToken = yield prisma.tokens.findFirst({
        where: {
            id: token.id,
        },
    });
    if (dbToken)
        return dbToken;
    return null;
});
exports.getOneRefreshTokenOrNull = getOneRefreshTokenOrNull;
const removeExpiredTokenFromDb = (token) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.tokens.delete({
        where: {
            id: token.id,
        },
    });
});
exports.removeExpiredTokenFromDb = removeExpiredTokenFromDb;
const verifyRefreshToken = (refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
    const dbToken = yield getOneRefreshTokenOrNull(refreshToken);
    if (dbToken) {
        try {
            jsonwebtoken_1.default.verify(refreshToken.refresh_token, envConfig_1.refreshSecret);
            return true;
        }
        catch (error) {
            yield removeExpiredTokenFromDb(dbToken);
            return false;
        }
    }
    else
        return false;
});
exports.verifyRefreshToken = verifyRefreshToken;
const getAJwtToken = (refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
    const valid = yield verifyRefreshToken(refreshToken);
    if (refreshToken && valid) {
        try {
            const decoded = jsonwebtoken_1.default.verify(refreshToken.refresh_token, envConfig_1.refreshSecret);
            const { id, username } = decoded;
            const jwtToken = yield jsonwebtoken_1.default.sign({ id, username }, envConfig_1.jwtSecret, { expiresIn: envConfig_1.jwtDuration });
            return jwtToken;
        }
        catch (error) {
            return false;
        }
    }
    else
        return false;
});
exports.getAJwtToken = getAJwtToken;
const verifyJwtToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield jsonwebtoken_1.default.verify(token, envConfig_1.jwtSecret);
        return true;
    }
    catch (error) {
        return false;
    }
});
exports.verifyJwtToken = verifyJwtToken;
const clearUnusedRefreshTokens = () => __awaiter(void 0, void 0, void 0, function* () {
    const tokens = yield getAllRefreshTokens();
    for (let i = 0; i < tokens.length; i += 1) {
        verifyRefreshToken(tokens[i]);
    }
    Promise.all(tokens);
    // for (const token of tokens) {
    //   await verifyRefreshToken(token);
    // }
});
exports.clearUnusedRefreshTokens = clearUnusedRefreshTokens;
const getUserDataFromToken = (jwtToken) => __awaiter(void 0, void 0, void 0, function* () {
    const decoded = jsonwebtoken_1.default.verify(jwtToken, envConfig_1.jwtSecret);
    const { id } = decoded;
    try {
        const user = yield (0, users_module_1.getUserData)(id);
        const sendUserDto = {
            id: user.id,
            username: user.username,
            avatar: user.avatar,
        };
        return sendUserDto;
    }
    catch (error) {
        return {
            message: `No user with id ${id}.`,
            error,
        };
    }
});
exports.getUserDataFromToken = getUserDataFromToken;
