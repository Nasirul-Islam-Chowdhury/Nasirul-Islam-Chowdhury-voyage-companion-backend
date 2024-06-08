"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const zod_1 = require("zod");
const client_1 = require("@prisma/client");
const handleZodError_1 = __importDefault(require("../errors/handleZodError"));
const ApiError_1 = __importDefault(require("../errors/ApiError"));
const globalErrorHandler = (err, req, res, next) => {
    let statusCode = 500;
    let message = "Something went wrong!";
    let errorDetails = [
        {
            field: "",
            message: "Something went wrong",
        },
    ];
    if (err instanceof zod_1.ZodError) {
        const simplifiedError = (0, handleZodError_1.default)(err);
        statusCode = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.statusCode;
        message = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.message;
        errorDetails = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.errorSources;
    }
    else if (err instanceof ApiError_1.default) {
        statusCode = err === null || err === void 0 ? void 0 : err.statusCode;
        message = err.message;
        errorDetails = [
            {
                field: "",
                message: err === null || err === void 0 ? void 0 : err.message,
            },
        ];
    }
    else if (err instanceof Error) {
        message = err.message;
        errorDetails = [
            {
                field: "",
                message: err === null || err === void 0 ? void 0 : err.message,
            },
        ];
    }
    else if (err instanceof client_1.Prisma.PrismaClientValidationError) {
        message = "Validation Error";
        errorDetails = [
            {
                field: "",
                message: err === null || err === void 0 ? void 0 : err.message,
            },
        ];
    }
    else if (err instanceof client_1.Prisma.PrismaClientKnownRequestError) {
        if (err.code === "P2002") {
            message = "Duplicate Key error";
            errorDetails = [
                {
                    field: "",
                    message: err === null || err === void 0 ? void 0 : err.message,
                },
            ];
        }
    }
    return res.status(http_status_1.default.INTERNAL_SERVER_ERROR).json({
        success: false,
        message,
        errorDetails,
    });
};
exports.default = globalErrorHandler;
