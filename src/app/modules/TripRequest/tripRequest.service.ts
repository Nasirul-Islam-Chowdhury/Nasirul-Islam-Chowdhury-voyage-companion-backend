import { RequestStatus } from "@prisma/client";
import prisma from "../../../shared/prisma";
import ApiError from "../../errors/ApiError";


const createBuddyRequest = async (
	payload: { userId: string },
	tripId: string
) => {
	const result = await prisma.travelRequest.create({
		data: {
			tripId,
			userId: payload.userId,
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

//update status

const updateBuddyRequest = async (
	payload: { status: RequestStatus; tripId: string },
	id: string
) => {
	//at first find buddyrequest exists or not

	const exsitingBuddy = await prisma.travelRequest.findUnique({
		where: {
			id,
			tripId: payload.tripId,
		},
	});

	if (!exsitingBuddy) {
		throw new ApiError(
			404,
			"Your requested buddyId and tripId doesn't match"
		);
	}
	const result = await prisma.travelRequest.update({
		where: {
			id,
			tripId: payload.tripId,
		},
		data: {
			status: payload.status,
		},
	});

	return result;
};

export const buddyRequestServices = {
	createBuddyRequest,
	getAllBuddiesForSingletrip,
	updateBuddyRequest,
};