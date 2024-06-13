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
const createBuddyRequest = (tripId, user) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield prisma_1.default.travelRequest.findFirst({
        where: {
            tripId: tripId,
            userId: user.userId,
        },
    });
    // if (isExist) {
    //   throw new ApiError(500, "Request already exists");
    // }
    const result = yield prisma_1.default.travelRequest.create({
        data: {
            tripId,
            userId: user.userId,
        },
        include: {
            user: true,
            trip: true,
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
const updateBuddyRequest = (payload, id) => __awaiter(void 0, void 0, void 0, function* () {
    const exsitingBuddy = yield prisma_1.default.travelRequest.findUnique({
        where: {
            id,
        },
    });
    if (!exsitingBuddy) {
        throw new ApiError_1.default(404, "Your requested buddyId and tripId doesn't match");
    }
    const result = yield prisma_1.default.travelRequest.update({
        where: {
            id,
        },
        data: {
            status: payload.status,
        },
    });
    return result;
});
const getMyRequest = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.travelRequest.findMany({
        where: { userId: id },
        include: { trip: true },
    });
    return result;
});
const getMyPostedTripsRequest = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.travelRequest.findMany({
        where: {
            trip: {
                userId: id,
            },
        },
        include: { trip: true, user: true },
    });
    return result;
});
const deleteTripRequest = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.travelRequest.delete({ where: { id: id } });
    return result;
});
exports.buddyRequestServices = {
    createBuddyRequest,
    getAllBuddiesForSingletrip,
    updateBuddyRequest,
    getMyRequest,
    deleteTripRequest,
    getMyPostedTripsRequest,
};
