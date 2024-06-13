import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { buddyRequestServices } from "./tripRequest.service";
import { JwtPayload } from "jsonwebtoken";

//create buddyRequest
const createBuddyRequest = catchAsync(
  async (req: Request & { user?: JwtPayload }, res: Response) => {
    const user = req.user;
    const result = await buddyRequestServices.createBuddyRequest(req.params.tripId,user!);

    sendResponse(res, {
      success: true,
      statusCode: 201,
      message: "Travel buddy request sent successfully",
      data: result,
    });
  }
);
const deleteTripRequest = catchAsync(
  async (req: Request, res: Response) => {

    const result = await buddyRequestServices.deleteTripRequest(req.params.id);

    sendResponse(res, {
      success: true,
      statusCode: 201,
      message: "Travel buddy request deleted successfully",
      data: result,
    });
  }
);

//get all buddyRequest
const getBuddyRequest = catchAsync(async (req: Request, res: Response) => {
  const result = await buddyRequestServices.getAllBuddiesForSingletrip(
    req.params.tripId
  );

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Potential travel buddies retrieved successfully",
    data: result,
  });
});

const getMyRequest = catchAsync(
  async (req: Request & { user?: JwtPayload }, res: Response) => {
    const user = req.user;

    const result = await buddyRequestServices.getMyRequest(user?.userId);

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "My Request retrieved successfully",
      data: result,
    });
  }
);

const getMyPostedTripsRequest = catchAsync(
  async (req: Request & { user?: JwtPayload }, res: Response) => {
    const user = req.user;

    const result = await buddyRequestServices.getMyPostedTripsRequest(user?.userId);

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "My Request retrieved successfully",
      data: result,
    });
  }
);





//update buddy request
const updateBuddyRequest = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await buddyRequestServices.updateBuddyRequest(req.body, id);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Travel buddy request responded successfully",
    data: result,
  });
});
export const TripRequestController = {
  createBuddyRequest,
  getBuddyRequest,
  updateBuddyRequest,
  getMyRequest,
  deleteTripRequest,
  getMyPostedTripsRequest
};
