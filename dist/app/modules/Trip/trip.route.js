"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TravelRoutes = void 0;
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const trip_validation_1 = require("./trip.validation");
const trip_controller_1 = require("./trip.controller");
const client_1 = require("@prisma/client");
const router = (0, express_1.Router)();
router.post("/", (0, auth_1.default)(client_1.UserRole.ADMIN, client_1.UserRole.USER), (0, validateRequest_1.default)(trip_validation_1.tripValidation.createTrip), trip_controller_1.tripController.createTrip);
router.get("/", trip_controller_1.tripController.getAllTrips);
router.get("/my-trips", (0, auth_1.default)(client_1.UserRole.ADMIN, client_1.UserRole.USER), trip_controller_1.tripController.getMyTrips);
router.get("/:id", trip_controller_1.tripController.getSingleTrip);
router.delete("/:id", (0, auth_1.default)(client_1.UserRole.ADMIN, client_1.UserRole.USER), trip_controller_1.tripController.deleteTrip);
exports.TravelRoutes = router;
