import { Prisma, Profile, User, UserRole, UserStatus } from "@prisma/client";
import prisma from "../../../shared/prisma";
import { Request } from "express";
import { IPaginationOptions } from "../../interfaces/pagination";
import { paginationHelper } from "../../../helpers/paginationHelper";
import { userSearchAbleFields } from "./user.constant";
import { IAuthUser } from "../../interfaces/common";
import ApiError from "../../errors/ApiError";
import bcrypt from "bcrypt";
import config from "../../../config";


const createUser = async (data: User & { profile: Profile }) => {

  const { profile, password, ...restData } = data;
  const hashedPassword = await bcrypt.hash(
    password,
    Number(config.bcrypt.salt_round)
  );
  const isUserExists = await prisma.user.findFirst({
    where: {
      email: restData.email,
    },
  });
  if (isUserExists) {
    throw new ApiError(500, "User Already exists");
  }

  const result = await prisma.$transaction(async (tx) => {
    const user = await tx.user.create({
      data: { ...restData, password: hashedPassword },
    });
    const userId = user.id;
    const profileData = { ...profile, userId };

    await tx.profile.create({
      data: profileData,
    });

    return user;
  });

  return result;
};

const getAllFromDB = async (params: any, options: IPaginationOptions) => {
  const { page, limit, skip } = paginationHelper.calculatePagination(options);
  const { searchTerm, ...filterData } = params;

  const andCondions: Prisma.UserWhereInput[] = [];


  if (params.searchTerm) {
    andCondions.push({
      OR: userSearchAbleFields.map((field) => ({
        [field]: {
          contains: params.searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andCondions.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    });
  }

  const whereConditons: Prisma.UserWhereInput =
    andCondions.length > 0 ? { AND: andCondions } : {};

  const result = await prisma.user.findMany({
    where: whereConditons,
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
    select: {
      id: true,
      email: true,
      role: true,
      status: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  const total = await prisma.user.count({
    where: whereConditons,
  });

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const changeProfileStatus = async (id: string, status: UserStatus) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      id,
    },
  });
  if(!userData) throw new ApiError(500, "User not found");
  
  const updateUserStatus = await prisma.user.update({
    where: {
      id,
    },
    data: {status:status},
  });

  return updateUserStatus;
};

const updateMyProfie = async (user: IAuthUser, req: Request) => {
  const userInfo = await prisma.user.findUniqueOrThrow({
    where: {
      email: user?.email,
      status: "ACTIVE",
    },
  });

  return userInfo;
};

const getMyProfile = async(data: IAuthUser) => {
  const res = await prisma.user.findFirst({where:{email: data?.email}}) as User

  const  {password,...finalRes} = res;
  return finalRes;
};

export const userService = {
  createUser,
  getAllFromDB,
  changeProfileStatus,
  getMyProfile,
  updateMyProfie,
};
