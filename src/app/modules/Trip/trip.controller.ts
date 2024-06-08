import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { tripFilterableFields } from "./trip.constant";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { tripServices } from "./trip.service";


const createTrip = catchAsync(
	async (req: Request & { user?: any }, res: Response) => {
		const user = req.user;
		const result = await tripServices.createTrip(req.body, user);

		sendResponse(res, {
            success: true,
			statusCode: 201,
			message: "Trip created successfully",
			data: result,
		});
	}
);

//get all trip

const getAllTrips = catchAsync(async (req: Request, res: Response) => {

	const filters = pick(req.query, tripFilterableFields);

	const options = pick(req.query, ["limit","page","sortBy", "sortOrder", ])
	
	
	const result = await tripServices.getAllTrips(
		filters, options
	);

	sendResponse(res, {
        success: true,
		statusCode: 200,
		message: "Trips retrieved successfully",
		meta: result.meta,
		data: result.data,
	});
});



const deleteTrip = catchAsync(async (req: Request, res: Response) => {
	const result = await tripServices.deleteTrip(req.params.id);
	sendResponse(res, {
        success: true,
		statusCode: 200,
		message: "Trips retrieved successfully",
		data: result,
	});
})

// const getSingleTrip =
export const tripController = {
	createTrip,
	getAllTrips,
	deleteTrip
};