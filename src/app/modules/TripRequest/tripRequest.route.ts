import { Router } from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { TripRequestController } from "./tripRequest.controller";
import { buddyValidation } from "./tripRequest.validation";

const router = Router();
router.post(
  "/trip/:tripId/request",
  auth(),
  TripRequestController.createBuddyRequest
);

router.get(
  "/travel-buddies/:tripId",
  auth(),
  TripRequestController.getBuddyRequest
);
router.put(
  "/travel-buddies/:buddyId/respond",
  auth(),
  validateRequest(buddyValidation.buddyRequest),
  TripRequestController.updateBuddyRequest
);
export const buddyRoutes = router;
