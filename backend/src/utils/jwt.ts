import { Request } from 'express';
import jwt from 'jsonwebtoken';
import { UnauthorizedError } from './errors';
import { p } from './prisma';

export function generateAccessToken (email: string) {
  return jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: 60 * 60 });
}

export function verifyToken (token: string) {
  return jwt.verify(token, process.env.JWT_SECRET as string);
}

export async function authenticateToken (req: Request) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    throw new UnauthorizedError('No token was found');
  }

  const payload = verifyToken(token) as {email: string};

  if (!payload.email) {
    throw new UnauthorizedError('Invalid token'); 
  }

  const user = await p.user.findUnique({ where: { email: payload.email } });

  if (!user) {
    throw new UnauthorizedError('Invalid token');
  }
}

export async function getAuthUser (req: Request) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (token == null) {
    throw new UnauthorizedError('No token was found');
  }
  
  const payload = verifyToken(token) as {email: string};
  
  if (!payload.email) {
    throw new UnauthorizedError('Invalid token'); 
  }
  
  const user = await p.user.findUnique({ where: { email: payload.email } });
  
  if (!user) {
    throw new UnauthorizedError('Invalid token');
  }

  return user;
}