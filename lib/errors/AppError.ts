export default class AppError extends Error {
  code: number;

  constructor(message: string, code: number) {
    super(message);
    this.code = code;

    Object.setPrototypeOf(this, AppError.prototype);
  }
}
