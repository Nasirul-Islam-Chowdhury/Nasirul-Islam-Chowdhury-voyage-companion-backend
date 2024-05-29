import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { ZodError } from "zod";

import { Prisma } from "@prisma/client";
import { TErrorSources } from "../interfaces/error";
import handleZodError from "../errors/handleZodError";
import ApiError from "../errors/ApiError";

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {


  let statusCode = 500;
  let message = "Something went wrong!";
  let errorDetails: TErrorSources = [
    {
      field: "",
      message: "Something went wrong",
    },
  ];

  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorDetails = simplifiedError?.errorSources;
  } else if (err instanceof ApiError) {
    statusCode = err?.statusCode;
    message = err.message;
    errorDetails = [
      {
        field: "",
        message: err?.message,
      },
    ];
  } else if (err instanceof Error) {
    message = err.message;
    errorDetails = [
      {
        field: "",
        message: err?.message,
      },
    ];
  } else if (err instanceof Prisma.PrismaClientValidationError) {
    message = "Validation Error";
    errorDetails = [
      {
        field: "",
        message: err?.message,
      },
    ];
  } else if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2002") {
      message = "Duplicate Key error";
      errorDetails = [
        {
          field: "",
          message: err?.message,
        },
      ];
    }
  }

  return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
    success: false,
    message,
    errorDetails,
  });
};

export default globalErrorHandler;