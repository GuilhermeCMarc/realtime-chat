import RouteHandler from '@framework/routeHandler';

const handler: RouteHandler = {
  config: {
    method: 'get',
  },
  handle: (req, res) => {
    return res.status(200).send({ message: 'ok' });
  }
};

export default handler;