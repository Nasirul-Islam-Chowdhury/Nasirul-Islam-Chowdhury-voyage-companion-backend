import { JwtPayload } from "jsonwebtoken";
import prisma from "../../../shared/prisma";


//get user profile by token
const getUserProfile = async (user: JwtPayload) => {
	const result = await prisma.user.findUnique({
		where: {
			email: user.email,
			id: user.id,
		},
		select: {
			id: true,
			email: true,
			username: true,
			createdAt: true,
			updatedAt: true,
		},
	});

	return result;
};

//update profile
const updateProfile = async (
	user: JwtPayload,
	payload: { name: string; email: string }
) => {
	const result = await prisma.user.update({
		where: {
			id: user.id,
			email: user.email,
		},
		data: {
			...payload,
		},
		select: {
			id: true,
			email: true,
			username: true,
			createdAt: true,
			updatedAt: true,
		},
	});

	return result;
};
export const profileServices = {
	getUserProfile,
	updateProfile,
};