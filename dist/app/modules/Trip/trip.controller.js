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
exports.tripController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const trip_constant_1 = require("./trip.constant");
const pick_1 = __importDefault(require("../../../shared/pick"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const trip_service_1 = require("./trip.service");
const createTrip = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const result = yield trip_service_1.tripServices.createTrip(req.body, user);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 201,
        message: "Trip created successfully",
        data: result,
    });
}));
const getSingleTrip = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield trip_service_1.tripServices.getSingleTrip(req.params.id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 201,
        message: "Trip Retrieved successfully",
        data: result,
    });
}));
//get all trip
const getAllTrips = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, trip_constant_1.tripFilterableFields);
    const options = (0, pick_1.default)(req.query, ["limit", "page", "sortBy", "sortOrder"]);
    const result = yield trip_service_1.tripServices.getAllTrips(filters, options);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Trips retrieved successfully",
        meta: result.meta,
        data: result.data,
    });
}));
const getMyTrips = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req === null || req === void 0 ? void 0 : req.user;
    const result = yield trip_service_1.tripServices.getMyTrips(user);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Trips retrieved successfully",
        data: result,
    });
}));
const deleteTrip = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield trip_service_1.tripServices.deleteTrip(req.params.id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Trips retrieved successfully",
        data: result,
    });
}));
// const getSingleTrip =
exports.tripController = {
    createTrip,
    getAllTrips,
    deleteTrip,
    getSingleTrip,
    getMyTrips,
};
