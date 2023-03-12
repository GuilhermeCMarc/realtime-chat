import { Request, Response } from 'express';

import { RouteConfig } from '@utils/routeConfig';

export type RouteHandleType<TBody = any> = (req: Request<any,any, TBody>, res: Response) => any;

export default interface RouteHandler {
  config: RouteConfig;
  handle: RouteHandleType;
}
