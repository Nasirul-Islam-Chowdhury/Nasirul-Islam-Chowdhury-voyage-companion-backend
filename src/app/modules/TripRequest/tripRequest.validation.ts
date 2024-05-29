import { z } from "zod";

const buddyRequest = z.object({
	tripId: z.string({ required_error: "You must provide tripId" }),
	status: z.enum(["PENDING", "APPROVED", "REJECTED"]),
});

export const buddyValidation = { buddyRequest };