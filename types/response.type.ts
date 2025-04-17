/* eslint-disable @typescript-eslint/no-explicit-any */
export type StandardResponse<T> = {
  status: string;
  code: number;
  message: string;
  data?: T | T[];
  meta: {
    timestamp: string;
  };
  errors?: any;
};
