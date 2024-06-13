import { Router } from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { TripRequestController } from "./tripRequest.controller";
import { buddyValidation } from "./tripRequest.validation";
import { UserRole } from "@prisma/client";

const router = Router();
router.post(
  "/:tripId",
  auth(UserRole.USER, UserRole.ADMIN),
  TripRequestController.createBuddyRequest
);

router.get(
  "/travel-buddies/:tripId",
  auth(UserRole.USER, UserRole.ADMIN),
  TripRequestController.getBuddyRequest
);

router.get(
  "/my-requests",
  auth(UserRole.USER, UserRole.ADMIN),
  TripRequestController.getMyRequest
);
router.get(
  "/my-posted-trips-requests",
  auth(UserRole.USER, UserRole.ADMIN),
  TripRequestController.getMyPostedTripsRequest
);

router.delete(
  "/delete/:id",
  auth(UserRole.USER, UserRole.ADMIN),
  TripRequestController.deleteTripRequest
);

router.patch(
  "/:id/respond",
  auth(UserRole.USER, UserRole.ADMIN),
  validateRequest(buddyValidation.buddyRequest),
  TripRequestController.updateBuddyRequest
);
export const TripRequestRoutes = router;
