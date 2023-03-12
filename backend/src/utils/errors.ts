export abstract class HttpError {
  constructor (
    public readonly status: number,
    public readonly message: string
  ) {}
}

export class BadRequestError extends HttpError {
  constructor (public readonly message: string) {
    super(400, message);
  }
}

export class NotFoundError extends HttpError {
  constructor (public readonly message: string) {
    super(404, message);
  }
}

export class InternalServerError extends HttpError {
  constructor (public readonly message: string) {
    super(500, message);
  }
}

export class UnauthorizedError extends HttpError {
  constructor (public readonly message: string) {
    super(401, message);
  }
}

export class ForbiddenError extends HttpError {
  constructor (public readonly message: string) {
    super(403, message);
  }
}
