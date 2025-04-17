import { NextApiResponse } from "next";
import AppError from "./AppError";
import { ERROR_MESSAGES } from "./messages";

export function errorHandler(res: NextApiResponse, error: unknown) {
  if (error instanceof AppError) {
    return res.status(error?.statusCode).json({ error: error.message });
  }

  console.error("Unhandled Error:", error);
  return res.status(500).json({ error: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
}
