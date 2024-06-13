import { JwtPayload } from "jsonwebtoken";
import prisma from "../../../shared/prisma";
import { Profile } from "@prisma/client";

//get user profile by token
const getUserProfile = async (user: JwtPayload) => {
  const result = await prisma.profile.findFirst({
    where: {
      userId: user.userId,
    
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
  payload: { username: string; email: string; profile: Profile }
) => {
  const { profile } = payload;


  let result;

  const data = {
    ...profile,
    userId: user.userId,
  };

  if (profile) {
    result = await prisma.profile.update({
      where: {
        userId: user.userId,
      },
      data,
    });
  }
  if (payload.username) {
    await prisma.user.update({
      where: {
        id: user.userId,
      },
    data:{username: payload.username}
    });
  }



  return result;
};
export const profileServices = {
  getUserProfile,
  updateProfile,
};
