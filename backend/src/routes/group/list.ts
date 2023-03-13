import RouteHandler from '@framework/routeHandler';
import { getAuthUser } from '@utils/jwt';
import { p } from '@utils/prisma';

const handler: RouteHandler = {
  config: {
    method: 'get'
  },
  handle: async (req, res) => {
    const user = await getAuthUser(req);

    const groups = await p.group.findMany({
      where: {
        conversation: { 
          users: { 
            some: { 
              id: user.id 
            } 
          } 
        }
      },
      include: { 
        conversation: {
          include: {
            messages: true
          }
        } 
      }
    });

    return res.status(200).send({ groups });
  }
};

export default handler;