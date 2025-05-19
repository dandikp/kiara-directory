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

export type DatatableResponseReturn<T> = {
  data: T[];
  count: number;
  total: number;
  totalPages: number;
  page: number;
  perPage: number;
};

export type StandardGetApiResponse<T> = {
  items: T[];
  total: number;
  page: number;
  perPage: number;
};
