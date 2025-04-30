/* eslint-disable @typescript-eslint/no-explicit-any */
import { DatatableResponseReturn } from "@/types/response.type";

class DatatableResponse<T = any> {
  private total: number = 0;
  private totalPages: number = 0;
  private page: number = 0;
  private perPage: number = 0;
  private count: number = 0;
  private data: T[] = [];

  constructor(data: T[], page: number, perPage: number, total: number) {
    this.data = data;
    this.page = page;
    this.perPage = page;
    this.total = total;
    this.count = data.length;
    this.totalPages = !total ? 0 : Math.ceil(total / perPage);
  }

  static response<T>(data: T[], page: number, perPage: number, total: number) {
    return new DatatableResponse<T>(data, page, perPage, total).toJSON();
  }

  toJSON(): DatatableResponseReturn<T> {
    return {
      data: this.data,
      count: this.count,
      total: this.total,
      totalPages: this.totalPages,
      page: this.page,
      perPage: this.perPage,
    };
  }
}

export default DatatableResponse;

export type DatatableResponseJSON = ReturnType<
  typeof DatatableResponse.prototype.toJSON
>;
