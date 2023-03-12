import { Express, Handler, Request, Response } from 'express';
import path from 'path';

import RouteHandler from './routeHandler';
import walkSync from './walk';

import { HttpError } from '@utils/errors';
import { authenticateToken } from '@utils/jwt';
import logger from '@utils/logger';

function buildHandler (handler: RouteHandler, path: string): Handler {
  return async (req: Request, res: Response) => {
    const startTime = Date.now();
    try {
      if (!handler.config.isPublic) {
        await authenticateToken(req);
      }

      return await handler.handle(req, res);
    } catch (e) {
      if (e instanceof HttpError) {
        logger.error(
          '[%s] on %s failed with status %s, %s',
          handler.config.method,
          path,
          e.status,
          e.message
        );
        return res.status(e.status).send({ message: e.message });
      }
    } finally {
      logger.info(
        '[%s] on %s took %s ms',
        handler.config.method.toUpperCase(),
        path,
        Date.now() - startTime
      );
    }
  };
}

export default function buildRoutes (app: Express) {
  logger.verbose('Started building routes...');
  let routes = 0;
  walkSync(path.join(process.cwd(), 'src', 'routes'), (filePath, stats) => {
    const [_, realPath] = filePath.slice(0, -3).split('routes');

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const module = require(filePath);

    const routeHandler = module.default as RouteHandler;

    if (!routeHandler) {
      logger.error('Invalid handler at %s', realPath);
    } else {
      app[routeHandler.config.method](
        realPath,
        buildHandler(routeHandler, realPath)
      );
      logger.verbose(
        `Sucessfuly built route [${routeHandler.config.method}] ${realPath}`
      );
      routes++;
    }
  });
  logger.info(`Finished building routes (${routes} routes built)`);
}
