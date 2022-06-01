export class ApiError implements Error {
  name: string;
  message: string;
  status: number;

  constructor(message: string, status: number, code: string) {
    this.message = message;
    this.status = status;
    this.name = code;
  }
}

export class BadRequestError extends ApiError {
  constructor(message: string) {
    super(message, 400, "bad_request");
  }
}

export class UnauthorizedError extends ApiError {
  constructor(message: string) {
    super(message, 401, "unauthorized");
  }
}
