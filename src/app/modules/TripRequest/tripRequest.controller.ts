import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { buddyRequestServices } from "./tripRequest.service";


//create buddyRequest
const createBuddyRequest = catchAsync(async (req: Request, res: Response) => {
	const result = await buddyRequestServices.createBuddyRequest(req.body,req.params.tripId);

	sendResponse(res, {
        success: true,
		statusCode: 201,
		message: "Travel buddy request sent successfully",
		data: result,
	});
});

//get all buddyRequest
const getBuddyRequest = catchAsync(async (req: Request, res: Response) => {


	const result = await buddyRequestServices.getAllBuddiesForSingletrip(
		req.params.tripId
	);

	sendResponse(res, {
        success: true,
		statusCode: 200,
		message: "Potential travel buddies retrieved successfully",
		data: result,
	});
});



//update buddy request
const updateBuddyRequest = catchAsync(async(req:Request,res:Response)=>{
	const {buddyId} = req.params;
	const result  = await buddyRequestServices.updateBuddyRequest(req.body,buddyId );


	sendResponse(res, {
        success: true,
		statusCode: 200,
		message: "Travel buddy request responded successfully",
		data: result,
	});

})
export const TripRequestController = { createBuddyRequest, getBuddyRequest ,updateBuddyRequest};