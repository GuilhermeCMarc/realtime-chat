import RouteHandler from '@framework/routeHandler';
import { createGroupSchema } from '@schemas/groupSchema';
import { getAuthUser } from '@utils/jwt';
import { p } from '@utils/prisma';
import { validate } from '@utils/validate';

const handler: RouteHandler = {
  config: {
    method: 'post'
  },
  handle: validate(createGroupSchema, async (req, res) => {
    const user = await getAuthUser(req);

    const { description, name, userIds } = req.body;

    const group = await p.group.create({
      data: {
        name,
        description,
        conversation: {
          create: {
            users: {
              connect: {
                id: user.id
              }
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

    // Add each user to its 
    userIds.forEach(async id => {
      await p.group.update({ where: { id: group.id }, data: {
        conversation: {
          update: {
            users: {
              connect: {
                id
              }
            }
          }
        }
      } });
    });

    return res.status(200).send({ group });
  })
};

export default handler;