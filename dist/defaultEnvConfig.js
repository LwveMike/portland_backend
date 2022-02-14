"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultJwtSecret = void 0;
const defaultJwtSecret = process.env.JWT_SECRET || 'default-jwt-secret';
exports.defaultJwtSecret = defaultJwtSecret;
