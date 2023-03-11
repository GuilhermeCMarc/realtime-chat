import RouteHandler from "framework/routeHandler";

const handle: RouteHandler = {
  config: {
    method: "get",
  },
  async handle(req, res) {
    res.send({ users: [{}] });
  },
};

export default handle;
