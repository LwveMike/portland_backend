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
exports.getUserData = exports.updateOneUser = exports.deleteOneUser = exports.getAllUsers = exports.getOneUserById = exports.getOneUserByNameOrNull = exports.createUser = void 0;
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma = new client_1.PrismaClient();
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield prisma.user.findMany();
    return users;
});
exports.getAllUsers = getAllUsers;
const createUser = (createUserDto) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = Object.assign(Object.assign({}, createUserDto), { password: yield bcrypt_1.default.hash(createUserDto.password, 10) });
    const user = yield prisma.user.create({
        data: Object.assign(Object.assign({}, userData), { role: client_1.Roles.user }),
    });
    return user;
});
exports.createUser = createUser;
const getOneUserByNameOrNull = (username) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma.user.findUnique({
        where: {
            username,
        },
    });
    if (user)
        return user;
    return null;
});
exports.getOneUserByNameOrNull = getOneUserByNameOrNull;
const getOneUserById = (paramId) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(paramId, 10);
    try {
        const user = yield prisma.user.findUnique({
            where: {
                id,
            },
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
const getUserData = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma.user.findUnique({
        where: {
            id,
        },
    });
    return user;
});
exports.getUserData = getUserData;
const deleteOneUser = (paramId) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(paramId, 10);
    yield prisma.user.delete({
        where: {
            id,
        },
    });
});
exports.deleteOneUser = deleteOneUser;
const updateOneUser = (paramId, updateUserDto) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(paramId, 10);
    const user = yield prisma.user.update({
        where: {
            id,
        },
        data: updateUserDto,
    });
    if (user)
        return user;
    return false;
});
exports.updateOneUser = updateOneUser;
