import { BadRequestError } from "../utils/errors";
import RouteHandler from "../framework/routeHandler";

const handler: RouteHandler = {
  config: {
    method: "get",
  },
  handle: async (req, res) => {
    throw new BadRequestError("Testing error handling");
  },
};

export default handler;
