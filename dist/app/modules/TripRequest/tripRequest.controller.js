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
exports.TripRequestController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const tripRequest_service_1 = require("./tripRequest.service");
//create buddyRequest
const createBuddyRequest = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const result = yield tripRequest_service_1.buddyRequestServices.createBuddyRequest(req.params.tripId, user);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 201,
        message: "Travel buddy request sent successfully",
        data: result,
    });
}));
const deleteTripRequest = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield tripRequest_service_1.buddyRequestServices.deleteTripRequest(req.params.id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 201,
        message: "Travel buddy request deleted successfully",
        data: result,
    });
}));
//get all buddyRequest
const getBuddyRequest = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield tripRequest_service_1.buddyRequestServices.getAllBuddiesForSingletrip(req.params.tripId);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Potential travel buddies retrieved successfully",
        data: result,
    });
}));
const getMyRequest = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const result = yield tripRequest_service_1.buddyRequestServices.getMyRequest(user === null || user === void 0 ? void 0 : user.userId);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "My Request retrieved successfully",
        data: result,
    });
}));
const getMyPostedTripsRequest = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const result = yield tripRequest_service_1.buddyRequestServices.getMyPostedTripsRequest(user === null || user === void 0 ? void 0 : user.userId);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "My Request retrieved successfully",
        data: result,
    });
}));
//update buddy request
const updateBuddyRequest = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield tripRequest_service_1.buddyRequestServices.updateBuddyRequest(req.body, id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Travel buddy request responded successfully",
        data: result,
    });
}));
exports.TripRequestController = {
    createBuddyRequest,
    getBuddyRequest,
    updateBuddyRequest,
    getMyRequest,
    deleteTripRequest,
    getMyPostedTripsRequest
};
