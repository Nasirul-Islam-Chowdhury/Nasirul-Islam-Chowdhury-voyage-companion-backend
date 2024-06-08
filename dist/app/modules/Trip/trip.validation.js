"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tripValidation = void 0;
const zod_1 = require("zod");
const createTrip = zod_1.z.object({
    body: zod_1.z.object({
        destination: zod_1.z.string({ required_error: "Destination is required" }),
        startDate: zod_1.z.string({ required_error: "Start date is required" }),
        endDate: zod_1.z.string({ required_error: "End date is required" }),
        budget: zod_1.z
            .number({ required_error: "Budget is required" })
            .positive({ message: "Budget must be positive" }),
        activities: zod_1.z.string().array().optional(),
        description: zod_1.z.string(),
        travelType: zod_1.z.string(),
        photos: zod_1.z.array(zod_1.z.string()).default([]),
    })
});
exports.tripValidation = { createTrip };
