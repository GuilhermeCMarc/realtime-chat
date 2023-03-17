import RouteHandler from '@framework/routeHandler';
import { createConversationSchema } from '@schemas/conversationSchema';
import { BadRequestError } from '@utils/errors';
import { p } from '@utils/prisma';
import { validate } from '@utils/validate';

const handler: RouteHandler = {
  config: {
    method: 'get'
  },
  handle: validate(createConversationSchema, async (req, res) => {
    const { userIds } = req.body;

    if (userIds.length !== 2) {
      throw new BadRequestError('Exacly 2 users must be passed');
    }

    const conversation = await p.conversation.findFirst({
      where: {
        AND: [
          {
            users: {
              every: {
                OR: [
                  {
                    id: userIds[0]
                  },
                  {
                    id: userIds[1]
                  }
                ]
              }
            },
          },
          {
            Group: {
              every: {
                id: null
              }
            }
          }
        ]
      }
    });

    if (conversation) {
      throw new BadRequestError('Conversation already exists');
    }

    const newConversation = await p.conversation.create({
      data: {
        users: {
          connect: [
            {
              id: userIds[0]
            },
            {
              id: userIds[1]
            }
          ]
        }
      }
    });

    return res.status(200).send({ conversation: newConversation });
  })
};

export default handler;