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
exports.buddyRequestServices = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const createBuddyRequest = (payload, tripId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.travelRequest.create({
        data: {
            tripId,
            userId: payload.userId,
        },
    });
    return result;
});
const getAllBuddiesForSingletrip = (tripId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.travelRequest.findMany({
        where: {
            tripId: tripId,
        },
        include: {
            user: {
                select: {
                    id: true,
                    username: true,
                    email: true,
                },
            },
        },
    });
    return result;
});
//update status
const updateBuddyRequest = (payload, id) => __awaiter(void 0, void 0, void 0, function* () {
    //at first find buddyrequest exists or not
    const exsitingBuddy = yield prisma_1.default.travelRequest.findUnique({
        where: {
            id,
            tripId: payload.tripId,
        },
    });
    if (!exsitingBuddy) {
        throw new ApiError_1.default(404, "Your requested buddyId and tripId doesn't match");
    }
    const result = yield prisma_1.default.travelRequest.update({
        where: {
            id,
            tripId: payload.tripId,
        },
        data: {
            status: payload.status,
        },
    });
    return result;
});
exports.buddyRequestServices = {
    createBuddyRequest,
    getAllBuddiesForSingletrip,
    updateBuddyRequest,
};
