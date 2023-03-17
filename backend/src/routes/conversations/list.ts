import RouteHandler from '@framework/routeHandler';
import { getAuthUser } from '@utils/jwt';
import { p } from '@utils/prisma';

const handler: RouteHandler = {
  config: {
    method: 'get'
  },
  handle: async (req, res) => {
    const user = await getAuthUser(req);

    const conversations = await p.conversation.findMany({ where: {
      users: {
        some: {
          id: user.id
        }
      }
    },
    include: {
      messages: {
        orderBy: {
          created_at: 'desc'
        },
        take: 1,
        include: {
          sent_by: true
        }
      }
    }
    },);

    return res.status(200).send({ conversations });
  }
};

export default handler;
