import { z } from "zod";

const createTrip = z.object({
	destination: z.string({ required_error: "Destination is required" }),
	userId: z.string({ required_error: "userId is required" }),
	startDate: z.string({ required_error: "Start date is required" }),
	endDate: z.string({ required_error: "End date is required" }),
	budget: z
		.number({ required_error: "Budget is required" })
		.positive({ message: "Budget must be positive" }),
	activities: z.string().array().optional(),
	description: z.string(),
	travelType: z.string(),
	photos: z.array(z.string()).default([]),
});

export const tripValidation = { createTrip };