import { Request, Response } from "express";

import { IAuthUser } from "../../interfaces/common";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { profileServices } from "./profile.service";
import { JwtPayload } from "jsonwebtoken";

//get-user profile according to token
const getUserProfile = catchAsync(
  async (req: Request & { user?: JwtPayload }, res: Response) => {
    const user = req.user;
    const result = await profileServices.getUserProfile(user!);

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "User profile retrieved successfully",
      data: result,
    });
  }
);

//update profile
const updateProfile = catchAsync(
  async (req: Request & { user?: IAuthUser }, res: Response) => {
    const user = req.user;
    const result = await profileServices.updateProfile(user!, req.body);

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "User profile updated successfully",
      data: result,
    });
  }
);

export const profileController = {
  getUserProfile,
  updateProfile,
};
