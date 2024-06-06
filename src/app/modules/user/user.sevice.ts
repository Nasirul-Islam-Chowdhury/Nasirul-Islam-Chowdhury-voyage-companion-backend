import { Prisma, Profile, User, UserRole } from "@prisma/client";
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
    console.log(user)
    return user;
  });

  return result;
};

const getAllFromDB = async (params: any, options: IPaginationOptions) => {
  const { page, limit, skip } = paginationHelper.calculatePagination(options);
  const { searchTerm, ...filterData } = params;

  const andCondions: Prisma.UserWhereInput[] = [];

  //console.log(filterData);
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

const changeProfileStatus = async (id: string, status: UserRole) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      id,
    },
  });

  const updateUserStatus = await prisma.user.update({
    where: {
      id,
    },
    data: status,
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

  // const file = req.file as IFile;
  // if (file) {
  //     const uploadToCloudinary = await fileUploader.uploadToCloudinary(file);
  //     req.body.profilePhoto = uploadToCloudinary?.secure_url;
  // }

  let profileInfo;

  return profileInfo;
};
const getMyProfile = (data: IAuthUser) => {

  return null;
};

export const userService = {
  createUser,
  getAllFromDB,
  changeProfileStatus,
  getMyProfile,
  updateMyProfie,
};
