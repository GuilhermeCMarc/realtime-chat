import RouteHandler from '@framework/routeHandler';
import { userLoginSchema } from '@schemas/userSchema';
import { ForbiddenError } from '@utils/errors';
import { compareAsync } from '@utils/hash';
import { generateAccessToken } from '@utils/jwt';
import { p } from '@utils/prisma';
import { validate } from '@utils/validate';

const handler: RouteHandler = {
  config: {
    method: 'post',
    isPublic: true
  },
  handle: validate(userLoginSchema, async (req, res) => {
    const { email, password } = req.body;

    const user = await p.user.findUnique({ where: { email }, include: {
      password: true
    } });
    
    if (!user) {
      throw new ForbiddenError('Invalid credentials');
    }

    const isValid = await compareAsync(password, user.password?.hash);
    
    if (!isValid) {
      throw new ForbiddenError('Invalid credentials');
    }
    
    const token = generateAccessToken(user.email);

    return res.status(200).send({ token });
  })
};

export default handler;