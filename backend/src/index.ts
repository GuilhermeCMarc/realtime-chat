import bodyParser from 'body-parser';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express, { Request, Response } from 'express';

import buildRoutes from '@framework/routeBuilder';
import logger from '@utils/logger';

import { createServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';

dotenv.config();

// Initializing
const app = express();
const port = process.env.PORT || 8000;
const httpServer = createServer(app);
const io = new SocketIOServer(httpServer);

export function getSocketIO () {
  return io;
}

// Middlewares
app.use(cors({ credentials: true }));
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

app.get('/', (req: Request, res: Response) => {
  res.send({ message: 'Hello World!' });
});

buildRoutes(app);

httpServer.listen(port, () => {
  logger.info(`Server running at http://localhost:${port}`);
});
