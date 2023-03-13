import RouteHandler from '@framework/routeHandler';
import { BadRequestError } from '@utils/errors';
import { hashAsync } from '@utils/hash';
import { p } from '@utils/prisma';
import { validate } from '@utils/validate';
import { registerUserSchema } from 'schemas/userSchema';

const handler: RouteHandler = {
  config: {
    method: 'post',
    isPublic: true,
  },
  handle: validate(registerUserSchema, async (req, res) => {
    const { email, name, password } = req.body;

    const user = await p.user.findUnique({ where: { email } });

    if (user) {
      throw new BadRequestError('User already exists');
    }

    await p.user.create({
      data: {
        name,
        email,
        password: {
          create: {
            hash: await hashAsync(password),
          },
        },
      },
    });

    return res.status(201).send();
  }),
};

export default handler;
