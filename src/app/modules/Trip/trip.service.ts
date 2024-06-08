import { Prisma, Trip } from "@prisma/client";
import { JwtPayload } from "jsonwebtoken";
import prisma from "../../../shared/prisma";
import { paginationHelper } from "../../../helpers/paginationHelper";
import { IPaginationOptions } from "../../interfaces/pagination";
import { searchAbleKey } from "./trip.constant";
import ApiError from "../../errors/ApiError";

export interface ITripFilterRequest {
  destination?: string | undefined;
  startDate?: string | undefined;
  endDate?: string | undefined;
  searchTerm?: string | undefined;
}

const createTrip = async (payload: Trip, user: JwtPayload) => {
  const data = {
    ...payload,
    userId: user?.userId,
  };
  const isTripExists = await prisma.trip.findFirst({
    where: {
      userId: user.userId,
      destination: data.destination,
      startDate: data.startDate,
      endDate: data.endDate,
    },
  });
  if (isTripExists) throw new ApiError(500, "Trip already exists");

  const result = await prisma.trip.create({
    data: data,
  });

  return result;
};

//get all trip
const getAllTrips = async (
  query: ITripFilterRequest,
  options: IPaginationOptions
) => {
  const { page, limit, skip } = paginationHelper.calculatePagination(options);
  const { searchTerm, ...filterData } = query;

  const queryResult: Prisma.TripWhereInput[] = [];

  if (searchTerm) {
    queryResult.push({
      OR: searchAbleKey.map((value) => ({
        [value]: {
          contains: query.searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    queryResult.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    });
  }

  const whereCondition: Prisma.TripWhereInput = { AND: queryResult };

  const result = await prisma.trip.findMany({
    where: whereCondition,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {
            createdAt: "desc",
          },
  });
  const total = await prisma.trip.count({ where: whereCondition });

  return {
    meta: {
      page,
      limit,
      total,
    },

    data: result,
  };
};



const deleteTrip = async (id:string)=>{
  const result = await prisma.trip.delete({where:{id: id}});
  return result
}
export const tripServices = {
  createTrip,
  getAllTrips,
  deleteTrip
};
