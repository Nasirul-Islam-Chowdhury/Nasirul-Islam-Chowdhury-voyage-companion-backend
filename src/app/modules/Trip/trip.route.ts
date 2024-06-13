import { Router } from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { tripValidation } from "./trip.validation";
import { tripController } from "./trip.controller";
import { UserRole } from "@prisma/client";

const router = Router();

router.post(
  "/",
  auth(UserRole.ADMIN, UserRole.USER),
  validateRequest(tripValidation.createTrip),
  tripController.createTrip
);
router.get(
  "/",
  tripController.getAllTrips
);
router.get("/my-trips",
  auth(UserRole.ADMIN, UserRole.USER),
  tripController.getMyTrips);

router.get("/:id", tripController.getSingleTrip);

router.delete("/:id",   auth(UserRole.ADMIN, UserRole.USER), tripController.deleteTrip);

export const TravelRoutes = router;
