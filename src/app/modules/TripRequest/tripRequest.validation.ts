import { z } from "zod";

const buddyRequest = z.object({
	body: z.object({
		status: z.enum(["PENDING", "APPROVED", "REJECTED"]),
	})
})

export const buddyValidation = { buddyRequest };