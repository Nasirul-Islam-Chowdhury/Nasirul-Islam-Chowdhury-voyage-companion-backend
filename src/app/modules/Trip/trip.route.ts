import { Router } from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { tripValidation } from "./trip.validation";
import { tripController } from "./trip.controller";

const router = Router();

router.post(
  "/",
  auth(),
  validateRequest(tripValidation.createTrip),
  tripController.createTrip
);
router.get("/", auth(), tripController.getAllTrips);

export const TravelRoutes = router;
