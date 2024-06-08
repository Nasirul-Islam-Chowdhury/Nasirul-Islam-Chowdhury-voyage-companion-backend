"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buddyValidation = void 0;
const zod_1 = require("zod");
const buddyRequest = zod_1.z.object({
    tripId: zod_1.z.string({ required_error: "You must provide tripId" }),
    status: zod_1.z.enum(["PENDING", "APPROVED", "REJECTED"]),
});
exports.buddyValidation = { buddyRequest };
