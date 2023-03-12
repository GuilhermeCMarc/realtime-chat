import { RouteHandleType } from '@framework/routeHandler';
import { Request, Response } from 'express';
import { z } from 'zod';

import { BadRequestError } from './errors';

export function validate<TBody> (
  schema: z.Schema<TBody>,
  handle: RouteHandleType<TBody>
): RouteHandleType {
  return (req: Request, res: Response) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      throw new BadRequestError((result as any).error);
    }

    return handle(req, res);
  };
}
