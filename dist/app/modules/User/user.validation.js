"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidation = void 0;
const zod_1 = require("zod");
const createUser = zod_1.z.object({
    body: zod_1.z.object({
        id: zod_1.z.number().int().positive().optional(),
        email: zod_1.z
            .string({
            required_error: "email is required",
        })
            .email(),
        username: zod_1.z.string(),
        password: zod_1.z.string().min(6, "password must be at least 6 characters"),
        status: zod_1.z.string().optional(),
        role: zod_1.z.string({
            required_error: "role is required",
        }),
        profile: zod_1.z
            .object({
            bio: zod_1.z.string().optional(),
            age: zod_1.z.number().optional(),
            contactNumber: zod_1.z.number().optional(),
            userId: zod_1.z.string().optional(),
        })
            .optional(),
    }),
});
const updateStatus = zod_1.z.object({
    body: zod_1.z.object({
        status: zod_1.z.string().optional(),
    }),
});
exports.userValidation = { createUser, updateStatus };
