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
router.get("/", 
  auth(UserRole.ADMIN, UserRole.USER),
   tripController.getAllTrips);

router.delete("/:id", 
  auth(UserRole.ADMIN),
   tripController.deleteTrip);

export const TravelRoutes = router;
