"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = exports.authController = void 0;
const auth_controller_1 = __importDefault(require("./auth.controller"));
exports.authController = auth_controller_1.default;
const auth_service_1 = require("./auth.service");
Object.defineProperty(exports, "register", { enumerable: true, get: function () { return auth_service_1.register; } });
