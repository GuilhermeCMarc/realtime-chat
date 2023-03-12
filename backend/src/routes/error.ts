import RouteHandler from '@framework/routeHandler';
import { BadRequestError } from '@utils/errors';

const handler: RouteHandler = {
  config: {
    method: 'get',
    isPublic: true
  },
  handle: async (req, res) => {
    throw new BadRequestError('Testing error handling');
  },
};

export default handler;
