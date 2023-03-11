import { NextFunction, Request, Response } from "express";

export default abstract class Middleware {
  public handle(req: Request, res: Response, next: NextFunction) {}
}
