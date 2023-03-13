import { UnauthorizedError } from '@utils/errors';
import { verifyToken } from '@utils/jwt';
import logger from '@utils/logger';
import { getSocketIO } from 'index';

const io = getSocketIO();

// Authenticating socket
io.use(async (socket, next) => {
  if (socket.handshake.query && socket.handshake.query.token) {
    try {
      const payload = verifyToken(socket.handshake.query.token as string) as { email: string};

      if (!payload || !payload.email) {
        throw new UnauthorizedError('Authentication error');
      }

      next();
    } catch (e) {
      throw new UnauthorizedError('Authentication error');
    }
  }
});
  
// Basic connection to socket
io.on('connection', socket => {
  logger.info('New connection to the socket');
  socket.emit('connected', 'hello');
});