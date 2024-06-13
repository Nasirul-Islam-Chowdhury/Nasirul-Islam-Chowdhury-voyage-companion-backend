import { RequestStatus } from "@prisma/client";
import prisma from "../../../shared/prisma";
import ApiError from "../../errors/ApiError";
import { JwtPayload } from "jsonwebtoken";

const createBuddyRequest = async (tripId: string, user: JwtPayload) => {
  const isExist = await prisma.travelRequest.findFirst({
    where: {
      tripId: tripId,
      userId: user.userId,
    },
  });

  // if (isExist) {
  //   throw new ApiError(500, "Request already exists");
  // }

  const result = await prisma.travelRequest.create({
    data: {
      tripId,
      userId: user.userId,
    },
    include: {
      user: true,
      trip: true,
    },
  });
  return result;
};

const getAllBuddiesForSingletrip = async (tripId: string) => {
  const result = await prisma.travelRequest.findMany({
    where: {
      tripId: tripId,
    },
    include: {
      user: {
        select: {
          id: true,
          username: true,
          email: true,
        },
      },
    },
  });

  return result;
};

const updateBuddyRequest = async (
  payload: { status: RequestStatus },
  id: string
) => {
  const exsitingBuddy = await prisma.travelRequest.findUnique({
    where: {
      id,
    },
  });

  if (!exsitingBuddy) {
    throw new ApiError(404, "Your requested buddyId and tripId doesn't match");
  }
  const result = await prisma.travelRequest.update({
    where: {
      id,
    },
    data: {
      status: payload.status,
    },
  });

  return result;
};

const getMyRequest = async (id: string) => {
  const result = await prisma.travelRequest.findMany({
    where: { userId: id },
    include: { trip: true },
  });
  return result;
};

const getMyPostedTripsRequest = async (id: string) => {
  const result = await prisma.travelRequest.findMany({
    where: {
      trip: {
        userId: id,
      },
    },
    include: { trip: true, user: true },
  });
  return result;
};

const deleteTripRequest = async (id: string) => {
  const result = await prisma.travelRequest.delete({ where: { id: id } });
  return result;
};

export const buddyRequestServices = {
  createBuddyRequest,
  getAllBuddiesForSingletrip,
  updateBuddyRequest,
  getMyRequest,
  deleteTripRequest,
  getMyPostedTripsRequest,
};
