"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserData = exports.getOneUserById = exports.getOneUserByNameOrNull = exports.createUser = exports.usersController = void 0;
const users_controller_1 = __importDefault(require("./users.controller"));
exports.usersController = users_controller_1.default;
const users_service_1 = require("./users.service");
Object.defineProperty(exports, "createUser", { enumerable: true, get: function () { return users_service_1.createUser; } });
Object.defineProperty(exports, "getOneUserByNameOrNull", { enumerable: true, get: function () { return users_service_1.getOneUserByNameOrNull; } });
Object.defineProperty(exports, "getOneUserById", { enumerable: true, get: function () { return users_service_1.getOneUserById; } });
Object.defineProperty(exports, "getUserData", { enumerable: true, get: function () { return users_service_1.getUserData; } });
