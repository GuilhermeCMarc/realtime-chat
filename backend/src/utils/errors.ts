export abstract class HttpError {
  constructor(
    public readonly status: number,
    public readonly message: string
  ) {}
}

export class BadRequestError extends HttpError {
  constructor(public readonly message: string) {
    super(400, message);
  }
}

export class NotFoundError extends HttpError {
  constructor(public readonly message: string) {
    super(404, message);
  }
}

export class InternalServerError extends HttpError {
  constructor(public readonly message: string) {
    super(500, message);
  }
}
