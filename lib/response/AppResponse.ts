/* eslint-disable @typescript-eslint/no-explicit-any */
import { StandardResponse } from "@/types/response.type";
import { z } from "zod";

type Meta = { timestamp: string };

class AppResponse<T = any> {
  public status: "success" | "error" = "error";
  public message: string = "";
  public code: number = 200;
  public data?: T;
  public errors?: any;
  public meta: Meta = {
    timestamp: new Date().toISOString(),
  };

  constructor(message: string, code: number = 200, data?: T, errors?: any) {
    this.code = code;
    this.message = message;
    this.data = data;
    this.errors = errors;
    this.status = code >= 200 && code < 300 ? "success" : "error";
  }

  static success<T>(message: string = "Success", data?: T, code: number = 200) {
    return new AppResponse<T>(message, code, data);
  }

  static error(message: string = "Error", code: number = 500, errors?: any) {
    return new AppResponse(message, code, undefined, errors);
  }

  static getErrorMessages(error: z.ZodError): string[] {
    return error.errors.map((err) => {
      const path = err.path.join(".");
      return path ? `${path}: ${err.message}` : err.message;
    });
  }

  toJSON(): StandardResponse<T> {
    return {
      status: this.status,
      message: this.message,
      code: this.code,
      meta: this.meta,
      ...(this.data !== undefined && { data: this.data }),
      ...(this.errors !== undefined && { errors: this.errors }),
    };
  }
}

export default AppResponse;

export type AppResponseJSON = ReturnType<typeof AppResponse.prototype.toJSON>;
