import { RouteConfig } from "@utils/routeConfig";
import { Request, Response } from "express";

export default interface RouteHandler {
  config: RouteConfig;
  handle: (req: Request, res: Response) => any;
}
