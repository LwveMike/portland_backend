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
exports.verifyJwtToken = exports.clearUnusedRefreshTokens = exports.removeExpiredTokenFromDb = exports.getAJwtToken = exports.getOneRefreshTokenOrNull = exports.verifyRefreshToken = exports.getAllRefreshTokens = exports.createRefreshToken = void 0;
const client_1 = require("@prisma/client");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma = new client_1.PrismaClient();
const createRefreshToken = (createRefreshTokenDto) => __awaiter(void 0, void 0, void 0, function* () {
    const token = prisma.tokens.create({
        data: {
            refresh_token: yield jsonwebtoken_1.default.sign(createRefreshTokenDto, process.env.REFRESH_SECRET, { expiresIn: process.env.REFRESH_DURATION })
        }
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
    try {
        const dbToken = yield prisma.tokens.findFirst({
            where: {
                id: token.id
            }
        });
        if (dbToken)
            return dbToken;
        else
            return null;
    }
    catch (error) {
        return null;
    }
});
exports.getOneRefreshTokenOrNull = getOneRefreshTokenOrNull;
const verifyRefreshToken = (refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dbToken = yield getOneRefreshTokenOrNull(refreshToken);
        if (dbToken) {
            try {
                yield jsonwebtoken_1.default.verify(refreshToken.refresh_token, process.env.REFRESH_SECRET);
                return true;
            }
            catch (error) {
                if (error.name === "TokenExpiredError") {
                    yield removeExpiredTokenFromDb(dbToken);
                    return false;
                }
                return false;
            }
        }
        else {
            return false;
        }
    }
    catch (error) {
        return false;
    }
});
exports.verifyRefreshToken = verifyRefreshToken;
const removeExpiredTokenFromDb = (token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma.tokens.delete({
            where: {
                id: token.id
            }
        });
    }
    catch (error) {
        return false;
    }
});
exports.removeExpiredTokenFromDb = removeExpiredTokenFromDb;
const getAJwtToken = (refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const valid = yield verifyRefreshToken(refreshToken);
        if (refreshToken && valid) {
            const decoded = jsonwebtoken_1.default.verify(refreshToken.refresh_token, process.env.REFRESH_SECRET);
            const { id, username } = decoded;
            const jwtToken = yield jsonwebtoken_1.default.sign({ id, username }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_DURATION });
            return jwtToken;
        }
        else {
            return false;
        }
    }
    catch (error) {
        return false;
    }
});
exports.getAJwtToken = getAJwtToken;
const verifyJwtToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        return true;
    }
    catch (error) {
        return false;
    }
});
exports.verifyJwtToken = verifyJwtToken;
const clearUnusedRefreshTokens = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tokens = yield getAllRefreshTokens();
        for (let token of tokens) {
            yield verifyRefreshToken(token);
        }
    }
    catch (error) {
        return {
            message: "Unused Refresh Tokens couldn't be cleared",
            error
        };
    }
});
exports.clearUnusedRefreshTokens = clearUnusedRefreshTokens;
