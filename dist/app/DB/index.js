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
const client_1 = require("@prisma/client");
const prisma_1 = __importDefault(require("../../shared/prisma"));
const config_1 = __importDefault(require("../../config"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const seedAdmin = () => __awaiter(void 0, void 0, void 0, function* () {
    const hashedPassword = yield bcrypt_1.default.hash(config_1.default.admin_password, 12);
    const admin = {
        email: 'nasir@gmail.com',
        username: "nasir",
        password: hashedPassword,
        role: client_1.UserRole.ADMIN,
        status: client_1.UserStatus.ACTIVE,
    };
    //when database is connected, we will check is there any user who is super admin
    const isSuperAdminExits = yield prisma_1.default.user.findUnique({ where: {
            role: client_1.UserRole.ADMIN,
            username: admin.username,
            email: admin.email
        } });
    if (!isSuperAdminExits) {
        yield prisma_1.default.user.create({ data: admin });
    }
});
exports.default = seedAdmin;
