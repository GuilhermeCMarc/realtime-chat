import { Request, Response } from "express";
import { z } from "zod";
import { BadRequestError } from "./errors";

export async function validate<TBody>(
  schema: z.Schema<TBody>,
  handler: (req: Request<any, any, TBody>, res: Response) => any
) {
  return (req: Request, res: Response) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      throw new BadRequestError((result as any).error.message);
    }

    return handler(req, res);
  };
}
