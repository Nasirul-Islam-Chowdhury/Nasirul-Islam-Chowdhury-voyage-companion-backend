"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buddyValidation = void 0;
const zod_1 = require("zod");
const buddyRequest = zod_1.z.object({
    body: zod_1.z.object({
        status: zod_1.z.enum(["PENDING", "APPROVED", "REJECTED"]),
    })
});
exports.buddyValidation = { buddyRequest };
