"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buddyRoutes = void 0;
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const tripRequest_controller_1 = require("./tripRequest.controller");
const tripRequest_validation_1 = require("./tripRequest.validation");
const router = (0, express_1.Router)();
router.post("/trip/:tripId/request", (0, auth_1.default)(), tripRequest_controller_1.TripRequestController.createBuddyRequest);
router.get("/travel-buddies/:tripId", (0, auth_1.default)(), tripRequest_controller_1.TripRequestController.getBuddyRequest);
router.put("/travel-buddies/:buddyId/respond", (0, auth_1.default)(), (0, validateRequest_1.default)(tripRequest_validation_1.buddyValidation.buddyRequest), tripRequest_controller_1.TripRequestController.updateBuddyRequest);
exports.buddyRoutes = router;
