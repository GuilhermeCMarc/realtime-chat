import { Request, Response } from "express";
import RouteHandler from "../framework/routeHandler";

const handler: RouteHandler = {
  config: {
    method: "get",
  },
  async handle(req, res) {
    res.send("Hello World");
  },
};

export default handler;
