import { z } from 'zod';

export const createGroupSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  userIds: z.array(z.string().uuid())
});