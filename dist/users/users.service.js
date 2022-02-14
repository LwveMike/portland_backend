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
exports.getOneUserById = exports.getOneUserByNameOrNull = exports.createUser = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createUser = (createUserDto) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma.user.create({
        data: Object.assign(Object.assign({}, createUserDto), { role: client_1.Roles.user })
    });
    return user;
});
exports.createUser = createUser;
const getOneUserByNameOrNull = (username) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield prisma.user.findUnique({
            where: {
                username: username
            }
        });
        if (user)
            return user;
        else
            return null;
    }
    catch (error) {
        return null;
    }
});
exports.getOneUserByNameOrNull = getOneUserByNameOrNull;
const getOneUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield prisma.user.findUnique({
            where: {
                id: id
            }
        });
        if (user)
            return user;
        return null;
    }
    catch (error) {
        return null;
    }
});
exports.getOneUserById = getOneUserById;
