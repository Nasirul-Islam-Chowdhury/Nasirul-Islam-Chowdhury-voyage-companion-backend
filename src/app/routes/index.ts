import express from "express";
import { userRoutes } from "../modules/User/user.routes";
import { AuthRoutes } from "../modules/Auth/auth.routes";
import { ProfileRoutes } from "../modules/Profile/profile.route";
import { TravelRoutes } from "../modules/Trip/trip.route";
import { TripRequestRoutes } from "../modules/TripRequest/tripRequest.route";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/user",
    route: userRoutes,
  },

  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/profile",
    route: ProfileRoutes,
  },
  {
    path: "/trips",
    route: TravelRoutes,
  },  
  {
    path: "/trip-request",
    route: TripRequestRoutes,
  },  
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
