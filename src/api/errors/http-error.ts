export class HttpError extends Error {
  public statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message)
    this.statusCode = statusCode;
  }
}

export class ForbiddenError extends HttpError {
  constructor() {
    super("Forbidden", 403)
  }
}

export class UnauthorizedError extends HttpError {
  constructor() {
    super("Unauthorized", 401)
  }
}