import { JwtPayload } from "jsonwebtoken";
import prisma from "../../../shared/prisma";
import { Profile } from "@prisma/client";

//get user profile by token
const getUserProfile = async (user: JwtPayload) => {
  const result = await prisma.profile.findFirst({
    where: {
      userId: user.id,
    },
    include: {
      user: true,
    },
  });

  return result;
};

//update profile
const updateProfile = async (
  user: JwtPayload,
  payload: { name: string; email: string; profile: Profile }
) => {
  const { profile, ...otherData } = payload;

  await prisma.user.update({
    where: {
      id: user.id,
      email: user.email,
    },
    data: {
      ...otherData,
    },
    select: {
      id: true,
      email: true,
      username: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (profile) {
    await prisma.profile.update({
      where: {
        userId: user.id,
      },
      data: {
        ...profile,
      },
    });
  }
  return null;
};
export const profileServices = {
  getUserProfile,
  updateProfile,
};
