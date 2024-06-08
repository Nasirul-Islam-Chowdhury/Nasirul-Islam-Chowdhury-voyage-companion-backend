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
exports.profileServices = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
//get user profile by token
const getUserProfile = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.user.findUnique({
        where: {
            email: user.email,
            id: user.id,
        },
        select: {
            id: true,
            email: true,
            username: true,
            createdAt: true,
            updatedAt: true,
        },
    });
    return result;
});
//update profile
const updateProfile = (user, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.user.update({
        where: {
            id: user.id,
            email: user.email,
        },
        data: Object.assign({}, payload),
        select: {
            id: true,
            email: true,
            username: true,
            createdAt: true,
            updatedAt: true,
        },
    });
    return result;
});
exports.profileServices = {
    getUserProfile,
    updateProfile,
};
