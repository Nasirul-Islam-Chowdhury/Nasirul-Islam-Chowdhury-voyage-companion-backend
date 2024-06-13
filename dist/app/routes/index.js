"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_routes_1 = require("../modules/User/user.routes");
const auth_routes_1 = require("../modules/Auth/auth.routes");
const profile_route_1 = require("../modules/Profile/profile.route");
const trip_route_1 = require("../modules/Trip/trip.route");
const tripRequest_route_1 = require("../modules/TripRequest/tripRequest.route");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: "/user",
        route: user_routes_1.userRoutes,
    },
    {
        path: "/auth",
        route: auth_routes_1.AuthRoutes,
    },
    {
        path: "/profile",
        route: profile_route_1.ProfileRoutes,
    },
    {
        path: "/trips",
        route: trip_route_1.TravelRoutes,
    },
    {
        path: "/trip-request",
        route: tripRequest_route_1.TripRequestRoutes,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
